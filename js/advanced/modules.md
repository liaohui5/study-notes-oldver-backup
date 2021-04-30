## ES6 Module - 墙裂推荐

-  es6 的新语法

+ [export 导出模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)
+ [import 导入模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

## CommonJS

所谓 CommonJS 模块化, 简单理解, 就是 node.js 那种 require 的方式的模块化

- 实现 node.js 的 require 方法:

> test.js

```js
module.exports = "hello world";
```

> index.js

```js
const fs = require("fs");

/**
 * 实现node.js的require方法
 * @param {string} moduleName 模块路径
 * @returns Module
 */
const include = (moduleName) => {
  const content = fs.readFileSync(moduleName, "utf8");
  // new Function: 最后一个参数是函数的内容体
  const fn = new Function(
    "exports",
    "module",
    "include",
    "__dirname",
    "__filename",
    `${content} \n return module.exports`
  );

  const module = {
    exports: {},
  };

  return fn(module.exports, module, include, __dirname, __filename);
};

const str = include("./test.js");
/*
  function(exports, module, require, __dirname, __filename) {
    module.exports = "hello world";
    return module.exports;
  }
*/
console.info(str);
```

## require.js

> 主要有两个方法, 一个 `定义模块 define` 一个使用模块 `require`

```js
const factories = {}; // 全局的模块名和方法映射 { 'name': function () {} }

/**
 * 定义模块
 * @param {string} moduleName 模块名
 * @param {Array} deps 依赖
 * @param {Function} factory 模块返回值
 */
function define(moduleName, deps, factory) {
  factory.deps = deps; // 保存当前定义模块的依赖
  factories[moduleName] = factory;
}

/**
 * 使用模块
 * @param {String[]} modules 模块名数组
 * @param {Function} callback 拿到模块后, 执行的方法
 */
function require(modules, callback) {
  const results = modules.map((moduleName) => {
    let factory = factories[moduleName];
    let exports;
    // deps: 依赖在define方法中保存过的
    require(factory.deps, (...args) => {
      exports = factory.apply(null, args);
    });
    return exports;
  });
  callback.apply(null, results);
}

define("name", [], () => "jerry");
define("age", ["name"], (name) => name + 21);

require(["age"], (age) => {
  console.info(age);
});
```
