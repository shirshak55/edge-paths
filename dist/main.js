"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEdgeCanaryPath = exports.getEdgeBetaPath = exports.getEdgeDevPath = exports.getEdgePath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const which_1 = __importDefault(require("which"));
let platform = process.platform;
function getEdgeExe(edgeDirName) {
    if (process.platform !== "win32") {
        return null;
    }
    var windowsEdgeDirectory, i, prefix;
    var suffix = edgeDirName + "\\Application\\edge.exe";
    var prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"]];
    for (i = 0; i < prefixes.length; i++) {
        prefix = prefixes[i];
        if (!prefix) {
            continue;
        }
        try {
            windowsEdgeDirectory = path_1.default.join(prefix, suffix);
            fs_1.default.accessSync(windowsEdgeDirectory);
            return windowsEdgeDirectory;
        }
        catch (e) { }
    }
    return windowsEdgeDirectory;
}
function getBin(commands) {
    if (process.platform !== "linux") {
        return null;
    }
    var bin, i;
    for (i = 0; i < commands.length; i++) {
        try {
            if (which_1.default.sync(commands[i])) {
                bin = commands[i];
                break;
            }
        }
        catch (e) { }
    }
    return bin;
}
function getEdgeDarwin(defaultPath) {
    if (process.platform !== "darwin") {
        return null;
    }
    try {
        var homePath = path_1.default.join(process.env.HOME, defaultPath);
        fs_1.default.accessSync(homePath);
        return homePath;
    }
    catch (e) {
        return defaultPath;
    }
}
let edge = {
    linux: getBin(["edge", "edge-stable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge"),
    win32: getEdgeExe("Edge"),
};
let edgeDev = {
    linux: getBin(["edge", "edge-stable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Dev"),
    win32: getEdgeExe("Edge"),
};
let edgeBeta = {
    linux: getBin(["edge", "edge-stable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
    win32: getEdgeExe("Edge"),
};
let edgeCanary = {
    linux: getBin(["edge-canary", "edge-unstable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
    win32: getEdgeExe("Edge SxS"),
};
function throwInvalidPlatformError() {
    throw {
        package: "edge-paths",
        message: "Your platform is not supported. Only linux, mac and windows are supported currently",
    };
}
function getEdgePath() {
    if (platform && platform in edge) {
        return edge[platform];
    }
    throwInvalidPlatformError();
}
exports.getEdgePath = getEdgePath;
function getEdgeDevPath() {
    if (platform && platform in edgeDev) {
        return edgeDev[platform];
    }
    throwInvalidPlatformError();
}
exports.getEdgeDevPath = getEdgeDevPath;
function getEdgeBetaPath() {
    if (platform && platform in edgeBeta) {
        return edgeBeta[platform];
    }
    throwInvalidPlatformError();
}
exports.getEdgeBetaPath = getEdgeBetaPath;
function getEdgeCanaryPath() {
    if (platform && platform in edgeCanary) {
        return edgeCanary[platform];
    }
    throwInvalidPlatformError();
}
exports.getEdgeCanaryPath = getEdgeCanaryPath;
if (require.main === module) {
    console.log(module.exports);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRDQUFtQjtBQUNuQixnREFBdUI7QUFDdkIsa0RBQXlCO0FBRXpCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7QUFHL0IsU0FBUyxVQUFVLENBQUMsV0FBbUI7SUFFckMsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtRQUNoQyxPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsSUFBSSxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFBO0lBQ25DLElBQUksTUFBTSxHQUFHLFdBQVcsR0FBRyx5QkFBeUIsQ0FBQTtJQUNwRCxJQUFJLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFBO0lBRXJHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXBCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxTQUFRO1NBQ1Q7UUFFRCxJQUFJO1lBQ0Ysb0JBQW9CLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDaEQsWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1lBQ25DLE9BQU8sb0JBQW9CLENBQUE7U0FDNUI7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0tBQ2Y7SUFFRCxPQUFPLG9CQUFvQixDQUFBO0FBQzdCLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxRQUFrQjtJQUVoQyxJQUFJLE9BQU8sQ0FB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