### mini-css-extract-plugin

- 将 css 代码抽离到一个 css 文件中

- [文档](https://webpack.js.org/plugins/mini-css-extract-plugin/)

### 安装

```sh
npm i -D mini-css-extract-plugin@1
```

### 使用

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        test: /\.(c|le)ss$/,
        use: [
          {
            // loader: 'style-loader',            // 将css代码直接插入到 html 的 head 中
            loader: MiniCssExtractPlugin.loader, // 将css代码抽离为为单独的文件, 然后使用 link 标签导入
          },
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.js", // 指定打包之后的文件名
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 删除空格和换行
        removeComments: true, // 删除注释
        useShortDoctype: true, // 使用 html5 的的 doctype
      },
      template: "./index.html",
    }),
  ],
};
```
