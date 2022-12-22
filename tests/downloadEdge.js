import got from "got"
import fs from "fs"

async function main() {
	let resp = await got.get(
		"https://edgeupdates.microsoft.com/api/products",
		{},
	)

	let json = JSON.parse(resp.body)

	let links = []
	for (let version of json) {
		for (let rr of version.Releases) {
			if (rr.Architecture === "x64" || rr.Architecture === "universal") {
				for (let aa of rr.Artifacts) {
					let an = aa.ArtifactName
					if (!aa.Location.includes("plist")) {
						if (process.platform === "darwin" && an === "pkg") {
							links.push(aa)
						}
						if (process.platform === "linux" && an === "deb") {
							links.push(aa)
						}
					}
				}
			}
		}
	}

	for (let ii of links) {
		let ss = ii.Location.split("/")
		let fname = ss[ss.length - 1]
		let resp = await got({
			url: ii.Location,
			method: "GET",
			responseType: "buffer",
		}).buffer()
		console.log(
			`Saving ${fname} with ${resp.byteLength / (1024 * 1024)} MB`,
		)
		fs.writeFileSync(fname, resp)
	}

	// let winLinks = [
	// 	{
	// 		type: "stable",
	// 		link: `https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Stable&language=en`,
	// 	},
	// 	{
	// 		type: "beta",
	// 		link: `https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Beta&language=en`,
	// 	},
	// 	{
	// 		type: "dev",
	// 		link: `https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Dev&language=en`,
	// 	},
	// 	{
	// 		type: "canary",
	// 		link: `https://c2rsetup.officeapps.live.com/c2r/downloadEdge.aspx?platform=Default&Channel=Canary&language=en`,
	// 	},
	// ]
	// for (let ii of winLinks) {
	// 	let fname = ii.type + ".exe"
	// 	let resp = await got({
	// 		url: ii.link,
	// 		method: "GET",
	// 		responseType: "buffer",
	// 	}).buffer()
	// 	console.log(
	// 		`Saving ${fname} with ${resp.byteLength / (1024 * 1024)} MB`,
	// 	)
	// 	fs.writeFileSync(fname, resp)
	// }
}

main().catch((e) => console.log("error", e))
