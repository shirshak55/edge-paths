"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const which_1 = __importDefault(require("which"));
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
let dev = {
    linux: getBin(["edge", "edge-stable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Dev"),
    win32: getEdgeExe("Edge"),
};
let beta = {
    linux: getBin(["edge", "edge-stable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta"),
    win32: getEdgeExe("Edge"),
};
let canary = {
    linux: getBin(["edge-canary", "edge-unstable"]),
    darwin: getEdgeDarwin("/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary"),
    win32: getEdgeExe("Edge SxS"),
};
module.exports = {
    edge,
    dev,
    canary,
    beta,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNENBQW1CO0FBQ25CLGdEQUF1QjtBQUN2QixrREFBeUI7QUFHekIsU0FBUyxVQUFVLENBQUMsV0FBbUI7SUFFckMsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtRQUNoQyxPQUFPLElBQUksQ0FBQTtLQUNaO0lBQ0QsSUFBSSxvQkFBb0IsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFBO0lBQ25DLElBQUksTUFBTSxHQUFHLFdBQVcsR0FBRyx5QkFBeUIsQ0FBQTtJQUNwRCxJQUFJLFFBQVEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFBO0lBRXJHLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNwQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXBCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxTQUFRO1NBQ1Q7UUFFRCxJQUFJO1lBQ0Ysb0JBQW9CLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDaEQsWUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1lBQ25DLE9BQU8sb0JBQW9CLENBQUE7U0FDNUI7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0tBQ2Y7SUFFRCxPQUFPLG9CQUFvQixDQUFBO0FBQzdCLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxRQUFrQjtJQUVoQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQ2hDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFDRCxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDVixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSTtZQUNGLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDM0IsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDakIsTUFBSzthQUNOO1NBQ0Y7UUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0tBQ2Y7SUFDRCxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxXQUFtQjtJQUN4QyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ2pDLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxJQUFJO1FBQ0YsSUFBSSxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUssRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUN4RCxZQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZCLE9BQU8sUUFBUSxDQUFBO0tBQ2hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLFdBQVcsQ0FBQTtLQUNuQjtBQUNILENBQUM7QUFFRCxJQUFJLElBQUksR0FBRztJQUNULEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdEMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxxRUFBcUUsQ0FBQztJQUM1RixLQUFLLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBQztDQUMxQixDQUFBO0FBRUQsSUFBSSxHQUFHLEdBQUc7SUFDUixLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sRUFBRSxhQUFhLENBQUMseUVBQXlFLENBQUM7SUFDaEcsS0FBSyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUM7Q0FDMUIsQ0FBQTtBQUVELElBQUksSUFBSSxHQUFHO0lBQ1QsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN0QyxNQUFNLEVBQUUsYUFBYSxDQUFDLDBFQUEwRSxDQUFDO0lBQ2pHLEtBQUssRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDO0NBQzFCLENBQUE7QUFFRCxJQUFJLE1BQU0sR0FBRztJQUNYLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxhQUFhLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0MsTUFBTSxFQUFFLGFBQWEsQ0FBQyw4RUFBOEUsQ0FBQztJQUNyRyxLQUFLLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQztDQUM5QixDQUFBO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNmLElBQUk7SUFDSixHQUFHO0lBQ0gsTUFBTTtJQUNOLElBQUk7Q0FDTCxDQUFBIn0=