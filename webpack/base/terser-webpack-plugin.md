### 压缩打包后 css 和 js 文件

1. 默认情况下, 在没有配置 `optimization` 的时候并且当 `mode` 为 `production` 的时候会自动压缩 js 文件, 但是不会压缩 css 文件, 但是一旦配置手动配置了 `optimization` 选项就会覆系统默认的压缩 js 选项, 所以, 一旦手动配置了, 就必须要手动配置 js 压缩
2. 压缩 css 插件: [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)
3. 压缩 js 插件: [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)

### 安装

```sh
npm i -D optimize-css-assets-webpack-plugin

npm i -D terser-webpack-plugin
```

### 使用

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  // mode: 'development',
  mode: "production",
  devtool: "cheap-module-eval-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  /**
   * 优化: 在 production 的模式下生效
   */
  optimization: {
    minimizer: [
      new TerserJSPlugin({}), // 压缩 js 代码
      new OptimizeCSSAssetsPlugin({}), // 压缩 css 代码
    ],
  },

  module: {
    rules: [
      // 处理样式
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // 将css代码抽离 为单独的文件, 使用 link 标签导入
          },
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin(),
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
