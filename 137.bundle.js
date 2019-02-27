webpackJsonp([137],{353:function(n,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default='<p>webpack accepts configuration files written in multiple programming and data languages. The list of supported file extensions can be found at the <a href="https://github.com/gulpjs/interpret">node-interpret</a> package. Using <a href="https://github.com/gulpjs/interpret">node-interpret</a>, webpack can handle many different types of configuration files.</p>\n<h2 id="typescript">TypeScript<a href="#typescript" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>To write the webpack configuration in <a href="http://www.typescriptlang.org/">TypeScript</a>, you would first install the necessary dependencies, i.e., TypeScript and the relevant type definitions from the <a href="https://definitelytyped.org/">DefinitelyTyped</a> project:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev typescript ts-node @types/node @types/webpack\n<span class="token comment"># and, if using webpack-dev-server</span>\n<span class="token function">npm</span> <span class="token function">install</span> --save-dev @types/webpack-dev-server</code></pre>\n<p>and then proceed to write your configuration:</p>\n<p><strong>webpack.config.ts</strong></p>\n<pre><code class="hljs language-typescript"><span class="token keyword">import</span> path <span class="token keyword">from</span> <span class="token string">\'path\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> webpack <span class="token keyword">from</span> <span class="token string">\'webpack\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> config<span class="token punctuation">:</span> webpack<span class="token punctuation">.</span>Configuration <span class="token operator">=</span> <span class="token punctuation">{</span>\n  mode<span class="token punctuation">:</span> <span class="token string">\'production\'</span><span class="token punctuation">,</span>\n  entry<span class="token punctuation">:</span> <span class="token string">\'./foo.js\'</span><span class="token punctuation">,</span>\n  output<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    path<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'dist\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    filename<span class="token punctuation">:</span> <span class="token string">\'foo.bundle.js\'</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> config<span class="token punctuation">;</span></code></pre>\n<p>Above sample assumes version >= 2.7 or newer of TypeScript is used with the new <code>esModuleInterop</code> and <code>allowSyntheticDefaultImports</code> compiler options in your <code>tsconfig.json</code> file.</p>\n<p>Note that you\'ll also need to check your <code>tsconfig.json</code> file. If the module in <code>compilerOptions</code> in <code>tsconfig.json</code> is <code>commonjs</code>, the setting is complete, else webpack will fail with an error. This occurs because <code>ts-node</code> does not support any module syntax other than <code>commonjs</code>.</p>\n<p>There are two solutions to this issue:</p>\n<ul>\n<li>Modify <code>tsconfig.json</code>.</li>\n<li>Install <code>tsconfig-paths</code>.</li>\n</ul>\n<p>The <strong>first option</strong> is to open your <code>tsconfig.json</code> file and look for <code>compilerOptions</code>. Set <code>target</code> to <code>"ES5"</code> and <code>module</code> to <code>"CommonJS"</code> (or completely remove the <code>module</code> option).</p>\n<p>The <strong>second option</strong> is to install the <code>tsconfig-paths</code> package:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev tsconfig-paths</code></pre>\n<p>And create a separate TypeScript configuration specifically for your webpack configs:</p>\n<p><strong>tsconfig-for-webpack-config.json</strong></p>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"compilerOptions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"commonjs"</span><span class="token punctuation">,</span>\n    <span class="token property">"target"</span><span class="token operator">:</span> <span class="token string">"es5"</span><span class="token punctuation">,</span>\n    <span class="token property">"esModuleInterop"</span><span class="token operator">:</span> <span class="token boolean">true</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n<blockquote class="tip">\n<p><code>ts-node</code> can resolve a <code>tsconfig.json</code> file using the environment variable provided by <code>tsconfig-path</code>.</p>\n</blockquote>\n<p>Then set the environment variable <code>process.env.TS_NODE_PROJECT</code> provided by <code>tsconfig-path</code> like so:</p>\n<p><strong>package.json</strong></p>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"cross-env TS_NODE_PROJECT=\\"tsconfig-for-webpack-config.json\\" webpack"</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n<blockquote class="warning">\n<p>We had been getting reports that <code>TS_NODE_PROJECT</code> might not work with <code>"TS_NODE_PROJECT" unrecognized command</code> error. Therefore running it with <code>cross-env</code> seems to fix the issue, for more info <a href="https://github.com/webpack/webpack.js.org/issues/2733">see this issue</a>.</p>\n</blockquote>\n<h2 id="coffeescript">CoffeeScript<a href="#coffeescript" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Similarly, to use <a href="https://coffeescript.org/">CoffeeScript</a>, you would first install the necessary dependencies:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev coffee-script</code></pre>\n<p>and then proceed to write your configuration:</p>\n<p><strong>webpack.config.coffee</strong></p>\n\x3c!-- eslint-skip --\x3e\n<pre><code class="hljs language-js">HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'html-webpack-plugin\'</span><span class="token punctuation">)</span>\nwebpack <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'webpack\'</span><span class="token punctuation">)</span>\npath <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'path\'</span><span class="token punctuation">)</span>\n\nconfig <span class="token operator">=</span>\n  mode<span class="token punctuation">:</span> <span class="token string">\'production\'</span>\n  entry<span class="token punctuation">:</span> <span class="token string">\'./path/to/my/entry/file.js\'</span>\n  output<span class="token punctuation">:</span>\n    path<span class="token punctuation">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">\'dist\'</span><span class="token punctuation">)</span>\n    filename<span class="token punctuation">:</span> <span class="token string">\'my-first-webpack.bundle.js\'</span>\n  module<span class="token punctuation">:</span> rules<span class="token punctuation">:</span> <span class="token punctuation">[</span> <span class="token punctuation">{</span>\n    test<span class="token punctuation">:</span> <span class="token regex">/\\.(js|jsx)$/</span>\n    use<span class="token punctuation">:</span> <span class="token string">\'babel-loader\'</span>\n  <span class="token punctuation">}</span> <span class="token punctuation">]</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span>template<span class="token punctuation">:</span> <span class="token string">\'./src/index.html\'</span><span class="token punctuation">)</span>\n  <span class="token punctuation">]</span>\n\nmodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> config</code></pre>\n<h2 id="babel-and-jsx">Babel and JSX<a href="#babel-and-jsx" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>In the example below JSX (React JavaScript Markup) and Babel are used to create a JSON Configuration that webpack can understand.</p>\n<blockquote>\n<p>Courtesy of <a href="https://twitter.com/_developit/status/769583291666169862">Jason Miller</a></p>\n</blockquote>\n<p>First install the necessary dependencies:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev babel-register jsxobj babel-preset-es2015</code></pre>\n<p><strong>.babelrc</strong></p>\n<pre><code class="hljs language-json"><span class="token punctuation">{</span>\n  <span class="token property">"presets"</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">"es2015"</span> <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n<p><strong>webpack.config.babel.js</strong></p>\n<pre><code class="hljs language-js"><span class="token keyword">import</span> jsxobj <span class="token keyword">from</span> <span class="token string">\'jsxobj\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// example of an imported plugin</span>\n<span class="token keyword">const</span> <span class="token function-variable function">CustomPlugin</span> <span class="token operator">=</span> config <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n  <span class="token operator">...</span>config<span class="token punctuation">,</span>\n  name<span class="token punctuation">:</span> <span class="token string">\'custom-plugin\'</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span>\n  <span class="token operator">&#x3C;</span>webpack target<span class="token operator">=</span><span class="token string">"web"</span> watch mode<span class="token operator">=</span><span class="token string">"production"</span><span class="token operator">></span>\n    <span class="token operator">&#x3C;</span>entry path<span class="token operator">=</span><span class="token string">"src/index.js"</span> <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token operator">&#x3C;</span>resolve<span class="token operator">></span>\n      <span class="token operator">&#x3C;</span>alias <span class="token punctuation">{</span><span class="token operator">...</span><span class="token punctuation">{</span>\n        react<span class="token punctuation">:</span> <span class="token string">\'preact-compat\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'react-dom\'</span><span class="token punctuation">:</span> <span class="token string">\'preact-compat\'</span>\n      <span class="token punctuation">}</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token operator">&#x3C;</span><span class="token operator">/</span>resolve<span class="token operator">></span>\n    <span class="token operator">&#x3C;</span>plugins<span class="token operator">></span>\n      <span class="token operator">&#x3C;</span>CustomPlugin foo<span class="token operator">=</span><span class="token string">"bar"</span> <span class="token operator">/</span><span class="token operator">></span>\n    <span class="token operator">&#x3C;</span><span class="token operator">/</span>plugins<span class="token operator">></span>\n  <span class="token operator">&#x3C;</span><span class="token operator">/</span>webpack<span class="token operator">></span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n<blockquote class="warning">\n<p>If you are using Babel elsewhere and have <code>modules</code> set to <code>false</code>, you will have to either maintain two separate <code>.babelrc</code> files or use <code>const jsxobj = require(\'jsxobj\');</code> and <code>module.exports</code> instead of the new <code>import</code> and <code>export</code> syntax. This is because while Node does support many new ES6 features, they don\'t yet support ES6 module syntax.</p>\n</blockquote>\n'}});