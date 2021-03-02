### webpack-dev-server

- 监听文件变化: 自动打包
- 自动刷新浏览器
- [配置 proxy, 结局跨域](https://www.webpackjs.com/configuration/dev-server/#devserver-proxy)
- [文档](https://www.webpackjs.com/configuration/dev-server/#devserver)

### 安装

```sh
npm i webpack-dev-server -D
```

### 使用

- `package.json` 配置命令

```js
  "scripts": {
      "dev": "webpack-dev-server --config ./webpack.config.js"
  },
```

### 配置

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

  devServer: {
    port: 8888, // 服务端监听端口
    compress: true, // 压缩
    contentBase: "./dist", // 指定提供内容的目录
    proxy: {
      // 请求代理设置
      "^/api": {
        // 将路径以 /api 开头的请求转发到 target 属性对应的域名
        target: "http://localhost:3000/api",
        secure: false,
      },
    },
  },
};
```
