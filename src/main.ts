import fs from "fs"
import path from "path"

let platform = process.platform

// Return location of msedge.exe file for a given Edge directory (available: "Edge", "Edge Dev","Edge Beta","Edge Canary").
function getEdgeExe(edgeDirName: string) {
  // Only run these checks on win32
  if (process.platform !== "win32") {
    return null
  }
  let paths = []
  let suffix = `\\Microsoft\\${edgeDirName}\\Application\\msedge.exe`
  let prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"]]

  for (let prefix of prefixes) {
    if (prefix) {
      let edgePath = path.join(prefix, suffix)
      paths.push(edgePath)
      if (fs.existsSync(edgePath)) {
        return edgePath
      }
    }
  }

  throw {
    package: "edge-paths",
    message: "Edge browser not found. Please recheck your installation.",
    paths,
  }
}

function getEdgeDarwin(defaultPath: string) {
  if (process.platform !== "darwin") {
    return null
  }

  // let homePath = path.join(process.env.HOME!, defaultPath)
  if (fs.existsSync(defaultPath)) {
    return defaultPath
  }

  throw {
    package: "edge-paths",
    message: `Edge browser not found. Please recheck your installation. Path ${defaultPath}`,
    path: defaultPath,
  }
}

function throwInvalidPlatformError() {
  throw {
    package: "edge-paths",
    message: "Your platform is not supported. Only mac and windows are supported currently",
  }
}

export function getEdgePath() {
  let edge = {
    // Todo Uncomment once edge gets released for linux
    // linux: getBin(["edge", "edge-stable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"),
    win32: getEdgeExe("Edge"),
  }

  if (platform && platform in edge) {
    //@ts-ignore
    return edge[platform]
  }
  throwInvalidPlatformError()
}

export function getEdgeDevPath() {
  let edgeDev = {
    // linux: getBin(["edge", "edge-stable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Dev.app/Contents/MacOS/Microsoft Edge Dev"),
    win32: getEdgeExe("Edge Dev"),
  }

  if (platform && platform in edgeDev) {
    //@ts-ignore
    return edgeDev[platform]
  }
  throwInvalidPlatformError()
}

export function getEdgeBetaPath() {
  let edgeBeta = {
    // linux: getBin(["edge", "edge-stable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
    win32: getEdgeExe("Edge Beta"),
  }

  if (platform && platform in edgeBeta) {
    //@ts-ignore
    return edgeBeta[platform]
  }
  throwInvalidPlatformError()
}

export function getEdgeCanaryPath() {
  let edgeCanary = {
    // linux: getBin(["edge-canary", "edge-unstable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
    win32: getEdgeExe("Edge SxS"),
  }

  if (platform && platform in edgeCanary) {
    //@ts-ignore
    return edgeCanary[platform]
  }
  throwInvalidPlatformError()
}

if (require.main === module) {
  try {
    console.log("Edge Beta", getEdgeBetaPath())
  } catch (e) {
    console.log(e)
  }
  try {
    console.log("Edge Canary", getEdgeCanaryPath())
  } catch (e) {
    console.log(e)
  }
  try {
    console.log("Edge Dev", getEdgeDevPath())
  } catch (e) {
    console.log(e)
  }
  try {
    console.log("Edge", getEdgePath())
  } catch (e) {
    console.log(e)
  }
}
