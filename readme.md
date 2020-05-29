# Edge Paths

[![npm version](https://img.shields.io/npm/v/edge-paths.svg)](https://www.npmjs.com/package/edge-paths)
[![Build Status](https://travis-ci.com/shinnn/edge-paths.svg?branch=master)](https://travis-ci.com/shinnn/edge-paths)

Possible paths or binary names of [Edge](https://www.microsoft.com/en-us/edge) in the current platform

```javascript
const edgePaths = require("edge-paths")

// On macOS

edgePaths.edge //=> '/Users/quantum/Desktop/code/edge-paths/node_modules/edge-launcher/dist/x86/MicrosoftEdgeLauncher.exe'

// On Linux

edgePaths.edge //=> 'edge'

// On Windows

edgePaths.edge //=> 'C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe'

// On Solaris (Unsupported platform)

edgePaths.edge //=> null
```

## Installation

[Use](https://docs.npmjs.com/cli/install) [npm](https://docs.npmjs.com/about-npm/).

```
npm install edge-paths
```

## API

```javascript
const edgePaths = require("edge-paths")
```

### edgePaths.chrome, edgePaths.chromeCanary, edgePaths.chromium

Type: `string` or `null`

```javascript
const { execFile } = require("child_process")
const { promisify } = require("util")
const { chrome, chromeCanary } = require("edge-paths")

;(async () => {
  ;(await promisify(execFile)(chrome, ["--version"])).stdout //=> 'Google Chrome 71.0.3578.98 \n'
  ;(await promisify(execFile)(chromeCanary, ["--version"])).stdout //=> 'Google Chrome 74.0.3689.0 canary\n'
})()
```

Whether each property is a full path, just a binary name or `null` depends on the current [platform](https://nodejs.org/api/process.html#process_process_platform).

## License

[ISC License](./LICENSE) © 2020 Shirshak Bajgain
