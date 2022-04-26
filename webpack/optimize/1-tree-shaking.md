## 什么是 Tree Shaking

> 过滤掉项目中无用的 js 代码和 CSS 代码,减少体积(让请求速度更快),这样的功能就叫 TreeShaking

比如: 我在 a.js 中导入了 jquery, 却只用到了 $.ajax, 其他方法都没有用到, 默认的情况下, 会将整个 jquery 都打包到 a.js 中
但是, 实际情况我是不需要其他的方法的, 为了减少体积, 提升性能, 我们就需要开启 TreeShaking, 将只用到的方法打包到 a.js 中
而不是将整个 jquery 直接打包到 jquery 中

## 如何开启 TreeShaking

- [官方文档](https://www.webpackjs.com/guides/tree-shaking/)

### JS TreeShaking

> 注意: 在开发环境下打包查看效果, 生产环境下, 直接把没用到的代码去掉了, 无法看到效果

1. 目录结构及代码

可以看到, 我在 `index.js` 中只引入了一个 `add` 方法, 其他方法都是不需要的

![dir-struct](https://raw.githubusercontent.com/liaohui5/images/main/images/20220420132457.png)

![code-index.js](https://raw.githubusercontent.com/liaohui5/images/main/images/20220420132540.png)

![code-index.less](https://raw.githubusercontent.com/liaohui5/images/main/images/20220420132604.png)

![code-dep.js](https://raw.githubusercontent.com/liaohui5/images/main/images/20220420132636.png)

2. 在 `webpack.config.js` 中

```js
// ...
optimization: {
  useExports: true,
}
// ...
```

3. 在 `package.json` 中添加

```json
{
  //...
  "sideEffects": ["*.css", "*.less", "*.scss"]
  //...
}
```

4. 查看效果

开启之前:

![before-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20220420133806.png)

开启之后:

![after-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20220420133338.png)

### CSS TreeShaking

1. 安装相关依赖

```sh
npm i -D purifycss-webpack purify-css glob-all
```

2. 配置插件

```js
const glob = require("glob-all");
const PurifyCSSPlugin = require("purifycss-webpack");

// 在plugins中:
new PurifyCSSPlugin({
  // 过滤src目录下所有的.html文件
  paths: glob.sync(path.join(__dirname, "src/*.html")),
});
```

3. 测试代码(目录结构/代码)

![code-and-dir](https://raw.githubusercontent.com/liaohui5/images/main/images/20220420135649.png)

![preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20220420140731.png)
