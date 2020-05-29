import fs from "fs"
import path from "path"
import which from "which"

let platform = process.platform

// Return location of edge.exe file for a given Edge directory (available: "Edge", "Edge SxS").
function getEdgeExe(edgeDirName: string) {
  // Only run these checks on win32
  if (process.platform !== "win32") {
    return null
  }
  var windowsEdgeDirectory, i, prefix
  var suffix = edgeDirName + "\\Application\\edge.exe"
  var prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"]]

  for (i = 0; i < prefixes.length; i++) {
    prefix = prefixes[i]

    if (!prefix) {
      continue
    }

    try {
      windowsEdgeDirectory = path.join(prefix, suffix)
      fs.accessSync(windowsEdgeDirectory)
      return windowsEdgeDirectory
    } catch (e) {}
  }

  return windowsEdgeDirectory
}

function getBin(commands: string[]) {
  // Don't run these checks on win32
  if (process.platform !== "linux") {
    return null
  }
  var bin, i
  for (i = 0; i < commands.length; i++) {
    try {
      if (which.sync(commands[i])) {
        bin = commands[i]
        break
      }
    } catch (e) {}
  }
  return bin
}

function getEdgeDarwin(defaultPath: string) {
  if (process.platform !== "darwin") {
    return null
  }

  try {
    var homePath = path.join(process.env.HOME!, defaultPath)
    fs.accessSync(homePath)
    return homePath
  } catch (e) {
    return defaultPath
  }
}

let edge = {
  linux: getBin(["edge", "edge-stable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge"),
  win32: getEdgeExe("Edge"),
}

let edgeDev = {
  linux: getBin(["edge", "edge-stable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Dev"),
  win32: getEdgeExe("Edge"),
}

let edgeBeta = {
  linux: getBin(["edge", "edge-stable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
  win32: getEdgeExe("Edge"),
}

let edgeCanary = {
  linux: getBin(["edge-canary", "edge-unstable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
  win32: getEdgeExe("Edge SxS"),
}

function throwInvalidPlatformError() {
  throw {
    package: "edge-paths",
    message: "Your platform is not supported. Only linux, mac and windows are supported currently",
  }
}

export function getEdgePath() {
  if (platform && platform in edge) {
    //@ts-ignore
    return edge[platform]
  }
  throwInvalidPlatformError()
}

export function getEdgeDevPath() {
  if (platform && platform in edgeDev) {
    //@ts-ignore
    return edgeDev[platform]
  }
  throwInvalidPlatformError()
}

export function getEdgeBetaPath() {
  if (platform && platform in edgeBeta) {
    //@ts-ignore
    return edgeBeta[platform]
  }
  throwInvalidPlatformError()
}

export function getEdgeCanaryPath() {
  if (platform && platform in edgeCanary) {
    //@ts-ignore
    return edgeCanary[platform]
  }
  throwInvalidPlatformError()
}

if (require.main === module) {
  console.log(module.exports)
}
