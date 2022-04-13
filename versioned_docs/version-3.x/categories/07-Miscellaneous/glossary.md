---
title: Glossary
sidebar_position: 2
slug: /glossary/
---

We will list here the terms that are related to the Socket.IO ecosystem:

- [Adapter](#Adapter)
- [Engine.IO](#Engine-IO)
- [Namespace](#Namespace)
- [Room](#Room)
- [Transport](#Transport)

## Adapter

An Adapter is a server-side component which is responsible for:

- storing the relationships between the Socket instances and the [rooms](/docs/v3/rooms/)
- broadcasting events to [all](/docs/v3/broadcasting-events/) (or a subset of) clients

There are currently two official adapters:

- the [in-memory adapter](https://github.com/socketio/socket.io-adapter/), which is included by default with the Socket.IO server
- the [Redis adapter](https://github.com/socketio/socket.io-redis-adapter), which is useful when scaling horizontally (see [here](/docs/v4/using-multiple-nodes/))
- the [MongoDB adapter](https://github.com/socketio/socket.io-mongo-adapter)

The in-memory adapter can be extended to add support for other messaging systems, like RabbitMQ or Google Pub/Sub for example.

Please see the documentation [here](/docs/v3/rooms/#Implementation-details/).

## Engine.IO

Engine.IO is an internal component of Socket.IO, which is responsible for establishing the low-level connection between the server and the client.

You will find more information [here](/docs/v4/how-it-works/).

## Namespace

A Namespace is a concept that allows splitting the application logic on the server-side.

Please see the documentation [here](/docs/v3/namespaces/).

## Room

A Room is a server-side concept that allows broadcasting data to a subset of clients.

Please see the documentation [here](/docs/v3/rooms/).

## Transport

A Transport represents the low-level way of establishing a connection between the server and the client.

There are currently two implemented transports:

- HTTP long-polling
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

Please see the documentation [here](/docs/v3/how-it-works/#Transports).
