## 相关文档

- [调试配置官方文档](https://go.microsoft.com/fwlink/?linkid=830387)
- [调试配置中文文档](https://www.bookstack.cn/read/CN-VScode-Docs/md-%E7%BC%96%E8%BE%91%E5%99%A8-%E8%B0%83%E8%AF%95.md)
- [各种项目调试配置](https://github.com/microsoft/vscode-recipes/tree/master)

## 调试 vue.js 项目

其实大多数时候更多的调试用的是 `vue-devtools` 和 `console.log`,

但是用编辑器调试并不是什么难事, 而且可以看到代码的运行流程, 这个很重要,

可以用来调试别人写好的开源项目的源码, 所以就学习记录以下

[官网的具体步骤](https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html)

### 1.修改打包程序配置文件

主要目的就是开启 source-map, 方便调试

```js
// vue-cli: vue.config.js
module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
};

// vite: vite.config.js
export default defineConfig({
  build: {
    sourcemap: true,
  },
});
```

### 2.生成 debug 配置文件

1. 点击 `Debug` -> `Run and Debug` -> `Web App(Chrome)`
2. 点击之后会生成 `.vscode/launch.json`, 且内容如下
3. 如果不想点击, 手动创建也是没有问题的

```jsonc
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:8080", // 这个位置修改项目的运行url
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### 4.启动测试

1. 启动项目

```bash
npm run dev
```

2. 先在项目中使用加断点, 或者手动使用 `debugger` 语句

![add-breakpoint](https://raw.githubusercontent.com/liaohui5/images/main/images/202109172208993.png)

3. 启动调试

配置好之后, 直接按快捷键 `F5` 或者手动点击启动

![start-debugger](https://raw.githubusercontent.com/liaohui5/images/main/images/202109172211038.png)

4. 调试 react 的步骤和上面是一样的

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
      "skipFiles": ["${workspaceRoot}/node_modules/**/*.js", "<node_internals>/**/*.js"]
    }
  ]
}
```

### 3.调试/查看效果

1. `F5` 或者手动开启 debug
2. 加断点
3. 发送请求, 让加断点位置的代码执行

![debug-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/202109180131602.png)

### 4. 调试 egg.js 的调试配置

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "debug-egg-server",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "windows": { "runtimeExecutable": "npm.cmd" },
      "runtimeArgs": ["run", "debug"],
      "console": "integratedTerminal",
      "protocol": "auto",
      "restart": true,
      "port": 9229,
      "autoAttachChildProcesses": true
    }
  ]
}
```
