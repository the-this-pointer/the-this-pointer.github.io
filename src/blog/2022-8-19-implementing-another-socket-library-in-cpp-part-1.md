---
title: Implementing another socket library in C++ - Part 1
author: Reza
date: '2022-08-19'
categories:
  - C++
tags:
  - programming
---

So far, there are many robust networking libraries out there that can handle TCP and UDP communications very easily. One of the famous ones is `asio`. I prefer to write a basic library to practice coding skills in this series.

<!-- more -->

::: details
This is the first article about the network library series. The list will be updated as soon as new articles are added.

> *Implementing another socket library in C++ - Part 1*

<a href="implementing-another-socket-library-in-cpp-part-2.html" target="_blank">Implementing another socket library in C++ - Part 2</a>.

:::

## Socket Basics
As you know, there are two types of communication for sockets. `UDP` is the simpler one. It sends data to the endpoint and doesn't care whether the data is received or not. It can be used in back-ends services with high load, as `statsd` use this to gather statistical information. There is no need to connect to the endpoint for sending or receiving data. 

On the other hand, `TCP` has added some insurance for data delivery. It needs to connect first and then send or receive data on an active connection. Packets will receive in order, and the connection won't be established if there is a problem on the line between endpoints.

We can decide about socket `blocking mode`. A socket is `blocking` by default, and we can set it to `non-blocking`.
A blocking socket will not return to the program after calling a `recv` with an empty buffer or a `send` with a full buffer, but the non-blocking one will do these operations with a `WOULD BLOCK` error. Furthermore, an `accept` with no connecting client would return this error too.

And the last point, we have a `select` method that can be used with a blocking socket to prevent blocking program when using `recv`, but I haven't any play to use this at first sight.

## What Do We Want To Do?
We will write a `multi-platform` coding library for `Windows` and `Unix`. We will start coding with basic socket commands and implement a class for the socket connection. After that, we will write two classes for the server and client and complete the code with useful functionalities like `thread-safe` queues and `load-balancing` methods.

<!-- more -->
