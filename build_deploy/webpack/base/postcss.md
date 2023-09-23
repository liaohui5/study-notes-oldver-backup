### 简介

> postcss 不是预处理器, 不能像 less 那样编写特定的语法然后解析为 css
> postcss 是能够对解析好的 css 文件做一些处理的工具: 比如自动增加浏览器前缀, 自动将 px 转为 rem

### 安装

```sh
npm i -D postcss-loader@3 postcss@7 postcss-sprites@4 autoprefixer@9.7
```

### 使用

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
        test: /\.(c|le)ss$/,
        use: ["style-loader", "css-loader", "less-loader", "postcss-loader"],
      },
    ],
  },
};
```

### 注意点

- `postcss-loader` 需要有单独的配置文件来配置需要的功能, 比如我需要增加浏览器前缀就需要安装对应的工具 `autoprefixer`
- 在 `webpack.config.js` 同级目录下新建一个 `postcss.config.js` 文件

```js
module.exports = {
  plugins: {
    // ...
  },
};
```

### 自动添加浏览器前缀 autoprefixer

- 在 `postcss.config.js` 中增加对应的配置

```js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "ie >= 8", // 兼容 ie7 以上浏览器
        "Firefox >= 3.5", // 兼容火狐版本大于 3.5 以上浏览器
        "chrome >= 35", // 兼容谷歌版本大于 35 以上浏览器
        "opera >= 11.5", // 兼容欧朋大于 11.5 以上浏览器
      ],
    },
  },
};
```
