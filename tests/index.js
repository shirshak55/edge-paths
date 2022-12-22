import {
	getEdgeBetaPath,
	getEdgeCanaryPath,
	getEdgeDevPath,
	getEdgePath,
} from "../dist/index.js"
import { execFile } from "child_process"
import { promisify } from "util"

// Todo when canary beta are released remove ignoredOnLinux
// variable.  And don't forget to update src/main.ts
console.log("Testing Edge Browser")
async function check(binaryPathFunc, shouldBe) {
	let ignoreOnLinux = ["canary"]
	shouldBe = shouldBe.toLowerCase()

	console.log("Running test for", {
		binaryPath: binaryPathFunc,
		shouldBe,
		platform: process.platform,
		ignoreOnLinux: ignoreOnLinux.includes(shouldBe),
	})

	if (process.platform === "linux" && ignoreOnLinux.includes(shouldBe)) {
		return
	}

	console.log("Checking for path")
	let pth = binaryPathFunc()
	console.log("Path is", pth)
	console.log("Checking for version")

	if (process.platform !== "win32") {
		const { stdout } = await promisify(execFile)(pth, ["--version"])
		console.log("Version is", stdout)

		if (stdout.trim().toLowerCase().includes(shouldBe)) {
			console.log(`Passed: ${pth}`)
		} else {
			throw `Couldn't get ${pth} working`
		}
	} else if (process.platform === "win32") {
		const { stdout } = await promisify(execFile)("ls", [pth])

		if (stdout.trim().toLowerCase().includes(".exe")) {
			console.log(`Passed: ${pth}`)
		} else {
			throw `Couldn't get ${pth} working`
		}
	} else {
		throw "Invalid platform"
	}
}

async function main() {
	await check(() => getEdgeBetaPath(), "Beta")
	await check(() => getEdgeCanaryPath(), "Canary")
	await check(() => getEdgeDevPath(), "Dev")
	await check(() => getEdgePath(), "Edge")
}

main().catch((e) => {
	console.log("Error from main", e)
	// Exit so ci can notice?
	process.exit(1)
})
