## 将打包好的资源插入html模板
### html-webpack-plugin

- 将打包后的的资源文件插入到一个 html 中
- 可以自动生成或者指定换一个 html 模板
- [html-webppack-plugin github](https://github.com/jantimon/html-webpack-plugin#html-webpack-plugin)

### 安装

```sh
npm i -D html-webpack-plugin@4.5
```

### 配置

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 删除空格和换行
        removeComments: true, // 删除注释
        useShortDoctype: true, // 使用 html5 的 doctype
      },
      template: "./index.html", // 指定模板文件路径
    }),
  ],
};
```
