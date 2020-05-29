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
    let suffix = "\\Microsoft\\" + edgeDirName + "\\Application\\msedge.exe";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRDQUFtQjtBQUNuQixnREFBdUI7QUFRdkIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtBQUcvQixTQUFTLFVBQVUsQ0FBQyxXQUFtQjtJQUVyQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQ2hDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDZCxJQUFJLG9CQUFvQixFQUFFLENBQUMsRUFBRSxNQUFNLENBQUE7SUFDbkMsSUFBSSxNQUFNLEdBQUcsZUFBZSxHQUFHLFdBQVcsR0FBRywyQkFBMkIsQ0FBQTtJQUN4RSxJQUFJLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFBO0lBRXJHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXBCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxTQUFRO1NBQ1Q7UUFFRCxJQUFJO1lBQ0Ysb0JBQW9CLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDaEQsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1lBQ2hDLFlBQUUsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtZQUNuQyxPQUFPLG9CQUFvQixDQUFBO1NBQzVCO1FBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtLQUNmO0lBRUQsSUFB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