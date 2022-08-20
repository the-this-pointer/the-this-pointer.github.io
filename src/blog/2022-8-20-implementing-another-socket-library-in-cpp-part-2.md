---
title: Implementing another socket library in C++ - Part 2
author: Reza
date: '2022-08-20'
categories:
  - C++
tags:
  - programming
---
Let's create Microsoft Windows-specific socket methods.

<!-- more -->

::: details
This is a part of implementing a socket network library series. The list will be updated as soon as new articles are added.

<a href="implementing-another-socket-library-in-cpp-part-1.html" target="_blank">Implementing another socket library in C++ - Part 1</a>.

> *Implementing another socket library in C++ - Part 2*
:::

## Implementing Windows Specific Methods

In the previous part, we discussed what and how we want to implement the library generally. In this part, we will create a new project for the library and add a file named `net_win.h` for Windows-specific socket methods. To use these methods, I will link the `ws2_32` (named: `Winsock` library) to the executable in `CMakeLists.txt`.

I add a namespace to group the methods in the new file I've just created. When I want to implement the Unix methods, I should copy this file, rename it to something like `net_unix.h`, and modify it.

One thing about the Winsock library is that it needs initialization  (`WSAStartup`) at the program's start. It initializes the library DLL and ensures that the Winsock API is supported by the platform and cleanup (`WSACleanup`) at the end of the code. Also, we can get the occurred error codes with the method `WSAGetLastError`. We can use the error code to get a description from another windows API method if it's necessary.

The API methods take a socket descriptor and operate the needed action on it, like setting a flag, sending data, receiving data, etc.

For creating a socket, we should declare an `addrinfo` object and give it some information about the socket type and the address type we plan to use. Socket types are noted in the first part of this article. It can be `TCP` or `UDP`. The address type can be `IPv4`, `IPv6`, or the unspecified value to tell the API it can be either.

So, after all of these, we need the following methods:
* `initialize`: Initialize the Winsock API.
``` cpp
  int initialize() {
    WSADATA wsaData;
    int iResult = WSAStartup(MAKEWORD(2,2), &wsaData);
    if (iResult == 0) {
      paad::gNetInitialized = true;
    }
    return iResult;
  }
```

* `cleanup`: Cleanup and uninitialize Winsock API.
``` cpp
  int cleanup() {
    WSACleanup();
    return 0;
  }
```

* `connect`: Connect to the endpoint.
``` cpp
  int connect(SOCKET& sock, const char* address, const char* port) {
    struct addrinfo *result = nullptr, *ptr = nullptr;
    result = addressinfo(address, port);
    if ( result == nullptr ) {
      return -1;
    }

    // Attempt to connect to an address until one succeeds
    for(ptr=result; ptr != nullptr ;ptr=ptr->ai_next) {

      // Create a SOCKET for connecting to server
      sock = socket(ptr->ai_family, ptr->ai_socktype,
                             ptr->ai_protocol);
      if (sock == INVALID_SOCKET) {
        return -1;
      }

      // Connect to server.
      int iResult = connect( sock, ptr->ai_addr, (int)ptr->ai_addrlen);
      if (iResult == SOCKET_ERROR) {
        closesocket(sock);
        WSACleanup();
        sock = INVALID_SOCKET;
        continue;
      }
      break;
    }

    freeaddrinfo(result);

    if (sock == INVALID_SOCKET) {
      return -1;
    }
    return 0;
  }
```

* `snd`: Send data to the endpoint.
``` cpp
    int snd(SOCKET sock, const char* buffer) {
    int iResult = send( sock, buffer, (int)strlen(buffer), 0 );
    if (iResult == SOCKET_ERROR) {
      closesocket(sock);
      WSACleanup();
      return -1;
    }
    return iResult;
  }
```

* `rcv`: Receive data from the endpoint.
``` cpp
  int rcv(SOCKET sock, char* buffer, int len) {
    int iResult = 0;
    do {
      iResult = recv(sock, buffer, len, 0);
      if ( iResult < 0 ) {
        if (WSAGetLastError() == WSAETIMEDOUT)
          return ETIMEDOUT;
        closesocket(sock);
        WSACleanup();
        return -1; // error occured, check WSAGetLastError()
      } else if ( iResult == 0 )
        return 0; //Connection closed

    } while( 0 );
    return iResult;
  }
```

* `shutdown`: Used to terminate a side from sending data. We can use this to tell the server we have done sending data and will never send any additional information, so the server can clean up some resources. In this example, we can still receive data from the server.
``` cpp
  int shutdown(SOCKET sock, char c) {
    int iResult = ::shutdown(sock, c);
    if (iResult == SOCKET_ERROR) {
      closesocket(sock);
      WSACleanup();
      return -1;
    }
    return iResult;
  }
```

* `close`: Close a socket at the end of communication.
``` cpp
  int close(SOCKET sock) {
    int iResult = closesocket(sock);
    return iResult;
  }
```

* `listen`: Listen on a port to accept new clients.
``` cpp
    int listen(SOCKET& sock, const char* address, const char* port) {
    struct addrinfo *result = nullptr, *ptr = nullptr;
    result = addressinfo(address, port);
    if ( result == nullptr ) {
      return -1;
    }

    sock = socket(result->ai_family, result->ai_socktype, result->ai_protocol);
    if (sock == INVALID_SOCKET) {
      freeaddrinfo(result);
      WSACleanup();
      return -1;
    }

    // Setup the TCP listening socket
    int iResult = bind( sock, result->ai_addr, (int)result->ai_addrlen);
    if (iResult == SOCKET_ERROR) {
      freeaddrinfo(result);
      closesocket(sock);
      WSACleanup();
      return 1;
    }

    freeaddrinfo(result);

    iResult = ::listen(sock, SOMAXCONN);
    if (iResult == SOCKET_ERROR) {
      closesocket(sock);
      WSACleanup();
      return 1;
    }

    return 0;
  }
```

* `accept`: Accept new clients that want to connect to the server. This will perform on a listening socket and return a new socket connected to the client.
``` cpp
  SOCKET accept(SOCKET sock) {
    // Accept a client socket
    SOCKET cliSocket = ::accept(sock, nullptr, nullptr);
    if (cliSocket == INVALID_SOCKET) {
      std::cout << "accept error: " << WSAGetLastError() << std::endl;
      closesocket(sock);
      WSACleanup();
      return INVALID_SOCKET;
    }
    return cliSocket;
  }
```

* `setsockopt`: Set some options for the socket, like timeouts, blocking mode, etc.
``` cpp
  int setsockopt(SOCKET sock, int opt, const void* val, int size) {
    const char* s = (const char *)val;
    return ::setsockopt(sock, SOL_SOCKET, opt, s, size);
  }
```

One other method to prevent code duplication is:
* `addressinfo`: This method takes the endpoint address and returns the resolved address to use in `connect` or `listen`.
``` cpp
  struct addrinfo* addressinfo(const char* address, const char* port) {
    struct addrinfo *result = nullptr, *ptr = nullptr, hints{};

    ZeroMemory( &hints, sizeof(hints) );
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_protocol = IPPROTO_TCP;

    // Resolve the server address and port
    int iResult = getaddrinfo(address, port, &hints, &result);
    if ( iResult != 0 ) {
      return nullptr;
    }

    return result;
  }
```

So far, we have implemented `TCP`, `blocking` methods only, and results for the `non-blocking` sockets will be different.

<!-- more -->
