import{_ as n,o as s,c as a,b as t}from"./app.d3725a3c.js";const e={},p=t(`<p>In the previous part, we discussed the usage of <code>struct tags</code> in Golang and planned the Dos and Don&#39;ts of the library. Now, we want to implement the library and discuss the challenges that could happen.</p><details class="custom-container details"><p>This is the first article of the series. The list will be updated as soon as new articles are added.</p><p><a href="implementing-go-style-struct-tags-part-1.html" target="_blank">Implementing go style &quot;struct tags&quot; in C++ - Part 1</a>.</p><blockquote><p><em>Implementing go style struct tags in C++ - Part 2</em></p></blockquote></details><h2 id="challenges" tabindex="-1"><a class="header-anchor" href="#challenges" aria-hidden="true">#</a> Challenges</h2><p>The first challenge in front of us is that the metadata we assign to the member variable is not static! We set the metadata, and the compiler receives it, but after this, we need to parse it and extract some information from it for the field. If we want to make this a true static variable, I should do what the <code>Qt Framework</code> did before! I should create a build step before the compiler compiles the code and generate classes like <code>xMetaData</code> and a bunch of <code>moc_</code> files to store the newly generated classes.</p><p>For the second challenge, we need to know what members exist in a class. In C/C++, there is no simple way to do that (excluding <code>Macro</code>); So, I start with assigning the parent to the member to register itself by hand. For now, there is no option to make this better!</p><p>Again, thanks to C++ templates, I keep an eye on the member value type and use this for the member function <code>setValue</code>, which has a <code>std::any</code> parameter. This way, I can check the value of <code>std::any</code> using a map.</p><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><p>For now, I used the <code>rapidjson</code> for testing my library, and the class we should declare is like this:</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">MetaStruct2</span><span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">MetaStruct</span></span> <span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
  MetaField<span class="token operator">&lt;</span>MetaStruct1<span class="token punctuation">,</span> <span class="token keyword">decltype</span><span class="token punctuation">(</span><span class="token string">&quot;json:meta_struct3&quot;</span>_meta<span class="token punctuation">)</span><span class="token operator">&gt;</span> _ms3 <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  MetaField<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span><span class="token keyword">int32_t</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token keyword">decltype</span><span class="token punctuation">(</span><span class="token string">&quot;json:field_name5&quot;</span>_meta<span class="token punctuation">)</span><span class="token operator">&gt;</span> _vint <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  MetaField<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>map<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>string<span class="token punctuation">,</span> <span class="token keyword">int32_t</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token keyword">decltype</span><span class="token punctuation">(</span><span class="token string">&quot;json:field_name6&quot;</span>_meta<span class="token punctuation">)</span><span class="token operator">&gt;</span> _vmap <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  MetaField<span class="token operator">&lt;</span><span class="token keyword">double</span><span class="token punctuation">,</span> <span class="token keyword">decltype</span><span class="token punctuation">(</span><span class="token string">&quot;json:dbl&quot;</span>_meta<span class="token punctuation">)</span><span class="token operator">&gt;</span> _dbl <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  MetaField<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>vector<span class="token operator">&lt;</span>std<span class="token double-colon punctuation">::</span>string<span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token keyword">decltype</span><span class="token punctuation">(</span><span class="token string">&quot;json:vstr&quot;</span>_meta<span class="token punctuation">)</span><span class="token operator">&gt;</span> _vstr<span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Ok, I&#39;m not happy with this. In the future, maybe I will use macros to make this better. One more thing I implemented the <code>registerTypeSerializer</code> function for the <code>JSONWriter</code> to register user-defined type for JSON serializing. I can use the library this way:</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code><span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
  MetaStruct2 ms2<span class="token punctuation">;</span>

  ms2<span class="token punctuation">.</span>_ms3<span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>_bol3 <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
  ms2<span class="token punctuation">.</span>_ms3<span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>_int <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
  ms2<span class="token punctuation">.</span>_ms3<span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>_int2 <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
  ms2<span class="token punctuation">.</span>_ms3<span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>_str4 <span class="token operator">=</span> <span class="token string">&quot;salam&quot;</span><span class="token punctuation">;</span>
  ms2<span class="token punctuation">.</span>_vint<span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token number">55</span><span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  ms2<span class="token punctuation">.</span>_vmap<span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">{</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string">&quot;another&quot;</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
  ms2<span class="token punctuation">.</span>_dbl<span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">2.4</span><span class="token punctuation">;</span>
  ms2<span class="token punctuation">.</span>_vstr<span class="token punctuation">.</span><span class="token function">val</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;22&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;333&quot;</span><span class="token punctuation">,</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">auto</span><span class="token operator">*</span> writer2 <span class="token operator">=</span> <span class="token keyword">new</span> Json<span class="token double-colon punctuation">::</span>JsonWriter<span class="token punctuation">;</span>
  <span class="token comment">// Meta Writer Custom Type Registration</span>
  writer2<span class="token operator">-&gt;</span><span class="token generic-function"><span class="token function">registerTypeSerializer</span><span class="token generic class-name"><span class="token operator">&lt;</span>MetaStruct1<span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">[</span>writer2<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">auto</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">auto</span><span class="token operator">*</span> ms <span class="token operator">=</span> <span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span>AbstractMetaStruct<span class="token operator">*</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token operator">&amp;</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    writer2<span class="token operator">-&gt;</span><span class="token function">processType</span><span class="token punctuation">(</span>ms<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">auto</span><span class="token operator">*</span> _ms2 <span class="token operator">=</span> <span class="token generic-function"><span class="token function">static_cast</span><span class="token generic class-name"><span class="token operator">&lt;</span>AbstractMetaStruct<span class="token operator">*</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token operator">&amp;</span>ms2<span class="token punctuation">)</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span>any _b <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token generic-function"><span class="token function">make_any</span><span class="token generic class-name"><span class="token operator">&lt;</span>AbstractMetaStruct<span class="token operator">*</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>_ms2<span class="token punctuation">)</span><span class="token punctuation">;</span>
  std<span class="token double-colon punctuation">::</span>string json <span class="token operator">=</span> writer2<span class="token operator">-&gt;</span><span class="token function">write</span><span class="token punctuation">(</span>_b<span class="token punctuation">)</span><span class="token punctuation">;</span>
  cout <span class="token operator">&lt;&lt;</span> json <span class="token operator">&lt;&lt;</span> endl <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h6 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> Output:</h6><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{&quot;meta_struct3&quot;:{&quot;field_name&quot;:10,&quot;field_name2&quot;:20,&quot;field_name3&quot;:true,&quot;field_name4&quot;:&quot;salam&quot;},&quot;field_name5&quot;:[10,20,30,55],&quot;field_name6&quot;:{&quot;1&quot;:2,&quot;another&quot;:5},&quot;dbl&quot;:2.4,&quot;vstr&quot;:[&quot;1&quot;,&quot;22&quot;,&quot;333&quot;]}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>You can watch what I&#39;ve done in this <a href="https://github.com/the-this-pointer/struct-meta" target="_blank">Github repo</a>.</p></div>`,14),o=[p];function c(l,u){return s(),a("div",null,o)}var r=n(e,[["render",c],["__file","implementing-go-style-struct-tags-part-2.html.vue"]]);export{r as default};
