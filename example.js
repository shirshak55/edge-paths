import {
	getEdgeBetaPath,
	getEdgeCanaryPath,
	getEdgeDevPath,
	getEdgePath,
	getAnyEdgeStable,
	getAnyEdgeLatest,
} from ('./dist/main.js')
// don't forget to replace above with following line
// let { getEdgeBetaPath, getEdgeCanaryPath, getEdgeDevPath, getEdgePath } from 'edge-paths'

// Here is one naive example. Uncomment following line to test
// console.log(getEdgeBetaPath())
// console.log(getEdgeCanaryPath())
// console.log(getEdgeDevPath())
// console.log(getEdgePath())

// Here is another example with try catch
// This find edge function just ignore the error
function findEdge(func) {
	try {
		let path = func()
		console.log("Found path", path)
	} catch (e) {
		console.log("Error on finding path", e)
	}
}

findEdge(() => getEdgeBetaPath())
findEdge(() => getEdgeCanaryPath())
findEdge(() => getEdgeDevPath())
findEdge(() => getEdgePath())
findEdge(() => getAnyEdgeStable())
findEdge(() => getAnyEdgeLatest())
