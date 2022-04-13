---
title: "Monthly update #5"
slug: /monthly-update-5/
authors: darrachequesne
---

Hi everyone!

Here's the #5 edition of our Monthly update.

<!--truncate-->

So, what's new in the Socket.IO ecosystem?

- [A new API for inter-server communication](#a-new-api-for-inter-server-communication)
- [New official adapters](#new-official-adapters)
- [Additional documentation](#additional-documentation)
- [Version updates](#version-updates)
- [What's next](#whats-next)

## A new API for inter-server communication

This feature had been requested for quite some time, it is now implemented in release 4.1.0. It allows to broadcast events between your Socket.IO servers.

The syntax is very similar to the existing one, except it's for server-to-server communication:

```js
io.serverSideEmit("hello", "world");
```

And on the receiving side:

```js
io.on("hello", (arg1) => {
  console.log(arg1); // prints "world"
});
```

Acknowledgements are supported too:

```js
// server A
io.serverSideEmit("ping", (err, responses) => {
  console.log(responses[0]); // prints "pong"
});

// server B
io.on("ping", (cb) => {
  cb("pong");
});
```

You can find the complete release notes [here](/blog/socket-io-4-1-0/).

## New official adapters

Historically, the Redis adapter was the only official adapter when scaling to multiple nodes.

There are now three additional official adapters:

- the [MongoDB adapter](/docs/v4/mongo-adapter/)
- the [Postgres adapter](/docs/v4/postgres-adapter/)
- the [cluster adapter](/docs/v4/cluster-adapter/)

Note: the first two were inspired from existing adapters maintained by the community and were updated to support Socket.IO v3.

All of them supports the [utility methods](/docs/v4/server-instance/#utility-methods) that were added in v4, including the `serverSideEmit()` method described above.

## Additional documentation

- usage with bundlers like webpack for the [client](/docs/v4/client-with-bundlers/) and the [server](/docs/v4/server-with-bundlers/)
- [usage with PM2](/docs/v4/pm2/)

## Version updates

- [socket.io@4.1.2](https://github.com/socketio/socket.io/releases/tag/4.1.2)
- [socket.io-client@4.1.2](https://github.com/socketio/socket.io-client/releases/tag/4.1.2)

## What's next

- a continuous focus on the documentation (additional code examples, extended guide, ...)
- additional tooling around Socket.IO

Happy coding!
