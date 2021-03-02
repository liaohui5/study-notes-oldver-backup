## css-loader 和 style-loader

- css-loader: 解析 css `@import url()` 等语法

- style-loader: 将 webpack 解析完之后的内容插入到 html 的 head 标签中

- 安装

```bash
npm i css-loader -D
npm i style-loader -D
# or
npm i css-loader style-loader -D
```

## 配置使用

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
      // 处理样式规则
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        // 如果要设置 loader 的选项, 就不能用字符串, 要用对象的形式
        // use: [
        //     {
        //         loader: 'style-loader',
        //         options: {
        //             camelCase: true
        //         }
        //     }
        // ]
      },
    ],
  },
};
```

## 示例代码

- `/src/index.js`

```js
const styles = require("./index.css");

const div = document.createElement("div");

div.innerText = "测试文字";

document.body.appendChild(div);
```

- `/src/index.css`

```css
@import "test.css";

body {
  background: #000;
}
```

- `/src/test.css`

```css
body {
  color: #f00;
}
```
