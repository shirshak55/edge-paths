# Edge Paths

[![npm version](https://img.shields.io/npm/v/edge-paths.svg)](https://www.npmjs.com/package/edge-paths)
[![Build Status](https://travis-ci.com/shinnn/edge-paths.svg?branch=master)](https://travis-ci.com/shinnn/edge-paths)

Possible paths or binary names of [Edge](https://www.microsoft.com/en-us/edge) in the current platform

```javascript
let { getEdgeBetaPath, getEdgeCanaryPath, getEdgeDevPath, getEdgePath } = require(".") // Replace with require("edge-paths")

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
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install edge-paths

or

yarn add edge-paths
```

## API

```javascript
const edgePaths = require("edge-paths")
```

## License

[ISC License](./LICENSE) © 2020 Shirshak Bajgain
