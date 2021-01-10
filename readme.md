# Edge Paths

[![npm version](https://img.shields.io/npm/v/edge-paths.svg)](https://www.npmjs.com/package/edge-paths)
[![Downloads](https://img.shields.io/npm/dm/edge-paths.svg)](https://npmjs.com/edge-paths)
[![Install size](https://packagephobia.now.sh/badge?p=edge-paths)](https://packagephobia.now.sh/result?p=edge-paths)

Possible paths or binary names of [Edge](https://www.microsoft.com/en-us/edge) in the current platform

Javascript

```javascript
let { getEdgeBetaPath, getEdgeCanaryPath, getEdgeDevPath, getEdgePath } = require("edge-paths")

console.log(getEdgeBetaPath())
console.log(getEdgeCanaryPath())
console.log(getEdgeDevPath())
console.log(getEdgePath())

// On OSX
// /Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Beta
// /Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary
// /Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge Dev
// /Applications/Microsoft Edge Beta.app/Contents/MacOS/Microsoft Edge

// On Windows
// C:\Program Files (x86)\Microsoft\Edge Beta\Application\msedge.exe
// C:\Program Files (x86)\Microsoft\Edge Canary\Application\msedge.exe
// C:\Program Files (x86)\Microsoft\Edge Dev\Application\msedge.exe
// C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe

// On Linux
```

Typescript

```typescript
import { getEdgeBetaPath, getEdgeCanaryPath, getEdgeDevPath, getEdgePath } from "edge-paths"

console.log(getEdgeBetaPath())
console.log(getEdgeCanaryPath())
console.log(getEdgeDevPath())
console.log(getEdgePath())
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```bash
$ npm install edge-paths

// or

$ yarn add edge-paths
```

## API

```javascript
const edgePaths = require("edge-paths")
const edgeStable = getEdgePath()
```

## Used By

- [devtools](https://www.npmjs.com/package/devtools)

- Please send PR if you are using edge paths. We will be accepting first 10 request.

## License

[MIT License](./LICENSE)

© 2020 Shirshak Bajgain
