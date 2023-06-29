---
title: User defined literals in C++
author: Rsomething
date: '2022-09-15'
categories:
  - C++
tags:
  - programming
---
A user-defined literal is a suffix for an expression to create a user-defined type.

<!-- more -->

## What is it?
A user-defined literal is a literal operator, and it can be defined just like some other function in C++ 11; it can be overloaded and can accept some types for parameter list (not all of them!), something like this:

 ``` cpp
#include <iostream>
#include <any>

unsigned int operator ""_km(long double distance)
{
    return distance * 1000;
}
 
void operator"" _cout (const char* str, std::size_t)
{
    std::cout << "string: " << std::string{str} << std::endl;
}

// overload sample
void operator"" _cout (long double distance)
{
    std::cout << "distance: " << distance << std::endl;
}

 int main()
 {
    //usage exmaple
    unsigned int distanceInKm = 12.0_km;

    operator ""_cout(distanceInKm);
    "hi!"_cout;
    return 0;
 }
 ```

::: tip
It's a good feature I planned to use in my simple logger library. You can see that in this
<a href="https://github.com/the-this-pointer/log-library" target="_blank">Github repo</a>.
:::

<!-- more -->
