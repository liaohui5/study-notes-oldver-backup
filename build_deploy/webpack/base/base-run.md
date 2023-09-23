### 传统开发模式的弊端

- 文件多(会发多个请求), 依赖关系多(难以维护), 所以我们需要自动打包代码的工具 --- `webpack`

```html
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>
```

### 参考信息

- [version: 4.x](https://v4.webpack.js.org/configuration/)

- webpack 是 node 写的, 所以必须确认安装了 node.js

> 建议安装时使用指定的版本, 否则可能导致版本不兼容报错

### 安装webpack4

```bash
npm -y init
npm i -D webpack@4.44 webpack-cli@3.3 webpack-dev-server@3.11
# webpack: 打包构建
# webpack-cli: 提供命令用来执行打包
# webpack-dev-server: 开发服务器, 不用每次打包, 直接查看效果
```

### 配置文件

默认配置文件叫 webpack.config.js

```js
// webpack 是node写的所以,需要使用node(commonJS)的规范
const path = require("path");

module.exports = {
  // 打包模式: 开发模式:development   生产模式(默认): production
  // 开发模式: 不会压缩代码 生产模式会压缩代码
  mode: "development",

  // entry: 打包入口,这个文件所依赖的所有其他模块,都会被webpack制动加载然后打包
  entry: "./src/index.js",

  // output: 打包后的目录(绝对路径)和文件名
  output: {
    // 打包后的文件名, hash是为了解决浏览器缓存的问题
    filename: "bundle.[hash].js",
    // 当前目录下的 dist 目录
    path: path.resolve(__dirname, "dist"),
  },
};
```

### 创建对应的目录

![notes_imgs_20200302024333](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131710743.png)

### 执行打包命令

使用默认的配置文件 `webpack.config.js`

```
npx webpack
```

指定一个配置文件

```
npx webpack --config=test.webpack.config.js
```

### 简化打包命令

在项目的开发过程中会有许多环境, 开发环境, 测试环境, 线上环境肯定需要不同的配置文件, 可以在 `package.json` 中来
配置 scripts 然后使用 `npm run scriptName` 的方式来执行不同环境下的打包

```js
"scripts": {
    "dev": "npx webpack --config webpack.dev.js",
    "test": "npx webpack --config webpack.test.js",
    "prod": "npx webpack --config webpack.production.js"
},
```

### 安装插件 codeRunner

![20200302023414](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131710841.png)

### 查看运行结果

![notes_imgs_20200302184158](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131710278.png)
