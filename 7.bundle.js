webpackJsonp([7],{484:function(n,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default='<p>Automatically load modules instead of having to <code>import</code> or <code>require</code> them everywhere.</p>\n<pre><code class="hljs language-js"><span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProvidePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  identifier<span class="token punctuation">:</span> <span class="token string">\'module1\'</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>or</p>\n<pre><code class="hljs language-js"><span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProvidePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  identifier<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'module1\'</span><span class="token punctuation">,</span> <span class="token string">\'property1\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token comment">// ...</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>Whenever the <code>identifier</code> is encountered as free variable in a module, the <code>module</code> is loaded automatically and the <code>identifier</code> is filled with the exports of the loaded <code>module</code> (or <code>property</code> in order to support named exports).</p>\n<blockquote class="warning">\n<p>For importing the default export of an ES2015 module, you have to specify the default property of module.</p>\n</blockquote>\n<h2 id="usage-jquery">Usage: jQuery<a href="#usage-jquery" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>To automatically load <code>jquery</code> we can simply point both variables it exposes to the corresponding node module:</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProvidePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  $<span class="token punctuation">:</span> <span class="token string">\'jquery\'</span><span class="token punctuation">,</span>\n  jQuery<span class="token punctuation">:</span> <span class="token string">\'jquery\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<p>Then in any of our source code:</p>\n<pre><code class="hljs language-javascript"><span class="token comment">// in a module</span>\n<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">\'#item\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#x3C;= just works</span>\n<span class="token function">jQuery</span><span class="token punctuation">(</span><span class="token string">\'#item\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#x3C;= just works</span>\n<span class="token comment">// $ is automatically set to the exports of module "jquery"</span></code></pre>\n<h2 id="usage-jquery-with-angular-1">Usage: jQuery with Angular 1<a href="#usage-jquery-with-angular-1" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Angular looks for <code>window.jQuery</code> in order to determine whether jQuery is present, see the <a href="https://github.com/angular/angular.js/blob/v1.5.9/src/Angular.js#L1821-L1823">source code</a>.</p>\n<pre><code class="hljs language-javascript"><span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProvidePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token string">\'window.jQuery\'</span><span class="token punctuation">:</span> <span class="token string">\'jquery\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<h2 id="usage-lodash-map">Usage: Lodash Map<a href="#usage-lodash-map" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<pre><code class="hljs language-javascript"><span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProvidePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  _map<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'lodash\'</span><span class="token punctuation">,</span> <span class="token string">\'map\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<h3 id="usage-vuejs">Usage: Vue.js<a href="#usage-vuejs" aria-hidden="true"><span class="icon icon-link"></span></a></h3>\n<pre><code class="hljs language-javascript"><span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>ProvidePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  Vue<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'vue/dist/vue.esm.js\'</span><span class="token punctuation">,</span> <span class="token string">\'default\'</span><span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n'}});