import { existsSync } from "fs"
import path from "path"
import which from "which"

let platform = process.platform

// Caller will ensure that the platform is linux, otherwise null will be returned
function getEdgeLinux(
	name:
		| "microsoft-edge-dev"
		| "microsoft-edge-beta"
		| "microsoft-edge-stable",
): string | null {
	try {
		let path = which.sync(name)
		return path
	} catch (e) {}

	return null
}


// Caller will ensure that the platform is windows, otherwise null will be returned
function getEdgeWindows(
	edgeDirName: "Edge" | "Edge Dev" | "Edge Beta" | "Edge SxS",
): string | null {
	let paths = []
	let suffix = `\\Microsoft\\${edgeDirName}\\Application\\msedge.exe`
	let prefixes = [
		process.env.LOCALAPPDATA,
		process.env.PROGRAMFILES,
		process.env["PROGRAMFILES(X86)"],
	].filter((v) => !!v)

	for (let prefix of prefixes) {
		let edgePath = path.join(prefix!, suffix)
		paths.push(edgePath)
		if (existsSync(edgePath)) {
			return edgePath
		}
	}

	return null
}

// Caller will ensure that the platform is macos, otherwise null will be returned
function getEdgeDarwin(defaultPath: string): string | null {
	if (existsSync(defaultPath)) {
		return defaultPath
	}

	return null
}

const edgePaths = {
	edge: {
		linux: () => getEdgeLinux("microsoft-edge-stable"),
		darwin: () =>
			getEdgeDarwin(
				"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
			),
		win32: () => getEdgeWindows("Edge"),
	},
	dev: {
		linux: () => getEdgeLinux("microsoft-edge-dev"),
		darwin: () =>
			getEdgeDarwin(
				"/Applications/Microsoft Edge Dev.app/Contents/MacOS/Microsoft Edge Dev",
			),
		win32: () => getEdgeWindows("Edge Dev"),
	},
	beta: {
		linux: () => getEdgeLinux("microsoft-edge-beta"),
		darwin: () =>
			getEdgeDarwin(
				"/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta",
			),
		win32: () => getEdgeWindows("Edge Beta"),
	},
	canary: {
		// linux: getEdgeLinux("microsoft-edge-beta"),
		darwin: () =>
			getEdgeDarwin(
				"/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary",
			),
		win32: () => getEdgeWindows("Edge SxS"),
	},
}

// returns edge path
export function getEdgePath(): string {
	let edge = edgePaths.edge

	if (platform && platform in edgePaths.edge) {
		let pth = edge[platform as keyof typeof edge]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Edge Stable", edgePaths)
}

// Returns edge dev path
export function getEdgeDevPath(): string {
	let edgeDev = edgePaths.dev

	if (platform && platform in edgeDev) {
		let pth = edgeDev[platform as keyof typeof edgeDev]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Edge Dev", edgePaths)
}

// Returns edge beta path if it is available
export function getEdgeBetaPath(): string {
	let edgeBeta = edgePaths.beta

	if (platform && platform in edgeBeta) {
		let pth = edgeBeta[platform as keyof typeof edgeBeta]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Edge Beta", edgePaths)
}

// Returns edge canary paths.
export function getEdgeCanaryPath(): string {
	let edgeCanary = edgePaths.canary

	if (platform && platform in edgeCanary) {
		let pth = edgeCanary[platform as keyof typeof edgeCanary]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Edge Canary", edgePaths)
}

// This will try to get any edge from bleeding edge to most stable version
export function getAnyEdgeLatest(): string {
	try {
		return getEdgeCanaryPath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	try {
		return getEdgeDevPath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	try {
		return getEdgeBetaPath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	try {
		return getEdgeDevPath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	throw {
		name: "edge-paths",
		message: `Unable to find any path`,
	}
}

// This will try to get edge from stable version to bleeding version
// Useful for playwright, puppeteer related stuff
export function getAnyEdgeStable(): string {
	try {
		return getEdgePath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	try {
		return getEdgeBetaPath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	try {
		return getEdgeDevPath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	try {
		return getEdgeCanaryPath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	throw {
		name: "edge-paths",
		message: `Unable to find any path`,
	}
}

// Helpers
function throwInvalidPlatformError(
	additionalInfo: string = "",
	otherDetails?: any,
): never {
	throw {
		name: "edge-paths",
		message: `Couldn't find the edge browser. ${additionalInfo}`,
		additionalInfo,
		otherDetails,
	}
}

function throwIfNotEdgePathIssue(obj: any) {
	if (
		Object.prototype.toString.call(obj) === "[object Object]" &&
		obj &&
		obj.name &&
		obj.name === "edge-paths"
	) {
		return true
	}

	throw obj
}
