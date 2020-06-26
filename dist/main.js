"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEdgeCanaryPath = exports.getEdgeBetaPath = exports.getEdgeDevPath = exports.getEdgePath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let platform = process.platform;
function getEdgeExe(edgeDirName) {
    if (process.platform !== "win32") {
        return null;
    }
    let paths = [];
    let suffix = `\\Microsoft\\${edgeDirName}\\Application\\msedge.exe`;
    let prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"]];
    for (let prefix of prefixes) {
        if (prefix) {
            let edgePath = path_1.default.join(prefix, suffix);
            paths.push(edgePath);
            if (fs_1.default.existsSync(edgePath)) {
                return edgePath;
            }
        }
    }
    throw {
        package: "edge-paths",
        message: "Edge browser not found. Please recheck your installation.",
        paths,
    };
}
function getEdgeDarwin(defaultPath) {
    if (process.platform !== "darwin") {
        return null;
    }
    if (fs_1.default.existsSync(defaultPath)) {
        return defaultPath;
    }
    throw {
        package: "edge-paths",
        message: `Edge browser not found. Please recheck your installation. Path ${defaultPath}`,
        path: defaultPath,
    };
}
function throwInvalidPlatformError() {
    throw {
        package: "edge-paths",
        message: "Your platform is not supported. Only mac and windows are supported currently",
    };
}
function getEdgePath() {
    let edge = {
        darwin: getEdgeDarwin("/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"),
        win32: getEdgeExe("Edge"),
    };
    if (platform && platform in edge) {
        return edge[platform];
    }
    throwInvalidPlatformError();
}
exports.getEdgePath = getEdgePath;
function getEdgeDevPath() {
    let edgeDev = {
        darwin: getEdgeDarwin("/Applications/Microsoft Edge Dev.app/Contents/MacOS/Microsoft Edge Dev"),
        win32: getEdgeExe("Edge Dev"),
    };
    if (platform && platform in edgeDev) {
        return edgeDev[platform];
    }
    throwInvalidPlatformError();
}
exports.getEdgeDevPath = getEdgeDevPath;
function getEdgeBetaPath() {
    let edgeBeta = {
        darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
        win32: getEdgeExe("Edge Beta"),
    };
    if (platform && platform in edgeBeta) {
        return edgeBeta[platform];
    }
    throwInvalidPlatformError();
}
exports.getEdgeBetaPath = getEdgeBetaPath;
function getEdgeCanaryPath() {
    let edgeCanary = {
        darwin: getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
        win32: getEdgeExe("Edge SxS"),
    };
    if (platform && platform in edgeCanary) {
        return edgeCanary[platform];
    }
    throwInvalidPlatformError();
}
exports.getEdgeCanaryPath = getEdgeCanaryPath;
if (require.main === module) {
    try {
        console.log("Edge Beta", getEdgeBetaPath());
    }
    catch (e) {
        console.log(e);
    }
    try {
        console.log("Edge Canary", getEdgeCanaryPath());
    }
    catch (e) {
        console.log(e);
    }
    try {
        console.log("Edge Dev", getEdgeDevPath());
    }
    catch (e) {
        console.log(e);
    }
    try {
        console.log("Edge", getEdgePath());
    }
    catch (e) {
        console.log(e);
    }
}
