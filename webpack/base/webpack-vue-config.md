```js
"use strict";

/*
--- development build tools ---
yarn add webpack@4.44.2 webpack-cli@3.3.12 webpack-dev-server@3.11.2 -D
yarn add @vue/compiler-sfc@3.1.2  vue-loader@16.5.0 vue-style-loader@4.1.3 vue-template-compiler@2.6.14 -D
yarn add html-webpack-plugin@4.5.0 css-loader@4 sass@1.45.2  sass-loader@10.1.1 -D
yarn add babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D

--- runtime deps
yarn add @babel/runtime @babel/runtime-corejs2

--- vue3 env ---
vue vue-router vuex|pinia
yarn add vue@3 vue-router@4 vuex@next

--- vue2 env ---
yarn add vue@2 vue-router@3 vuex@3
*/

const webpack             = require("webpack");
const HtmlWebpackPlugin   = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { resolve }         = require("path");

const entry    = resolve(__dirname, "./src/main.js");
const htmlPath = resolve(__dirname, "./public/index.html");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry,
  externals: {
    // 在 public/index.html 使用外部的 cdn
    // lodash: https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/lodash.js/4.17.21/lodash.min.js
    _: "lodash",
  },
  resolve: {
    extensions: ["*", ".mjs", ".js", "jsx", ".json", ".vue"],
  },
  output: {
    path: resolve(__dirname, "./dist"),
    filename: "main.[hash:6].js",
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HtmlWebpackPlugin({ template: htmlPath }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/i,
        loader: "vue-loader",
      },
      {
        test: /\.scss$/i,
        loader: ["vue-style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/, // 排除 node_modules 目录
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  chrome: "50",
                },
              },
            ],
          ],

          // babel 的插件
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              {
                absoluteRuntime: false,
                corejs: 2, // 不污染全局作用域
                helpers: true,
                regenerator: true,
                useESModules: false,
              },
            ],
          ],
        },
      },
    ],
  },

  devServer: {
    port: 8080,
  },
};
```
