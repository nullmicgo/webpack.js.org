webpackJsonp([125],{366:function(n,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default='<p>The <code>plugins</code> option is used to customize the webpack build process in a variety of ways. webpack comes with a variety built-in plugins available under <code>webpack.[plugin-name]</code>. See <a href="/plugins">Plugins page</a> for a list of plugins and documentation but note that there are a lot more out in the community.</p>\n<blockquote class="tip">\n<p>Note: This page only discusses using plugins, however if you are interested in writing your own please visit <a href="/contribute/writing-a-plugin/">Writing a Plugin</a>.</p>\n</blockquote>\n<h2 id="plugins"><code>plugins</code><a href="#plugins" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p><a href="/plugins/"><code>[Plugin]</code></a></p>\n<p>An array of webpack plugins. For example, <a href="/plugins/define-plugin/"><code>DefinePlugin</code></a> allows you to create global constants which can be configured at compile time. This can be useful for allowing different behavior between development builds and release builds.</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token comment">// Definitions...</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n<p>A more complex example, using multiple plugins, might look something like this:</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">var</span> webpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// importing plugins that do not come by default in webpack</span>\n<span class="token keyword">var</span> ExtractTextPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'extract-text-webpack-plugin\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> DashboardPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack-dashboard/plugin\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">// adding plugins to your configuration</span>\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token comment">//...</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">new</span> <span class="token class-name">ExtractTextPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      filename<span class="token punctuation">:</span> <span class="token string">\'build.min.css\'</span><span class="token punctuation">,</span>\n      allChunks<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>IgnorePlugin</span><span class="token punctuation">(</span><span class="token regex">/^\\.\\/locale$/</span><span class="token punctuation">,</span> <span class="token regex">/moment$/</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token comment">// compile time plugins</span>\n    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>DefinePlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token string">\'process.env.NODE_ENV\'</span><span class="token punctuation">:</span> <span class="token string">\'"production"\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token comment">// webpack-dev-server enhancement plugins</span>\n    <span class="token keyword">new</span> <span class="token class-name">DashboardPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token keyword">new</span> <span class="token class-name">webpack<span class="token punctuation">.</span>HotModuleReplacementPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n'}});