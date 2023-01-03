import { existsSync } from "fs";
import path from "path";
import which from "which";
let platform = process.platform;
function getEdgeLinux(name) {
    try {
        let path = which.sync(name);
        return path;
    }
    catch (e) { }
    return null;
}
function getEdgeWindows(edgeDirName) {
    let paths = [];
    let suffix = `\\Microsoft\\${edgeDirName}\\Application\\msedge.exe`;
    let prefixes = [
        process.env.LOCALAPPDATA,
        process.env.PROGRAMFILES,
        process.env["PROGRAMFILES(X86)"],
    ].filter((v) => !!v);
    for (let prefix of prefixes) {
        let edgePath = path.join(prefix, suffix);
        paths.push(edgePath);
        if (existsSync(edgePath)) {
            return edgePath;
        }
    }
    return null;
}
function getEdgeDarwin(defaultPath) {
    if (existsSync(defaultPath)) {
        return defaultPath;
    }
    return null;
}
const edgePaths = {
    edge: {
        linux: () => getEdgeLinux("microsoft-edge-stable"),
        darwin: () => getEdgeDarwin("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"),
        win32: () => getEdgeWindows("Edge"),
    },
    dev: {
        linux: () => getEdgeLinux("microsoft-edge-dev"),
        darwin: () => getEdgeDarwin("/Applications/Microsoft Edge Dev.app/Contents/MacOS/Microsoft Edge Dev"),
        win32: () => getEdgeWindows("Edge Dev"),
    },
    beta: {
        linux: () => getEdgeLinux("microsoft-edge-beta"),
        darwin: () => getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
        win32: () => getEdgeWindows("Edge Beta"),
    },
    canary: {
        darwin: () => getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
        win32: () => getEdgeWindows("Edge SxS"),
    },
};
export function getEdgePath() {
    let edge = edgePaths.edge;
    if (platform && platform in edgePaths.edge) {
        let pth = edge[platform]();
        if (pth) {
            return pth;
        }
    }
    throwInvalidPlatformError("Edge Stable", edgePaths);
}
export function getEdgeDevPath() {
    let edgeDev = edgePaths.dev;
    if (platform && platform in edgeDev) {
        let pth = edgeDev[platform]();
        if (pth) {
            return pth;
        }
    }
    throwInvalidPlatformError("Edge Dev", edgePaths);
}
export function getEdgeBetaPath() {
    let edgeBeta = edgePaths.beta;
    if (platform && platform in edgeBeta) {
        let pth = edgeBeta[platform]();
        if (pth) {
            return pth;
        }
    }
    throwInvalidPlatformError("Edge Beta", edgePaths);
}
export function getEdgeCanaryPath() {
    let edgeCanary = edgePaths.canary;
    if (platform && platform in edgeCanary) {
        let pth = edgeCanary[platform]();
        if (pth) {
            return pth;
        }
    }
    throwInvalidPlatformError("Edge Canary", edgePaths);
}
export function getAnyEdgeLatest() {
    try {
        return getEdgeCanaryPath();
    }
    catch (e) {
        throwIfNotEdgePathIssue(e);
    }
    try {
        return getEdgeDevPath();
    }
    catch (e) {
        throwIfNotEdgePathIssue(e);
    }
    try {
        return getEdgeBetaPath();
    }
    catch (e) {
        throwIfNotEdgePathIssue(e);
    }
    try {
        return getEdgePath();
    }
    catch (e) {
        throwIfNotEdgePathIssue(e);
    }
    throw {
        name: "edge-paths",
        message: `Unable to find any ms-edge-browser`,
    };
}
export function getAnyEdgeStable() {
    try {
        return getEdgePath();
    }
    catch (e) {
        throwIfNotEdgePathIssue(e);
    }
    try {
        return getEdgeBetaPath();
    }
    catch (e) {
        throwIfNotEdgePathIssue(e);
    }
    try {
        return getEdgeDevPath();
    }
    catch (e) {
        throwIfNotEdgePathIssue(e);
    }
    try {
        return getEdgeCanaryPath();
    }
    catch (e) {
        throwIfNotEdgePathIssue(e);
    }
    throw {
        name: "edge-paths",
        message: `Unable to find any ms-edge-browser.`,
    };
}
function throwInvalidPlatformError(additionalInfo = "", otherDetails) {
    throw {
        name: "edge-paths",
        message: `Couldn't find the edge browser. ${additionalInfo}`,
        additionalInfo,
        otherDetails,
    };
}
function throwIfNotEdgePathIssue(obj) {
    if (Object.prototype.toString.call(obj) === "[object Object]" &&
        obj &&
        obj.name &&
        obj.name === "edge-paths") {
        return;
    }
    throw obj;
}
