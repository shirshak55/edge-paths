import fs from "node:fs"
import path from "node:path"
import got from "got"

const EDGE_UPDATES_API = "https://edgeupdates.microsoft.com/api/products"

const WINDOWS_DOWNLOAD_LINKS = {
	stable: "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Stable&language=en",
	beta: "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Beta&language=en",
	dev: "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Dev&language=en",
	canary: "https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Canary&language=en",
}

async function downloadFile(url, filename) {
	const buffer = await got(url, { responseType: "buffer" }).buffer()
	fs.writeFileSync(filename, buffer)
	console.log(`Saved ${filename} (${(buffer.byteLength / (1024 * 1024)).toFixed(1)} MB)`)
}

async function downloadFromEdgeUpdatesAPI(artifactType) {
	const resp = await got(EDGE_UPDATES_API)
	const products = JSON.parse(resp.body)

	const artifacts = []
	for (const product of products) {
		for (const release of product.Releases) {
			if (release.Architecture !== "x64" && release.Architecture !== "universal") continue
			for (const artifact of release.Artifacts) {
				if (artifact.Location.includes("plist")) continue
				if (artifact.ArtifactName === artifactType) {
					artifacts.push(artifact)
				}
			}
		}
	}

	for (const artifact of artifacts) {
		const filename = path.basename(new URL(artifact.Location).pathname)
		await downloadFile(artifact.Location, filename)
	}
}

async function downloadWindowsEdge() {
	for (const [channel, url] of Object.entries(WINDOWS_DOWNLOAD_LINKS)) {
		const filename = `edge-${channel}.exe`
		await downloadFile(url, filename)
	}
}

async function main() {
	if (process.platform === "darwin") {
		await downloadFromEdgeUpdatesAPI("pkg")
	} else if (process.platform === "linux") {
		await downloadFromEdgeUpdatesAPI("deb")
	} else if (process.platform === "win32") {
		await downloadWindowsEdge()
	} else {
		throw new Error(`Unsupported platform: ${process.platform}`)
	}
}

main().catch((e) => {
	console.error("Error downloading Edge:", e)
	process.exit(1)
})
