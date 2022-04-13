---
title: Client Installation
sidebar_label: Installation
sidebar_position: 1
slug: /client-installation/
---

## Version compatibility

Here is the compatibility table between the server and the JS client:

<table>
<tbody>
    <tr>
        <th rowSpan="2">JS Client version</th>
        <th colSpan="4">Socket.IO server version</th>
    </tr>
    <tr>
        <td align="center">1.x</td>
        <td align="center">2.x</td>
        <td align="center">3.x</td>
        <td align="center">4.x</td>
    </tr>
    <tr>
        <td align="center">1.x</td>
        <td align="center"><b>YES</b></td>
        <td align="center">NO</td>
        <td align="center">NO</td>
        <td align="center">NO</td>
    </tr>
    <tr>
        <td align="center">2.x</td>
        <td align="center">NO</td>
        <td align="center"><b>YES</b></td>
        <td align="center"><b>YES</b><sup>1</sup></td>
        <td align="center"><b>YES</b><sup>1</sup></td>
    </tr>
    <tr>
        <td align="center">3.x</td>
        <td align="center">NO</td>
        <td align="center">NO</td>
        <td align="center"><b>YES</b></td>
        <td align="center"><b>YES</b></td>
    </tr>
    <tr>
        <td align="center">4.x</td>
        <td align="center">NO</td>
        <td align="center">NO</td>
        <td align="center"><b>YES</b></td>
        <td align="center"><b>YES</b></td>
    </tr>
</tbody>
</table>

[1] Yes, with <code><a href="https://socket.io/docs/v4/server-initialization/#allowEIO3">allowEIO3: true</a></code>

Please check the associated migration guides:

- [v2 to v3](/docs/v4/migrating-from-2-x-to-3-0/)
- [v3 to v4](/docs/v4/migrating-from-3-x-to-4-0/)

## Browser support

Socket.IO does support IE9 and above. IE 6/7/8 are not supported anymore.

Browser compatibility is tested thanks to the awesome Sauce Labs platform:

![Browser support](/images/saucelabs.svg)

## Release notes

The release notes of each version can be found in [GitHub](https://github.com/socketio/socket.io-client/releases).

## Installation

### Standalone build

By default, the Socket.IO server exposes a client bundle at `/socket.io/socket.io.js`.

`io` will be registered as a global variable:

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();
</script>
```

If you don't need this (see other options below), you can disable the functionality on the server side:

```js
const io = require("socket.io")({
  serveClient: false
});
```

### From a CDN

You can also include the client bundle from a CDN:

```html
<script src="https://cdn.socket.io/3.1.3/socket.io.min.js" integrity="sha384-cPwlPLvBTa3sKAgddT6krw0cJat7egBga3DJepJyrLl4Q9/5WLra3rrnMcyTyOnh" crossorigin="anonymous"></script>
```

Socket.IO is also available from other CDN:

- cdnjs: https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.3/socket.io.min.js
- jsDelivr: https://cdn.jsdelivr.net/npm/socket.io-client@3.1.3/dist/socket.io.min.js
- unpkg: https://unpkg.com/socket.io-client@3.1.3/dist/socket.io.min.js

There are several bundles available:

| Name              | Size             | Description |
|:------------------|:-----------------|:------------|
| socket.io.js               | 34.7 kB gzip     | Unminified version, with [debug](https://www.npmjs.com/package/debug)    |
| socket.io.min.js           | 14.7 kB min+gzip | Production version, without [debug](https://www.npmjs.com/package/debug) |
| socket.io.msgpack.min.js   | 15.3 kB min+gzip | Production version, without [debug](https://www.npmjs.com/package/debug) and with the [msgpack parser](https://github.com/socketio/socket.io-msgpack-parser)    |

The [debug](https://www.npmjs.com/package/debug) package allows to print debug information to the console. You can find more information [here](/docs/v3/logging-and-debugging/).

During development, we recommend using the `socket.io.js` bundle. By setting `localStorage.debug = 'socket.io-client:socket'`, any event received by the client will be printed to the console.

For production, please use the `socket.io.min.js` bundle, which is an optimized build excluding the debug package.

### From NPM

The Socket.IO client is compatible with bundlers like [webpack](https://webpack.js.org/) or [browserify](http://browserify.org/).

```
$ npm install socket.io-client
```

The client can also be run from Node.js.

Note: for the reasons cited above, you may want to exclude debug from your browser bundle. With webpack, you can use [webpack-remove-debug](https://github.com/johngodley/webpack-remove-debug).

Note for TypeScript users: the types are now included in the `socket.io-client` package and thus the types from `@types/socket.io-client` are not needed anymore and may in fact cause errors:

```
Object literal may only specify known properties, and 'extraHeaders' does not exist in type 'ConnectOpts'
```
