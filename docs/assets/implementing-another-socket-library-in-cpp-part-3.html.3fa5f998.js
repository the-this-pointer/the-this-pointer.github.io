import{_ as n,o as s,c as a,b as e}from"./app.d3725a3c.js";const t={},o=e(`<p>So far, we have talked about socket differences and a simple implementation of bottom-layer socket methods, the TCP, non-blocking ones. This part will add support for Unix methods and enhancements for previous code.</p><details class="custom-container details"><p>This is a part of implementing a socket network library series. The list will be updated as soon as new articles are added.</p><p><a href="implementing-another-socket-library-in-cpp-part-1.html" target="_blank">Implementing another socket library in C++ - Part 1</a>.</p><p><a href="implementing-another-socket-library-in-cpp-part-2.html" target="_blank">Implementing another socket library in C++ - Part 2</a>.</p><blockquote><p><em>Implementing another socket library in C++ - Part 3</em></p></blockquote></details><blockquote><p>Please be aware that, at this time, I only work on Windows, and that&#39;s not possible for me to test the Unix code. So, maybe the code has typos or doesn&#39;t work on Unix.</p></blockquote><h2 id="source-code-enhancements" tabindex="-1"><a class="header-anchor" href="#source-code-enhancements" aria-hidden="true">#</a> Source Code Enhancements</h2><p>The first enhancement I plan to do is for the initialize and cleanup functions used for Windows only. We don&#39;t need these on Unix, So we add we check the platform using macros to enable the methods for Windows.</p><p>The last change for this section is like this:</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">if</span> <span class="token expression"><span class="token function">defined</span><span class="token punctuation">(</span>WIN32<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">defined</span><span class="token punctuation">(</span>WIN64<span class="token punctuation">)</span></span></span>
    <span class="token comment">// Windows specific methods</span>
    <span class="token keyword">bool</span> gNetInitialized <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">int</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">else</span></span>
    <span class="token comment">// Unix specific methods</span>
    <span class="token keyword">int</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">int</span> <span class="token function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, we just add another variable to count the number of sockets to initialize and clean up on Windows. When the first socket is created, the <code>WSAStartup</code> will be called, and when the last socket is destroyed, the <code>WSACleanup</code> will be called again. After adding this, there is no need for <code>gNetInitialized</code> variable, so I remove this variable.</p><p>The second enhancement is adding socket block mode support to the source code. First, I added a method to enable the user to change socket blocking mode; this part is different for Windows and Unix, so we added these methods to the blocks we added before near the <code>initialize</code> and <code>cleanup</code> functions. For Windows it&#39;s like this:</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>    <span class="token comment">// Windows code</span>
    <span class="token keyword">int</span> <span class="token function">setBlocking</span><span class="token punctuation">(</span>SOCKET socket<span class="token punctuation">,</span> <span class="token keyword">bool</span> isBlocking<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">int</span> nCurFlag <span class="token operator">=</span> isBlocking<span class="token operator">?</span> <span class="token number">0</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token function">ioctlsocket</span><span class="token punctuation">(</span>socket<span class="token punctuation">,</span> FIONBIO<span class="token punctuation">,</span> <span class="token punctuation">(</span>ULONG <span class="token operator">*</span><span class="token punctuation">)</span><span class="token operator">&amp;</span>nCurFlag<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For Unix, the method name is different. We should get the socket flags and change the blocking mode on it.</p><div class="language-cpp ext-cpp line-numbers-mode"><pre class="language-cpp"><code>    <span class="token comment">// Unix code</span>
    <span class="token keyword">int</span> <span class="token function">setBlocking</span><span class="token punctuation">(</span>SOCKET socket<span class="token punctuation">,</span> <span class="token keyword">bool</span> isBlocking<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">int</span> nCurFlag<span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>nCurFlag <span class="token operator">=</span> <span class="token function">fcntl</span><span class="token punctuation">(</span>m_socket<span class="token punctuation">,</span> F_GETFL<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
          <span class="token keyword">return</span> nCurFlag<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>isBlocking<span class="token punctuation">)</span>
        nCurFlag <span class="token operator">&amp;=</span> <span class="token punctuation">(</span><span class="token operator">~</span>O_NONBLOCK<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">else</span>
        nCurFlag <span class="token operator">|=</span> O_NONBLOCK<span class="token punctuation">;</span>

      <span class="token keyword">return</span> <span class="token function">fcntl</span><span class="token punctuation">(</span>m_socket<span class="token punctuation">,</span> F_SETFL<span class="token punctuation">,</span> nCurFlag<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The following enhancement is to add the methods for getting error codes and descriptions for the two platforms. In Windows, the error returned from <code>WSAGetLastError</code>, but on Unix, it&#39;s in <code>errno</code>, and because of differences in error codes in the two platforms, I declared an <code>enum</code> to translate the codes to it.</p><p>After that, I changed the code I shared in <code>Part 2</code>. When the error occurred, I cleaned up the windows socket, but now I should refactor that. For non-blocking sockets, <code>recv</code>, <code>send</code>, and the other methods may return an error named <code>EWOULDBLOCK</code> or <code>EAGAIN</code>, which is not an error in fact; it just tells us there is no data in the buffer to <code>recv</code> or <code>send</code>.</p><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>You can watch what I&#39;ve done in this <a href="https://github.com/the-this-pointer/network-library" target="_blank">Github repo</a>.</p></div>`,15),p=[o];function c(i,l){return s(),a("div",null,p)}var d=n(t,[["render",c],["__file","implementing-another-socket-library-in-cpp-part-3.html.vue"]]);export{d as default};
