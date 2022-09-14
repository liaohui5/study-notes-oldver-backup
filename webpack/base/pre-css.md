## less-loader

- css 预处理器配置都是一样的, 只是需要配置不同的 loader 就可以, 所以这里一 less 为例

- [文档](https://www.webpackjs.com/loaders/less-loader/)

- 安装

```sh
npm i -D sass@1.45 scss-loader@10.1 less@3.11 less-loader@5
# 用哪个预处理器就下载哪个
```

- 配置

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
      // 处理样式
      {
        test: /\.(c|sc|sa)ss$/,
        // 1. 解析less语法
        // 2. 解析css语法, 如 import url 等
        // 3. 将解析完的css插入到html的head标签中
        use: ["style-loader", "css-loader", "less-loader"],
        // use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
```

## 实例代码

- 目录结构

![notes_imgs_20200304130915](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131710559.png)

- `/src/index.js`

```js
import "./index.less";

const oDiv = document.createElement("div");

oDiv.innerText = "hello world";

document.body.appendChild(oDiv);
```

- `/src/index.less`

```css
body {
  background: black;

  div {
    color: blue;
  }
}
```

- `/dist/index.html` 在 html 中导入打包后的 js 文件查看结果

```html
<script src="bundle.js"></script>
```

- 结果

![notes_imgs_20200304130824](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131711855.png)

## 其他 css 预处理器

> 其他预处理器也是同样的配置,只是需要的处理器和 loader 不同

- [sass](https://www.webpackjs.com/loaders/sass-loader/)

- [stylus](https://www.npmjs.com/package/stylus-loader)
