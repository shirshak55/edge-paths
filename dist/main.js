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
    let windowsEdgeDirectory, i, prefix;
    let suffix = edgeDirName + "\\Application\\msedge.exe";
    let prefixes = [process.env.LOCALAPPDATA, process.env.PROGRAMFILES, process.env["PROGRAMFILES(X86)"]];
    for (i = 0; i < prefixes.length; i++) {
        prefix = prefixes[i];
        if (!prefix) {
            continue;
        }
        try {
            windowsEdgeDirectory = path_1.default.join(prefix, suffix);
            paths.push(windowsEdgeDirectory);
            fs_1.default.accessSync(windowsEdgeDirectory);
            return windowsEdgeDirectory;
        }
        catch (e) { }
    }
    if (!windowsEdgeDirectory) {
        throw {
            package: "edge-paths",
            message: "Edge browser not found. Please recheck your installation.",
            paths,
        };
    }
    return windowsEdgeDirectory;
}
function getEdgeDarwin(defaultPath) {
    if (process.platform !== "darwin") {
        return null;
    }
    try {
        let homePath = path_1.default.join(process.env.HOME, defaultPath);
        fs_1.default.accessSync(homePath);
        return homePath;
    }
    catch (e) {
        return defaultPath;
    }
}
let edge = {
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge"),
    win32: getEdgeExe("Edge"),
};
let edgeDev = {
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Dev"),
    win32: getEdgeExe("Edge Dev"),
};
let edgeBeta = {
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
    win32: getEdgeExe("Edge Beta"),
};
let edgeCanary = {
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
    win32: getEdgeExe("Edge Canary"),
};
function throwInvalidPlatformError() {
    throw {
        package: "edge-paths",
        message: "Your platform is not supported. Only mac and windows are supported currently",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRDQUFtQjtBQUNuQixnREFBdUI7QUFRdkIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtBQUcvQixTQUFTLFVBQVUsQ0FBQyxXQUFtQjtJQUVyQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQ2hDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDZCxJQUFJLG9CQUFvQixFQUFFLENBQUMsRUFBRSxNQUFNLENBQUE7SUFDbkMsSUFBSSxNQUFNLEdBQUcsV0FBVyxHQUFHLDJCQUEyQixDQUFBO0lBQ3RELElBQUksUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUE7SUFFckcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFFcEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLFNBQVE7U0FDVDtRQUVELElBQUk7WUFDRixvQkFBb0IsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUNoRCxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7WUFDaEMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1lBQ25DLE9BQU8sb0JBQW9CLENBQUE7U0FDNUI7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0tBQ2Y7SUFFRCxJQUFJLENBQUMsb0JB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