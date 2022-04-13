---
title: The Socket instance (server-side)
sidebar_label: The Socket instance
sidebar_position: 4
slug: /server-socket-instance/
---

Besides:

- [emitting](/docs/v3/emitting-events/#Basic-emit) and [listening to](/docs/v3/listening-to-events/) events
- [broadcasting events](/docs/v3/broadcasting-events/#To-all-connected-clients-excepting-the-sender)
- [joining and leaving rooms](/docs/v3/rooms/#Joining-and-leaving)

The Socket instance has a few attributes that may be of use in your application:

## Socket#id

Each new connection is assigned a random 20-characters identifier.

This identifier is synced with the value on the client-side.

```js
// server-side
io.on("connection", (socket) => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

// client-side
socket.on("connect", () => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});
```

Upon creation, the Socket joins the room identified by its own id, which means you can use it for private messaging:

```js
io.on("connection", socket => {
  socket.on("private message", (anotherSocketId, msg) => {
    socket.to(anotherSocketId).emit("private message", socket.id, msg);
  });
});
```

Note: you can't overwrite this identifier, as it is used in several parts of the Socket.IO codebase.

## Socket#handshake

This object contains some details about the handshake that happens at the beginning of the Socket.IO session.

```
{
  headers: /* the headers of the initial request */
  query: /* the query params of the initial request */
  auth: /* the authentication payload */
  time: /* the date of creation (as string) */
  issued: /* the date of creation (unix timestamp) */
  url: /* the request URL string */
  address: /* the ip of the client */
  xdomain: /* whether the connection is cross-domain */
  secure: /* whether the connection is secure */
}
```

Example:

```json
{
  "headers": {
    "user-agent": "xxxx",
    "accept": "*/*",
    "host": "example.com",
    "connection": "close"
  },
  "query": {
    "EIO": "4",
    "transport": "polling",
    "t": "NNjNltH"
  },
  "auth": {
    "token": "123"
  },
  "time": "Sun Nov 22 2020 01:33:46 GMT+0100 (Central European Standard Time)",
  "issued": 1606005226969,
  "url": "/socket.io/?EIO=4&transport=polling&t=NNjNltH",
  "address": "::ffff:1.2.3.4",
  "xdomain": false,
  "secure": true
}
```

## Socket#rooms

This is a reference to the [rooms](/docs/v3/rooms/) the Socket is currently in.

```js
io.on("connection", (socket) => {
  console.log(socket.rooms); // Set { <socket.id> }
  socket.join("room1");
  console.log(socket.rooms); // Set { <socket.id>, "room1" }
});
```

## Additional attributes

As long as you do not overwrite any existing attribute, you can attach any attribute to the Socket instance and use it later:

```js
// in a middleware
io.use(async (socket, next) => {
  try {
    const user = await fetchUser(socket);
    socket.user = user;
  } catch (e) {
    next(new Error("unknown user"));
  }
});

io.on("connection", (socket) => {
  console.log(socket.user);

  // in a listener
  socket.on("set username", (username) => {
    socket.username = username;
  });
});

```

## Socket middlewares

Those middlewares looks a lot like the usual [middlewares](/docs/v3/middlewares/), except that they are called for each incoming packet:

```js
socket.use(([event, ...args], next) => {
  // do something with the packet (logging, authorization, rate limiting...)
  // do not forget to call next() at the end
  next();
});
```

The `next` method can also be called with an error object. In that case, the event will not reach the registered event handlers and an `error` event will be emitted instead:

```js
io.on("connection", (socket) => {
  socket.use(([event, ...args], next) => {
    if (isUnauthorized(event)) {
      return next(new Error("unauthorized event"));
    }
    next();
  });

  socket.on("error", (err) => {
    if (err && err.message === "unauthorized event") {
      socket.disconnect();
    }
  });
});
```

Note: this feature only exists on the server-side. For the client-side, you might be interested in [catch-all listeners](/docs/v3/listening-to-events/#Catch-all-listeners).

## Events

On the server-side, the Socket instance emits two special events:

- [`disconnect`](#disconnect)
- [`disconnecting`](#disconnecting)

### `disconnect`

This event is fired by the Socket instance upon disconnection.

```js
io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {
    // ...
  });
});
```

Here is the list of possible reasons:

Reason | Description
------ | -----------
`server namespace disconnect` | The socket was forcefully disconnected with [socket.disconnect()](/docs/v3/server-api/#socket-disconnect-close)
`client namespace disconnect` | The client has manually disconnected the socket using [socket.disconnect()](/docs/v3/client-api/#socket-disconnect)
`server shutting down` | The server is, well, shutting down
`ping timeout` | The client did not send a PONG packet in the `pingTimeout` delay
`transport close` | The connection was closed (example: the user has lost connection, or the network was changed from WiFi to 4G)
`transport error` | The connection has encountered an error


### `disconnecting`

This event is similar to `disconnect` but is fired a bit earlier, when the [Socket#rooms](/docs/v3/server-socket-instance/#Socket-rooms) set is not empty yet

```js
io.on("connection", (socket) => {
  socket.on("disconnecting", (reason) => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }
  });
});
```

Note: those events, along with `connect`, `connect_error`, `newListener` and `removeListener`, are special events that shouldn't be used in your application:

```js
// BAD, will throw an error
socket.emit("disconnect");
```

## Complete API

The complete API exposed by the Socket instance can be found [here](/docs/v3/server-api/#Socket).
