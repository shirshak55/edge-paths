import fs from "fs"
import path from "path"

// Uncomment following line once linux gets released on linux and don't forget to add dependencies
//  "dependencies": {
//   "which": "^2.0.2"
// },
// import which from "which"

let platform = process.platform

// Return location of msedge.exe file for a given Edge directory (available: "Edge", "Edge Dev","Edge Beta","Edge Canary").
function getEdgeExe(edgeDirName: string) {
  // Only run these checks on win32
  if (process.platform !== "win32") {
    return null
  }

  let paths = []
  let windowsEdgeDirectory, i, prefix
  let suffix = edgeDirName + "\\Application\\msedge.exe"
  let prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"]]

  for (i = 0; i < prefixes.length; i++) {
    prefix = prefixes[i]

    if (!prefix) {
      continue
    }

    try {
      windowsEdgeDirectory = path.join(prefix, suffix)
      paths.push(windowsEdgeDirectory)
      fs.accessSync(windowsEdgeDirectory)
      return windowsEdgeDirectory
    } catch (e) {}
  }

  if (!windowsEdgeDirectory) {
    throw {
      package: "edge-paths",
      message: "Edge browser not found. Please recheck your installation.",
      paths,
    }
  }
  return windowsEdgeDirectory
}

// Todo  Uncomment once edge gets linux support
// function getBin(commands: string[]) {
//   // Don't run these checks on win32
//   if (process.platform !== "linux") {
//     return null
//   }
//   let bin, i
//   for (i = 0; i < commands.length; i++) {
//     try {
//       if (which.sync(commands[i])) {
//         bin = commands[i]
//         break
//       }
//     } catch (e) {}
//   }
//   return bin
// }

function getEdgeDarwin(defaultPath: string) {
  if (process.platform !== "darwin") {
    return null
  }

  try {
    let homePath = path.join(process.env.HOME!, defaultPath)
    fs.accessSync(homePath)
    return homePath
  } catch (e) {
    return defaultPath
  }
}

let edge = {
  // Todo Uncomment once edge gets released for linux
  // linux: getBin(["edge", "edge-stable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge"),
  win32: getEdgeExe("Edge"),
}

let edgeDev = {
  // linux: getBin(["edge", "edge-stable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Dev"),
  win32: getEdgeExe("Edge Dev"),
}

let edgeBeta = {
  // linux: getBin(["edge", "edge-stable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
  win32: getEdgeExe("Edge Beta"),
}

let edgeCanary = {
  // linux: getBin(["edge-canary", "edge-unstable"]),
  darwin: getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
  win32: getEdgeExe("Edge Canary"),
}

function throwInvalidPlatformError() {
  throw {
    package: "edge-paths",
    message: "Your platform is not supported. Only mac and windows are supported currently",
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
