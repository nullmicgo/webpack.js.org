webpackJsonp([112],{379:function(n,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default='<p>If you\'ve been following the guides from the start, you will now have a small project that shows "Hello webpack". Now let\'s try to incorporate some other assets, like images, to see how they can be handled.</p>\n<p>Prior to webpack, front-end developers would use tools like grunt and gulp to process these assets and move them from their <code>/src</code> folder into their <code>/dist</code> or <code>/build</code> directory. The same idea was used for JavaScript modules, but tools like webpack will <strong>dynamically bundle</strong> all dependencies (creating what\'s known as a <a href="/concepts/dependency-graph">dependency graph</a>). This is great because every module now <em>explicitly states its dependencies</em> and we\'ll avoid bundling modules that aren\'t in use.</p>\n<p>One of the coolest webpack features is that you can also <em>include any other type of file</em>, besides JavaScript, for which there is a loader. This means that the same benefits listed above for JavaScript (e.g. explicit dependencies) can be applied to everything used in building a website or web app. Let\'s start with CSS, as you may already be familiar with that setup.</p>\n<h2 id="setup">Setup<a href="#setup" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Let\'s make a minor change to our project before we get started:</p>\n<p><strong>dist/index.html</strong></p>\n<pre><code class="hljs language-diff">  &#x3C;!doctype html>\n  &#x3C;html>\n    &#x3C;head>\n<span class="token deleted">-    &#x3C;title>Getting Started&#x3C;/title></span>\n<span class="token inserted">+    &#x3C;title>Asset Management&#x3C;/title></span>\n    &#x3C;/head>\n    &#x3C;body>\n<span class="token deleted">-     &#x3C;script src="./main.js">&#x3C;/script></span>\n<span class="token inserted">+     &#x3C;script src="./bundle.js">&#x3C;/script></span>\n    &#x3C;/body>\n  &#x3C;/html></code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-diff">  const path = require(\'path\');\n\n  module.exports = {\n    entry: \'./src/index.js\',\n    output: {\n<span class="token deleted">-     filename: \'main.js\',</span>\n<span class="token inserted">+     filename: \'bundle.js\',</span>\n      path: path.resolve(__dirname, \'dist\')\n    }\n  };</code></pre>\n<h2 id="loading-css">Loading CSS<a href="#loading-css" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>In order to <code>import</code> a CSS file from within a JavaScript module, you need to install and add the <a href="/loaders/style-loader">style-loader</a> and <a href="/loaders/css-loader">css-loader</a> to your <a href="/configuration/module"><code>module</code> configuration</a>:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev style-loader css-loader</code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-diff">  const path = require(\'path\');\n\n  module.exports = {\n    entry: \'./src/index.js\',\n    output: {\n      filename: \'bundle.js\',\n      path: path.resolve(__dirname, \'dist\')\n    },\n<span class="token inserted">+   module: {</span>\n<span class="token inserted">+     rules: [</span>\n<span class="token inserted">+       {</span>\n<span class="token inserted">+         test: /\\.css$/,</span>\n<span class="token inserted">+         use: [</span>\n<span class="token inserted">+           \'style-loader\',</span>\n<span class="token inserted">+           \'css-loader\'</span>\n<span class="token inserted">+         ]</span>\n<span class="token inserted">+       }</span>\n<span class="token inserted">+     ]</span>\n<span class="token inserted">+   }</span>\n  };</code></pre>\n<blockquote class="tip">\n<p>webpack uses a regular expression to determine which files it should look for and serve to a specific loader. In this case any file that ends with <code>.css</code> will be served to the <code>style-loader</code> and the <code>css-loader</code>.</p>\n</blockquote>\n<p>This enables you to <code>import \'./style.css\'</code> into the file that depends on that styling. Now, when that module is run, a <code>&#x3C;style></code> tag with the stringified css will be inserted into the <code>&#x3C;head></code> of your html file.</p>\n<p>Let\'s try it out by adding a new <code>style.css</code> file to our project and import it in our <code>index.js</code>:</p>\n<p><strong>project</strong></p>\n<pre><code class="hljs language-diff">  webpack-demo\n  |- package.json\n  |- webpack.config.js\n  |- /dist\n    |- bundle.js\n    |- index.html\n  |- /src\n<span class="token inserted">+   |- style.css</span>\n    |- index.js\n  |- /node_modules</code></pre>\n<p><strong>src/style.css</strong></p>\n<pre><code class="hljs language-css"><span class="token selector">.hello</span> <span class="token punctuation">{</span>\n  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n<p><strong>src/index.js</strong></p>\n<pre><code class="hljs language-diff">  import _ from \'lodash\';\n<span class="token inserted">+ import \'./style.css\';</span>\n\n  function component() {\n    var element = document.createElement(\'div\');\n\n    // Lodash, now imported by this script\n    element.innerHTML = _.join([\'Hello\', \'webpack\'], \' \');\n<span class="token inserted">+   element.classList.add(\'hello\');</span>\n\n    return element;\n  }\n\n  document.body.appendChild(component());</code></pre>\n<p>Now run your build command:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> run build\n\n<span class="token punctuation">..</span>.\n    Asset      Size  Chunks             Chunk Names\nbundle.js  76.4 KiB       0  <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>  main\nEntrypoint main <span class="token operator">=</span> bundle.js\n<span class="token punctuation">..</span>.</code></pre>\n<p>Open up <code>index.html</code> in your browser again and you should see that <code>Hello webpack</code> is now styled in red. To see what webpack did, inspect the page (don\'t view the page source, as it won\'t show you the result) and look at the page\'s head tags. It should contain our style block that we imported in <code>index.js</code>.</p>\n<p>Note that you can, and in most cases should, <a href="/plugins/mini-css-extract-plugin/#minimizing-for-production">minimize css</a> for better load times in production. On top of that, loaders exist for pretty much any flavor of CSS you can think of -- <a href="/loaders/postcss-loader">postcss</a>, <a href="/loaders/sass-loader">sass</a>, and <a href="/loaders/less-loader">less</a> to name a few.</p>\n<h2 id="loading-images">Loading Images<a href="#loading-images" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>So now we\'re pulling in our CSS, but what about our images like backgrounds and icons? Using the <a href="/loaders/file-loader">file-loader</a> we can easily incorporate those in our system as well:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev file-loader</code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-diff">  const path = require(\'path\');\n\n  module.exports = {\n    entry: \'./src/index.js\',\n    output: {\n      filename: \'bundle.js\',\n      path: path.resolve(__dirname, \'dist\')\n    },\n    module: {\n      rules: [\n        {\n          test: /\\.css$/,\n          use: [\n            \'style-loader\',\n            \'css-loader\'\n          ]\n        },\n<span class="token inserted">+       {</span>\n<span class="token inserted">+         test: /\\.(png|svg|jpg|gif)$/,</span>\n<span class="token inserted">+         use: [</span>\n<span class="token inserted">+           \'file-loader\'</span>\n<span class="token inserted">+         ]</span>\n<span class="token inserted">+       }</span>\n      ]\n    }\n  };</code></pre>\n<p>Now, when you <code>import MyImage from \'./my-image.png\'</code>, that image will be processed and added to your <code>output</code> directory <em>and</em> the <code>MyImage</code> variable will contain the final url of that image after processing. When using the <a href="/loaders/css-loader">css-loader</a>, as shown above, a similar process will occur for <code>url(\'./my-image.png\')</code> within your CSS. The loader will recognize this is a local file, and replace the <code>\'./my-image.png\'</code> path with the final path to the image in your <code>output</code> directory. The <a href="/loaders/html-loader">html-loader</a> handles <code>&#x3C;img src="./my-image.png" /></code> in the same manner.</p>\n<p>Let\'s add an image to our project and see how this works, you can use any image you like:</p>\n<p><strong>project</strong></p>\n<pre><code class="hljs language-diff">  webpack-demo\n  |- package.json\n  |- webpack.config.js\n  |- /dist\n    |- bundle.js\n    |- index.html\n  |- /src\n<span class="token inserted">+   |- icon.png</span>\n    |- style.css\n    |- index.js\n  |- /node_modules</code></pre>\n<p><strong>src/index.js</strong></p>\n<pre><code class="hljs language-diff">  import _ from \'lodash\';\n  import \'./style.css\';\n<span class="token inserted">+ import Icon from \'./icon.png\';</span>\n\n  function component() {\n    var element = document.createElement(\'div\');\n\n    // Lodash, now imported by this script\n    element.innerHTML = _.join([\'Hello\', \'webpack\'], \' \');\n    element.classList.add(\'hello\');\n\n<span class="token inserted">+   // Add the image to our existing div.</span>\n<span class="token inserted">+   var myIcon = new Image();</span>\n<span class="token inserted">+   myIcon.src = Icon;</span>\n<span class="token inserted">+</span>\n<span class="token inserted">+   element.appendChild(myIcon);</span>\n\n    return element;\n  }\n\n  document.body.appendChild(component());</code></pre>\n<p><strong>src/style.css</strong></p>\n<pre><code class="hljs language-diff">  .hello {\n    color: red;\n<span class="token inserted">+   background: url(\'./icon.png\');</span>\n  }</code></pre>\n<p>Let\'s create a new build and open up the index.html file again:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> run build\n\n<span class="token punctuation">..</span>.\n                               Asset      Size  Chunks                    Chunk Names\nda4574bb234ddc4bb47cbe1ca4b20303.png  3.01 MiB          <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>  <span class="token punctuation">[</span>big<span class="token punctuation">]</span>\n                           bundle.js  76.7 KiB       0  <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>         main\nEntrypoint main <span class="token operator">=</span> bundle.js\n<span class="token punctuation">..</span>.</code></pre>\n<p>If all went well, you should now see your icon as a repeating background, as well as an <code>img</code> element beside our <code>Hello webpack</code> text. If you inspect this element, you\'ll see that the actual filename has changed to something like <code>5c999da72346a995e7e2718865d019c8.png</code>. This means webpack found our file in the <code>src</code> folder and processed it!</p>\n<blockquote class="tip">\n<p>A logical next step from here is minifying and optimizing your images. Check out the <a href="https://github.com/tcoopman/image-webpack-loader">image-webpack-loader</a> and <a href="/loaders/url-loader">url-loader</a> for more on how you can enhance your image loading process.</p>\n</blockquote>\n<h2 id="loading-fonts">Loading Fonts<a href="#loading-fonts" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>So what about other assets like fonts? The file and url loaders will take any file you load through them and output it to your build directory. This means we can use them for any kind of file, including fonts. Let\'s update our <code>webpack.config.js</code> to handle font files:</p>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-diff">  const path = require(\'path\');\n\n  module.exports = {\n    entry: \'./src/index.js\',\n    output: {\n      filename: \'bundle.js\',\n      path: path.resolve(__dirname, \'dist\')\n    },\n    module: {\n      rules: [\n        {\n          test: /\\.css$/,\n          use: [\n            \'style-loader\',\n            \'css-loader\'\n          ]\n        },\n        {\n          test: /\\.(png|svg|jpg|gif)$/,\n          use: [\n            \'file-loader\'\n          ]\n        },\n<span class="token inserted">+       {</span>\n<span class="token inserted">+         test: /\\.(woff|woff2|eot|ttf|otf)$/,</span>\n<span class="token inserted">+         use: [</span>\n<span class="token inserted">+           \'file-loader\'</span>\n<span class="token inserted">+         ]</span>\n<span class="token inserted">+       }</span>\n      ]\n    }\n  };</code></pre>\n<p>Add some font files to your project:</p>\n<p><strong>project</strong></p>\n<pre><code class="hljs language-diff">  webpack-demo\n  |- package.json\n  |- webpack.config.js\n  |- /dist\n    |- bundle.js\n    |- index.html\n  |- /src\n<span class="token inserted">+   |- my-font.woff</span>\n<span class="token inserted">+   |- my-font.woff2</span>\n    |- icon.png\n    |- style.css\n    |- index.js\n  |- /node_modules</code></pre>\n<p>With the loader configured and fonts in place, you can incorporate them via an <code>@font-face</code> declaration. The local <code>url(...)</code> directive will be picked up by webpack just as it was with the image:</p>\n<p><strong>src/style.css</strong></p>\n<pre><code class="hljs language-diff"><span class="token inserted">+ @font-face {</span>\n<span class="token inserted">+   font-family: \'MyFont\';</span>\n<span class="token inserted">+   src:  url(\'./my-font.woff2\') format(\'woff2\'),</span>\n<span class="token inserted">+         url(\'./my-font.woff\') format(\'woff\');</span>\n<span class="token inserted">+   font-weight: 600;</span>\n<span class="token inserted">+   font-style: normal;</span>\n<span class="token inserted">+ }</span>\n\n  .hello {\n    color: red;\n<span class="token inserted">+   font-family: \'MyFont\';</span>\n    background: url(\'./icon.png\');\n  }</code></pre>\n<p>Now run a new build and let\'s see if webpack handled our fonts:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> run build\n\n<span class="token punctuation">..</span>.\n                                 Asset      Size  Chunks                    Chunk Names\n5439466351d432b73fdb518c6ae9654a.woff2  19.5 KiB          <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>\n 387c65cc923ad19790469cfb5b7cb583.woff  23.4 KiB          <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>\n  da4574bb234ddc4bb47cbe1ca4b20303.png  3.01 MiB          <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>  <span class="token punctuation">[</span>big<span class="token punctuation">]</span>\n                             bundle.js    77 KiB       0  <span class="token punctuation">[</span>emitted<span class="token punctuation">]</span>         main\nEntrypoint main <span class="token operator">=</span> bundle.js\n<span class="token punctuation">..</span>.</code></pre>\n<p>Open up <code>index.html</code> again and see if our <code>Hello webpack</code> text has changed to the new font. If all is well, you should see the changes.</p>\n<h2 id="loading-data">Loading Data<a href="#loading-data" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Another useful asset that can be loaded is data, like JSON files, CSVs, TSVs, and XML. Support for JSON is actually built-in, similar to NodeJS, meaning <code>import Data from \'./data.json\'</code> will work by default. To import CSVs, TSVs, and XML you could use the <a href="https://github.com/theplatapi/csv-loader">csv-loader</a> and <a href="https://github.com/gisikw/xml-loader">xml-loader</a>. Let\'s handle loading all three:</p>\n<pre><code class="hljs language-bash"><span class="token function">npm</span> <span class="token function">install</span> --save-dev csv-loader xml-loader</code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-diff">  const path = require(\'path\');\n\n  module.exports = {\n    entry: \'./src/index.js\',\n    output: {\n      filename: \'bundle.js\',\n      path: path.resolve(__dirname, \'dist\')\n    },\n    module: {\n      rules: [\n        {\n          test: /\\.css$/,\n          use: [\n            \'style-loader\',\n            \'css-loader\'\n          ]\n        },\n        {\n          test: /\\.(png|svg|jpg|gif)$/,\n          use: [\n            \'file-loader\'\n          ]\n        },\n        {\n          test: /\\.(woff|woff2|eot|ttf|otf)$/,\n          use: [\n            \'file-loader\'\n          ]\n        },\n<span class="token inserted">+       {</span>\n<span class="token inserted">+         test: /\\.(csv|tsv)$/,</span>\n<span class="token inserted">+         use: [</span>\n<span class="token inserted">+           \'csv-loader\'</span>\n<span class="token inserted">+         ]</span>\n<span class="token inserted">+       },</span>\n<span class="token inserted">+       {</span>\n<span class="token inserted">+         test: /\\.xml$/,</span>\n<span class="token inserted">+         use: [</span>\n<span class="token inserted">+           \'xml-loader\'</span>\n<span class="token inserted">+         ]</span>\n<span class="token inserted">+       }</span>\n      ]\n    }\n  };</code></pre>\n<p>Add some data files to your project:</p>\n<p><strong>project</strong></p>\n<pre><code class="hljs language-diff">  webpack-demo\n  |- package.json\n  |- webpack.config.js\n  |- /dist\n    |- bundle.js\n    |- index.html\n  |- /src\n<span class="token inserted">+   |- data.xml</span>\n    |- my-font.woff\n    |- my-font.woff2\n    |- icon.png\n    |- style.css\n    |- index.js\n  |- /node_modules</code></pre>\n<p><strong>src/data.xml</strong></p>\n<pre><code class="hljs language-xml"><span class="token prolog">&#x3C;?xml version="1.0" encoding="UTF-8"?></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>note</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>to</span><span class="token punctuation">></span></span>Mary<span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>to</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>from</span><span class="token punctuation">></span></span>John<span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>from</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>heading</span><span class="token punctuation">></span></span>Reminder<span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>heading</span><span class="token punctuation">></span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;</span>body</span><span class="token punctuation">></span></span>Call Cindy on Tuesday<span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>body</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&#x3C;/</span>note</span><span class="token punctuation">></span></span></code></pre>\n<p>Now you can <code>import</code> any one of those four types of data (JSON, CSV, TSV, XML) and the <code>Data</code> variable you import it to will contain parsed JSON for easy consumption:</p>\n<p><strong>src/index.js</strong></p>\n<pre><code class="hljs language-diff">  import _ from \'lodash\';\n  import \'./style.css\';\n  import Icon from \'./icon.png\';\n<span class="token inserted">+ import Data from \'./data.xml\';</span>\n\n  function component() {\n    var element = document.createElement(\'div\');\n\n    // Lodash, now imported by this script\n    element.innerHTML = _.join([\'Hello\', \'webpack\'], \' \');\n    element.classList.add(\'hello\');\n\n    // Add the image to our existing div.\n    var myIcon = new Image();\n    myIcon.src = Icon;\n\n    element.appendChild(myIcon);\n\n<span class="token inserted">+   console.log(Data);</span>\n\n    return element;\n  }\n\n  document.body.appendChild(component());</code></pre>\n<p>Re-run the <code>npm run build</code> command and open <code>index.html</code>. If you look at the console in your developer tools, you should be able to see your imported data being logged to the console!</p>\n<blockquote class="tip">\n<p>This can be especially helpful when implementing some sort of data visualization using a tool like <a href="https://github.com/d3">d3</a>. Instead of making an ajax request and parsing the data at runtime you can load it into your module during the build process so that the parsed data is ready to go as soon as the module hits the browser.</p>\n</blockquote>\n<h2 id="global-assets">Global Assets<a href="#global-assets" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>The coolest part of everything mentioned above, is that loading assets this way allows you to group modules and assets together in a more intuitive way. Instead of relying on a global <code>/assets</code> directory that contains everything, you can group assets with the code that uses them. For example, a structure like this can be very useful:</p>\n<pre><code class="hljs language-diff"><span class="token deleted">- |- /assets</span>\n<span class="token inserted">+ |– /components</span>\n<span class="token inserted">+ |  |– /my-component</span>\n<span class="token inserted">+ |  |  |– index.jsx</span>\n<span class="token inserted">+ |  |  |– index.css</span>\n<span class="token inserted">+ |  |  |– icon.svg</span>\n<span class="token inserted">+ |  |  |– img.png</span></code></pre>\n<p>This setup makes your code a lot more portable as everything that is closely coupled now lives together. Let\'s say you want to use <code>/my-component</code> in another project, simply copy or move it into the <code>/components</code> directory over there. As long as you\'ve installed any <em>external dependencies</em> and your <em>configuration has the same loaders</em> defined, you should be good to go.</p>\n<p>However, let\'s say you\'re locked into your old ways or you have some assets that are shared between multiple components (views, templates, modules, etc.). It\'s still possible to store these assets in a base directory and even use <a href="/configuration/resolve#resolve-alias">aliasing</a> to make them easier to <code>import</code>.</p>\n<h2 id="wrapping-up">Wrapping up<a href="#wrapping-up" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>For the next guides we won\'t be using all the different assets we\'ve used in this guide, so let\'s do some cleanup so we\'re prepared for the next piece of the guides <a href="https://webpack.js.org/guides/output-management/">Output Management</a>:</p>\n<p><strong>project</strong></p>\n<pre><code class="hljs language-diff">  webpack-demo\n  |- package.json\n  |- webpack.config.js\n  |- /dist\n    |- bundle.js\n    |- index.html\n  |- /src\n<span class="token deleted">-   |- data.xml</span>\n<span class="token deleted">-   |- my-font.woff</span>\n<span class="token deleted">-   |- my-font.woff2</span>\n<span class="token deleted">-   |- icon.png</span>\n<span class="token deleted">-   |- style.css</span>\n    |- index.js\n  |- /node_modules</code></pre>\n<p><strong>webpack.config.js</strong></p>\n<pre><code class="hljs language-diff">  const path = require(\'path\');\n\n  module.exports = {\n    entry: \'./src/index.js\',\n    output: {\n      filename: \'bundle.js\',\n      path: path.resolve(__dirname, \'dist\')\n    },\n<span class="token deleted">-   module: {</span>\n<span class="token deleted">-     rules: [</span>\n<span class="token deleted">-       {</span>\n<span class="token deleted">-         test: /\\.css$/,</span>\n<span class="token deleted">-         use: [</span>\n<span class="token deleted">-           \'style-loader\',</span>\n<span class="token deleted">-           \'css-loader\'</span>\n<span class="token deleted">-         ]</span>\n<span class="token deleted">-       },</span>\n<span class="token deleted">-       {</span>\n<span class="token deleted">-         test: /\\.(png|svg|jpg|gif)$/,</span>\n<span class="token deleted">-         use: [</span>\n<span class="token deleted">-           \'file-loader\'</span>\n<span class="token deleted">-         ]</span>\n<span class="token deleted">-       },</span>\n<span class="token deleted">-       {</span>\n<span class="token deleted">-         test: /\\.(woff|woff2|eot|ttf|otf)$/,</span>\n<span class="token deleted">-         use: [</span>\n<span class="token deleted">-           \'file-loader\'</span>\n<span class="token deleted">-         ]</span>\n<span class="token deleted">-       },</span>\n<span class="token deleted">-       {</span>\n<span class="token deleted">-         test: /\\.(csv|tsv)$/,</span>\n<span class="token deleted">-         use: [</span>\n<span class="token deleted">-           \'csv-loader\'</span>\n<span class="token deleted">-         ]</span>\n<span class="token deleted">-       },</span>\n<span class="token deleted">-       {</span>\n<span class="token deleted">-         test: /\\.xml$/,</span>\n<span class="token deleted">-         use: [</span>\n<span class="token deleted">-           \'xml-loader\'</span>\n<span class="token deleted">-         ]</span>\n<span class="token deleted">-       }</span>\n<span class="token deleted">-     ]</span>\n<span class="token deleted">-   }</span>\n  };</code></pre>\n<p><strong>src/index.js</strong></p>\n<pre><code class="hljs language-diff">  import _ from \'lodash\';\n<span class="token deleted">- import \'./style.css\';</span>\n<span class="token deleted">- import Icon from \'./icon.png\';</span>\n<span class="token deleted">- import Data from \'./data.xml\';</span>\n<span class="token deleted">-</span>\n  function component() {\n    var element = document.createElement(\'div\');\n<span class="token deleted">-</span>\n<span class="token deleted">-   // Lodash, now imported by this script</span>\n    element.innerHTML = _.join([\'Hello\', \'webpack\'], \' \');\n<span class="token deleted">-   element.classList.add(\'hello\');</span>\n<span class="token deleted">-</span>\n<span class="token deleted">-   // Add the image to our existing div.</span>\n<span class="token deleted">-   var myIcon = new Image();</span>\n<span class="token deleted">-   myIcon.src = Icon;</span>\n<span class="token deleted">-</span>\n<span class="token deleted">-   element.appendChild(myIcon);</span>\n<span class="token deleted">-</span>\n<span class="token deleted">-   console.log(Data);</span>\n\n    return element;\n  }\n\n  document.body.appendChild(component());</code></pre>\n<h2 id="next-guide">Next guide<a href="#next-guide" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<p>Let\'s move on to <a href="https://webpack.js.org/guides/output-management/">Output Management</a></p>\n<h2 id="further-reading">Further Reading<a href="#further-reading" aria-hidden="true"><span class="icon icon-link"></span></a></h2>\n<ul>\n<li><a href="https://survivejs.com/webpack/loading/fonts/">Loading Fonts</a> on SurviveJS</li>\n</ul>\n'}});