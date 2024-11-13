import { existsSync } from "node:fs"
import path from "node:path"
import which from "which"
import process, { platform } from 'node:process'

/**
 * Caller will ensure that the platform is windows, otherwise null will be returned. 
 * This is internal function and isn't exported to public.
 * @param edgeDirName 
 * @returns edge paths for windows platform
 */
function getEdgeLinux(
	name:
		| "microsoft-edge-dev"
		| "microsoft-edge-beta"
		| "microsoft-edge-stable",
): string | null {
	try {
		const path = which.sync(name)
		return path
	} catch (e) {}

	return null
}


/**
 * Caller will ensure that the platform is windows, otherwise null will be returned
 * @param edgeDirName 
 * @returns edge paths for windows platform
 */
function getEdgeWindows(
	edgeDirName: "Edge" | "Edge Dev" | "Edge Beta" | "Edge SxS",
): string | null {
	const paths = []
	const suffix = `\\Microsoft\\${edgeDirName}\\Application\\msedge.exe`
	const prefixes = [
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

/**
 * Caller will ensure that the platform is macos, otherwise null will be returned
 * @param defaultPath is the default path of edge browser.
 * @returns gives null if executable isn't available in given path.
 */
function getEdgeDarwin(defaultPath: string): string | null {
	if (existsSync(defaultPath)) {
		return defaultPath
	}

	return null
}

/**
 * Mother object of edge paths package.
 */
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

/**
 * Gives executable path for edge stable browser
 * @returns Gets edge stable browser path.
 */
export function getEdgePath(): string {
	const edge = edgePaths.edge

	if (platform && platform in edgePaths.edge) {
		const pth = edge[platform as keyof typeof edge]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Edge Stable", edgePaths)
}

/**
 * Gives executable path for edge dev.
 * @returns Gets edge dev path.
 */
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

/**
 * Gives executable path for edge beta.
 * @returns Gets edge beta path.
 */
export function getEdgeBetaPath(): string {
	const edgeBeta = edgePaths.beta

	if (platform && platform in edgeBeta) {
		const pth = edgeBeta[platform as keyof typeof edgeBeta]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Edge Beta", edgePaths)
}

/**
 * Gives path of canary edge browser
 * @returns paths of canary edge
 * @throws it throws error if it can't find edge canary.
 */
export function getEdgeCanaryPath(): string {
	const edgeCanary = edgePaths.canary

	if (platform && platform in edgeCanary) {
		const pth = edgeCanary[platform as keyof typeof edgeCanary]()
		if (pth) {
			return pth
		}
	}
	throwInvalidPlatformError("Edge Canary", edgePaths)
}

/**
 * This function will try to find edge browser in order: canary, dev, beta and stable.
 * @returns browser path from most bleeding edge to stable
 * @throws if edge paths isn't found, it throws error with name: "edge-paths"
 */
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
		return getEdgePath()
	} catch (e) {
		throwIfNotEdgePathIssue(e)
	}

	throw {
		name: "edge-paths",
		message: `Unable to find any ms-edge-browser`,
	}
}

// This will try to get edge from stable version to bleeding version
// Useful for playwright, puppeteer related stuff
/**
 * It tries to find edge stable and if it can't it goes to beta and so on.
 * @returns any browser path and searches from stable to bleeding edge.
 */
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
		message: `Unable to find any ms-edge-browser.`,
	}
}

/**
 * If we can't find edge browser we give this error.
 * @param additionalInfo additional information that caused this error
 * @param otherDetails if there are other details, we give it to user so they can investigate it.
 */
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

/**
 *  If we encounter issues that we don't know this will simply throw the error.
 * @param obj 
 * @returns 
 */
function throwIfNotEdgePathIssue(obj: any) {
	if (
		Object.prototype.toString.call(obj) === "[object Object]" &&
		obj &&
		obj.name &&
		obj.name === "edge-paths"
	) {
		return
	}

	throw obj
}
