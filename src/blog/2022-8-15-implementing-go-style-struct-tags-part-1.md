---
title: Implementing go style "struct tags" in C++ - Part 1
author: Reza
date: '2022-08-15'
categories:
  - C++
  - Golang
tags:
  - programming
---

If you worked with the Golang programming language before, you have faced the user-created custom types named `struct`; if you don't know what's that, you can read more about it <a href="https://gobyexample.com/structs" target="_blank">here</a>.

<!-- more -->

::: details
This is the first article of the series. The list will be updated as soon as new articles are added.

> *Implementing go style struct tags in C++ - Part 1*
:::

## What Do We Want To Do?!

There is nothing special about the `struct` itself. It's the reason I attached a reference link for people who want to learn more about it, and I didn't mention all of its details here. For the sake of briefness, I point to the main part we are going to do: **"struct tags"**.

Let's look at to the sample `struct` below:
``` go
type person struct {
    name string
    age  int
}
```
The code is taken from the above link. It's a struct that holds information about a person! If I want to get a JSON string, I should add some details about the field name in JSON, or If I save it to a database, I should provide information about the column and datatype.
The point is it's straightforward to do that in Golang, and I like that in C++ too!

The edited code for providing JSON details will be like this:
``` go
type person struct {
    name string `json:"name"`   // or "person_name", who cares!
    age  int    `json:"age"`
}
```

## Perspective
I would create a class that can hold some static metadata for the members, and I want to use the metadata to generate a JSON string from that class. Of course, the easy way is using the macros for creating members and saving the data in a variable, but I don't like it; In other words, even if it is effortless to implement, I hate using macros for this purpose. I want to challenge myself with something new. 

I plan to work with `std::any` for values and use C++ templates (and specifically `std::integer_sequence`) to save metadata for each member at compile time. There are some cons about using templates here; if I have two classes with the same members but different metadata, the compiler will create two different classes in compile time, which doesn't make sense for the programmer!

## Implementation

Ok, enough talking! Let me show you what happens with a little example:

``` cpp
#include <iostream>
#include <any>

template <char... chars>
using meta_string = std::integer_sequence<char, chars...>;

template <typename T, T... chars>
constexpr meta_string<chars...> operator""_meta() { return { }; }

template <typename>
class MetaField;

template <char... elements>
class MetaField<meta_string<elements...>> {
public:
    const char* getMetaString() const {
        static constexpr char str[sizeof...(elements) + 1] = { elements..., '\0' };
        return str;
    }
};

int main() {
    MetaField<decltype("metadata_1"_meta)> v1;
    MetaField<decltype("metadata_2"_meta)> v2;

    std::cout << "v1 metadata: " << v1.getMetaString() << std::endl;
    std::cout << "v2 metadata: " << v2.getMetaString() << std::endl;

    return 0;
}
```

###### Output:
``` text
v1 metadata: metadata_1
v2 metadata: metadata_2
```

We implemented a class with some static text for metadata, and from the word "static", I mean some text linked to the class at compile time. But what happens when the compiler compiles this piece of code? Here is what the compiler generates for us:

``` cpp
#include <iostream>
#include <any>

template <char... chars>
using meta_string = std::integer_sequence<char, chars...>;

template<typename T, T ...chars>
inline constexpr meta_string<chars...> operator""_meta()
{
  return {};
}


template<typename type_parameter_0_0>
class MetaField;
/* First instantiated from: insights.cpp:23 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
class MetaField<std::integer_sequence<char, 'm', 'e', 't', 'a', 'd', 'a', 't', 'a', '_', '1'> >
{
  
  public: 
  inline const char * getMetaString() const
  {
    static constexpr const char str[11] = {'m', 'e', 't', 'a', 'd', 'a', 't', 'a', '_', '1', '\0'};
    return str;
  }
  
  // inline constexpr MetaField() noexcept = default;
};

#endif
/* First instantiated from: insights.cpp:24 */
#ifdef INSIGHTS_USE_TEMPLATE
template<>
class MetaField<std::integer_sequence<char, 'm', 'e', 't', 'a', 'd', 'a', 't', 'a', '_', '2'> >
{
  
  public: 
  inline const char * getMetaString() const
  {
    static constexpr const char str[11] = {'m', 'e', 't', 'a', 'd', 'a', 't', 'a', '_', '2', '\0'};
    return str;
  }
  
  // inline constexpr MetaField() noexcept = default;
};

#endif


template<char ...elements>
class MetaField<meta_string<elements...> >
{
  
  public: 
  inline const char * getMetaString() const
  {
    static constexpr const char str[sizeof...(elements) + 1] = {elements... , '\0'};
    return str;
  }
  
};



int main()
{
  MetaField<std::integer_sequence<char, 'm', 'e', 't', 'a', 'd', 'a', 't', 'a', '_', '1'> > v1 = MetaField<std::integer_sequence<char, 'm', 'e', 't', 'a', 'd', 'a', 't', 'a', '_', '1'> >();
  MetaField<std::integer_sequence<char, 'm', 'e', 't', 'a', 'd', 'a', 't', 'a', '_', '2'> > v2 = MetaField<std::integer_sequence<char, 'm', 'e', 't', 'a', 'd', 'a', 't', 'a', '_', '2'> >();
  std::operator<<(std::operator<<(std::cout, "v1 metadata: "), v1.getMetaString()).operator<<(std::endl);
  std::operator<<(std::operator<<(std::cout, "v2 metadata: "), v2.getMetaString()).operator<<(std::endl);
  return 0;
}
```

As you can see, the compiler generated a class for every class instance that has different metadata. One of the pros of this approach (using templates) is it will be fast at runtime, but on the other side, one of the cons is the code size will grow in the case of many template metadata.

I think it's enough for today, and I will be back to complete this series as soon as possible.


<!-- more -->
