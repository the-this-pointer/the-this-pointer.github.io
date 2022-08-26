---
title: Using "setjmp" and "longjmp" in C - Part 1
author: Rsomething
date: '2022-08-15'
categories:
  - C
  - C++
tags:
  - programming
---

Two less known C programming language methods are `setjmp` and `longjmp`. They are defined in `setjmp.h` header file or `csetjmp` in C++ standard library.

<!-- more -->

::: details
This is the first article about the `setjmp` method usage series. The list will be updated as soon as new articles are added.

> *Using "setjmp" and "longjmp" in C - Part 1*
:::

## Usage

setjmp is used to save the current execution context into a `jmp_buf`, and longjmp uses this buffer to restore the saved application state.
Think about what you can do with these methods! You can use it for exception handling in C, which hasn't `try`/`catch` blocks or developing a coroutine library.

## Example 1: Exception Handling
``` c
#include <stdio.h>
#include <math.h>
#include <setjmp.h>

jmp_buf buff;

#define EXC_INVALID_PARAM   -1

double my_sqrt(double num) {
    if (num < 0)
        longjmp(buff, EXC_INVALID_PARAM);  // restoring saved execution context
    return sqrt(num);
}

int main() {
    
    double params[3] = {9, 4, -1};
    int i = 0;
    
    for (i = 0; i < 3; i++) {
        
        int result = setjmp(buff);  // saving execution context
        if (result == 0) {
            double root = my_sqrt(params[i]);
            printf("Square root of %2.0f is: %2.0f\n", params[i], root);
        } else if (result == EXC_INVALID_PARAM) {
            printf("Invalid param error occured!, param: %2.0f!\n", params[i]);
        }

    }

    return 0;
}
```
###### Output:
```
Square root of  9 is:  3
Square root of  4 is:  2
Invalid param error occured!, param: -1!
```
<!-- more -->
