---
title: Implementing go style "struct tags" in C++ - Part 2
author: Rsomething
date: '2022-08-26'
categories:
  - C++
tags:
  - programming
---
In the previous part, we discussed the usage of `struct tags` in Golang and planned the Dos and Don'ts of the library. Now, we want to implement the library and discuss the challenges that could happen.

<!-- more -->

::: details
This is the first article of the series. The list will be updated as soon as new articles are added.

<a href="implementing-go-style-struct-tags-part-1.html" target="_blank">Implementing go style "struct tags" in C++ - Part 1</a>.

> *Implementing go style struct tags in C++ - Part 2*
:::

## Challenges

The first challenge in front of us is that the metadata we assign to the member variable is not static! We set the metadata, and the compiler receives it, but after this, we need to parse it and extract some information from it for the field. If we want to make this a true static variable, I should do what the `Qt Framework` did before! I should create a build step before the compiler compiles the code and generate classes like `xMetaData` and a bunch of `moc_` files to store the newly generated classes.

For the second challenge, we need to know what members exist in a class. In C/C++, there is no simple way to do that (excluding `Macro`); So, I start with assigning the parent to the member to register itself by hand. For now, there is no option to make this better!

Again, thanks to C++ templates, I keep an eye on the member value type and use this for the member function `setValue`, which has a `std::any` parameter. This way, I can check the value of `std::any` using a map.

## Example

For now, I used the `rapidjson` for testing my library, and the class we should declare is like this:

```cpp
class MetaStruct2: public MetaStruct {
public:
  MetaField<MetaStruct1, decltype("json:meta_struct3"_meta)> _ms3 {this};
  MetaField<std::vector<int32_t>, decltype("json:field_name5"_meta)> _vint {this};
  MetaField<std::map<std::string, int32_t>, decltype("json:field_name6"_meta)> _vmap {this};
  MetaField<double, decltype("json:dbl"_meta)> _dbl {this};
  MetaField<std::vector<std::string>, decltype("json:vstr"_meta)> _vstr{this};
};
```

Ok, I'm not happy with this. In the future, maybe I will use macros to make this better. One more thing I implemented the `registerTypeSerializer` function for the `JSONWriter` to register user-defined type for JSON serializing. I can use the library this way:

```cpp
int main()
{
  MetaStruct2 ms2;

  ms2._ms3.val()._bol3 = true;
  ms2._ms3.val()._int = 10;
  ms2._ms3.val()._int2 = 20;
  ms2._ms3.val()._str4 = "salam";
  ms2._vint.val() = {10, 20, 30, 55, };
  ms2._vmap.val() = { {"1", 2}, {"another", 5}, };
  ms2._dbl.val() = 2.4;
  ms2._vstr.val() = {"1", "22", "333",};

  auto* writer2 = new Json::JsonWriter;
  // Meta Writer Custom Type Registration
  writer2->registerTypeSerializer<MetaStruct1>([writer2](auto x) {
    auto* ms = static_cast<AbstractMetaStruct*>(&x);
    writer2->processType(ms);
  });

  auto* _ms2 = static_cast<AbstractMetaStruct*>(&ms2);
  std::any _b = std::make_any<AbstractMetaStruct*>(_ms2);
  std::string json = writer2->write(_b);
  cout << json << endl << endl;
}
```

###### Output:

```
{"meta_struct3":{"field_name":10,"field_name2":20,"field_name3":true,"field_name4":"salam"},"field_name5":[10,20,30,55],"field_name6":{"1":2,"another":5},"dbl":2.4,"vstr":["1","22","333"]}
```

::: tip
You can watch what I've done in this 
<a href="https://github.com/the-this-pointer/struct-meta" target="_blank">Github repo</a>.
:::

<!-- more -->
