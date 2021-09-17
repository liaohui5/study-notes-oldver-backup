## 相关文档

- [调试配置官方文档](https://go.microsoft.com/fwlink/?linkid=830387)
- [调试配置中文文档](https://www.bookstack.cn/read/CN-VScode-Docs/md-%E7%BC%96%E8%BE%91%E5%99%A8-%E8%B0%83%E8%AF%95.md)

## 调试 vue.js 项目

其实大多数时候更多的调试用的是 `vue-devtools` 和 `console.log`,

但是用编辑器调试并不是什么难事, 而且可以看到代码的运行流程, 这个很重要,

可以用来调试别人写好的开源项目的源码, 所以就学习记录以下

[官网的具体步骤](https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html)

### 1.安装插件调试插件(chrome 浏览器)

![debugger for chrome](https://raw.githubusercontent.com/liaohui5/images/main/images/202109172201318.png)

### 2.修改 `vue.config.js` 配置文件

> 没有就在项目根目录下新建一个 `vue.config.js`

```js
module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
};
```

### 3.创建调试配置文件

> 在项目根目录下创建 `./vscode/launch.json` 且内容如下

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### 4.启动测试

1. 启动项目

```bash
npm run serve
```

2. 先在项目中使用加断点, 或者手动使用 `debugger` 语句

![add-breakpoint](https://raw.githubusercontent.com/liaohui5/images/main/images/202109172208993.png)

3. 启动调试

配置好之后, 直接按快捷键 `F5` 或者手动点击启动

![start-debugger](https://raw.githubusercontent.com/liaohui5/images/main/images/202109172211038.png)

## 调试 react 项目

调试 `https://github.com/facebook/create-react-app` 脚手架创建的 react.js 项目和

调试 `vue.js` 的步骤差不都, 最主要的是 `.vscode/launch.json` 配置不一样, 也不许要配置 `vue.config.js`

1. 启动项目 `npm run start`
2. [安装 debugger 调试插件](/vscode/debug?id=_1安装插件调试插件chrome-浏览器)
3. 创建调试配置文件 `/.vscode/launch.json`

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "react.js debug chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "skipFiles": [
        "${workspaceRoot}/node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
    }
  ]
}
```

## 调试 node.js 项目

不管是 `express` 还是 `koa` `egg.js` 调试步骤都是一样的, 主要是 `launch.json` 中的配置

### 1. 创建项目环境

1. 安装 express 项目

```bash
npx express-generator express-debug-demo # 用脚手架创建项目
cd express-debug-demo
npm i
```

2. 安装 nodemon 方便调试, 不用脚手架自带的那个, 不好用

```bash
npm i nodemon -D
```

3. 修改 `package.json`, 添加调试的 scripts

```json
"scripts": {
  "dev": "nodemon ./bin/www",
  "start": "node ./bin/www"
},
```

### 2. 创建调试配置文件

在项目目录下新建 `.vscode/launch.json`

```json
{
  // https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      // 这个 program 配置选项很重要,如果你不是用脚手架创建的
      // 而是手动安装express然后导入的方式, 就要写你自己的
      // 入口文件路径比如 ${workspaceFolder}/app.js
      "program": "${workspaceFolder}/bin/www",
      "restart": true,
      "console": "integratedTerminal",
      "skipFiles": [
        "${workspaceRoot}/node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
    }
  ]
}
```

### 3.调试/查看效果

1. `F5` 或者 开启 debug
2. 加断点
3. 浏览器请求你请求你加断点的位置, 让代码执行

![preview](https://raw.githubusercontent.com/liaohui5/images/main/images/202109172336924.png)
