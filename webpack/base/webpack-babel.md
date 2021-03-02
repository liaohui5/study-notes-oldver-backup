### babel 解析器转换 js 高级语法

- [babel 中文文档](https://www.babeljs.cn/)

默认情况下, webpack 无法将 JS 高版本的语法(ES678)转换为低版本语法(ES5), 如果要兼容低版本的浏览器就需要使用 babel 来转化语法

- [安装 babel](https://www.babeljs.cn/setup#installation)

1. babel-loader
2. @babel/core
3. @babel/preset-env

```sh
npm i babel-loader @babel/core @babel/preset-env -D
```

- 配置使用

```js
module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 目录
        loader: "babel-loader",
        options: {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            // 指定浏览器版本去优化: 是否需要转换es678等高级语法
                            // chrome 58 已经支持了 es6 语法,  chrome 40 不支持
                            // "chrome": "58", // 不会转换es6语法
                            "chrome": "40", // 会转换es6语法为es5语法
                        }
                    }
                ]
            ]
        }
    }]
},
```

- 也可以将 `options` 选项注释掉, 将内容单独写到一个配置文件中 `.babelrc` , 注意 `.babelrc` 是一个 `json 格式的文件` , **不能写注释**

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "40"
        }
      }
    ]
  ]
}
```

---

通过以上配置已经能够转换与低版本 js 有对应关系的 es6 语法, 语法对应关系如:
|es6|es5|
|:---|:---|
|let| var|
|const|var|
|() => {}|function() {}|

但是在高版本的有些语法低版本是没有对应关系的, 比如 `Promise` `includes` 等

### babel 转换没有对应关系的 js 语法

- [babel-plugin-transform-runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)

```sh
npm i  @babel/plugin-transform-runtime -D
npm i @babel/runtime  @babel/runtime-corejs2
```

`@babel/runtime-corejs2` 这个包是为了不污染全局作用域, 如果不安装这个包, 会相全局作用域中注入一些变量

**注: `@babel/runtime` 和 `@babel/runtime-corejs2` 不能加 `-D` 参数**

- 配置

```js
module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 目录
        loader: "babel-loader",
        options: {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "chrome": "50",
                        }
                    }
                ]
            ],

            // babel 的插件
            "plugins": [
                [
                    "@babel/plugin-transform-runtime",
                    {
                        "absoluteRuntime": false,
                        "corejs": 2, // 不污染全局作用域
                        "helpers": true,
                        "regenerator": true,
                        "useESModules": false
                    }
                ]
            ]

        }
    }]
},
```
