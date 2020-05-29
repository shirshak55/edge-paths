import fs from "fs"
import path from "path"
import which from "which"

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

let dev = {
  linux: getBin(["edge", "edge-stable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Dev"),
  win32: getEdgeExe("Edge"),
}

let beta = {
  linux: getBin(["edge", "edge-stable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
  win32: getEdgeExe("Edge"),
}

let canary = {
  linux: getBin(["edge-canary", "edge-unstable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
  win32: getEdgeExe("Edge SxS"),
}

module.exports = {
  edge,
  dev,
  canary,
  beta,
}
