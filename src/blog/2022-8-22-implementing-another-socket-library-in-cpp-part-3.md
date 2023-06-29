---
title: Implementing another socket library in C++ - Part 3
author: Rsomething
date: '2022-08-22'
categories:
  - C++
tags:
  - programming
---
So far, we have talked about socket differences and a simple implementation of bottom-layer socket methods, the TCP, non-blocking ones. This part will add support for Unix methods and enhancements for previous code.

<!-- more -->

::: details
This is a part of implementing a socket network library series. The list will be updated as soon as new articles are added.

<a href="implementing-another-socket-library-in-cpp-part-1.html" target="_blank">Implementing another socket library in C++ - Part 1</a>.

<a href="implementing-another-socket-library-in-cpp-part-2.html" target="_blank">Implementing another socket library in C++ - Part 2</a>.

> *Implementing another socket library in C++ - Part 3*
:::

> Please be aware that, at this time, I only work on Windows, and that's not possible for me to test the Unix code. So, maybe the code has typos or doesn't work on Unix.

## Source Code Enhancements

The first enhancement I plan to do is for the initialize and cleanup functions used for Windows only. We don't need these on Unix, So we add we check the platform using macros to enable the methods for Windows.

The last change for this section is like this:
``` cpp
#if defined(WIN32) || defined(WIN64)
    // Windows specific methods
    bool gNetInitialized = false;
    int initialize() {
      ...
    }

    int cleanup() {
      ...
    }
#else
    // Unix specific methods
    int initialize() { return 0; }
    int cleanup() { return 0; }
#endif
```
Now, we just add another variable to count the number of sockets to initialize and clean up on Windows. When the first socket is created, the `WSAStartup` will be called, and when the last socket is destroyed, the `WSACleanup` will be called again. After adding this, there is no need for `gNetInitialized` variable, so I remove this variable.


The second enhancement is adding socket block mode support to the source code. First, I added a method to enable the user to change socket blocking mode; this part is different for Windows and Unix, so we added these methods to the blocks we added before near the `initialize` and `cleanup` functions. For Windows it's like this:

``` cpp
    // Windows code
    int setBlocking(SOCKET socket, bool isBlocking) {
      int nCurFlag = isBlocking? 0: 1;
      return ioctlsocket(socket, FIONBIO, (ULONG *)&nCurFlag);
    }
```

For Unix, the method name is different. We should get the socket flags and change the blocking mode on it.
``` cpp
    // Unix code
    int setBlocking(SOCKET socket, bool isBlocking) {
      int nCurFlag;
      if ((nCurFlag = fcntl(m_socket, F_GETFL)) < 0)
      {
          return nCurFlag;
      }

      if (isBlocking)
        nCurFlag &= (~O_NONBLOCK);
      else
        nCurFlag |= O_NONBLOCK;

      return fcntl(m_socket, F_SETFL, nCurFlag);
    }
```

The following enhancement is to add the methods for getting error codes and descriptions for the two platforms. In Windows, the error returned from `WSAGetLastError`, but on Unix, it's in `errno`, and because of differences in error codes in the two platforms, I declared an `enum` to translate the codes to it.

After that, I changed the code I shared in `Part 2`. When the error occurred, I cleaned up the windows socket, but now I should refactor that. For non-blocking sockets, `recv`, `send`, and the other methods may return an error named `EWOULDBLOCK` or `EAGAIN`, which is not an error in fact; it just tells us there is no data in the buffer to `recv` or `send`.

::: tip
You can watch what I've done in this 
<a href="https://github.com/the-this-pointer/network-library" target="_blank">Github repo</a>.
:::

<!-- more -->
