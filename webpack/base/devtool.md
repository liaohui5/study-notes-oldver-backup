## webpack 的源码映射功能

[中文文档](https://www.webpackjs.com/configuration/devtool/#devtool)

---

什么是源码映射?

1. 使用 webpack 打包, 生成的文件不止我们自己写的代码, 还有一些其他的代码, 如果程序报错, 此时根本无法知道是哪行代码, 甚至那个文件报错...

验证步骤

1. 新建一个 js 文件, 就输入以下内容, 让它报错, 然后在浏览器中看效果就能知道

```
alert(abc);
```

## 推荐设置

- 开发环境: `cheap-module-eval-source-map`

```js
module.exports = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
};
```

- 生产环境: `cheap-module-source-map`

```js
module.exports = {
  mode: "production",
  devtool: "cheap-module-source-map",
};
```
