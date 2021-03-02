### 什么是 loader?

webpack 默认只能打包 js 文件, 不能打包图片, 字体, css 等文件(因为这些文件没有模块的概念), 如果需要打包这些文件就需要安装对应的 `loader` 来将这些文件转换为 webpack 能够识别的模块, 然后在打包

- 注: 如果有多个不同类型的文件需要不同的 loader, 加载顺序是: `右 => 左` `下 => 上`

## fileloader 的使用

- [中文文档](https://www.webpackjs.com/loaders/file-loader/#%E5%AE%89%E8%A3%85)

- 安装

```bash
npm i -D file-loader
```

- 在配置文件中使用

```js
const path = require("path");
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },

    // module: 告诉webpack如何去处理将不能识别的文件
    module: [
        rules: [{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    // 选项..
                }
            }, ]
        }]
    ]
};
```

- 需要打包的 js 文件

```js
const file = require("./img/test.png");
const img = document.createElement("img");
img.src = file;
document.appendChild(img);
```

打包之后在 html 中引入这个 js 文件, 看图片是否能够显示出来,
如果能够正常显示证明 webpack 已经能够处理图片文件

## url-loader 的使用

- [中文文档](https://www.webpackjs.com/loaders/url-loader/)

`url-loader` 可以将较小图片文件转换为 base64 的字符串, 提升网页性能
(不会因为一个小文件发送一个请求), 但是并不是所有的文件都转换为 base64 就能提升网页性能,
如果超过指定的限制大小就会将图片保存为一个文件(和 file-loader 的功能类似)

> 简单来说: 也是处理图片文件的 loader, 但是比 file-loader 多一个 可以将小图片转换为 base64 的功能, 其他 file-loader 有的选项功能 url-loader 也有

- 安装

```
npm i -D url-loader
```

- 配置文件

```js
const path = require("path");
module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              // limit 如果文件小于100k则打包为base64, 大于100k就使用图片路径
              limit: 1024 * 100,
            },
          },
        ],
      },
    ],
  },
};
```

### 示例代码

- src/index.js

```js
const file = require("./1.jpg"); // 注意这个文件必须存在, 否则报错
const img = document.createElement("img");
img.src = file.default;
document.body.appendChild(img);
```

- 新建一个 `/bundle/index.html` 引入打包后的文件直接运行看效果

```html
<script src="./bundle.js"></script>
```

### 处理字体

- 处理字体其实就是使用 `file-loader` 将字体文件拷贝到指定的目录

```js
rules: [
  // 处理字体文件
  {
    test: /\.(eot|json|svg|ttf|woff|woff2)$/,
    use: [
      {
        "file-loader": {
          filename: "[name].[ext]",
          outputPath: "fonts",
        },
      },
    ],
  },
  // ...
];
```

---

### 打包 html 代码 img 标签的 src 引入的图片

- [html-withimg-loader](https://www.npmjs.com/package/html-withimg-loader)
