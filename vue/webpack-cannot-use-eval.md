因为 webpack 的实现原理就是依靠的 `eval` 函数,

无法在 `eval` 函数中使用 `eval` 会导致语法错误,

但是某些时候又需要使用 `eval` 函数: 比如将一个字符串转换为 `RegExp` 对象

> 语法

```js
const funcEval = (func) => new Function("return " + func)();
```

> 应用: 将字符串转 RegExp 对象

```js
const funcEval = (func) => new Function("return " + func)();
const regstr = `/<img.+?src=(.*?)([^"']*?)>/gim`;

let reg;
let str = `<div><img src="http://xxx.com/xxx.jpg"/></div>`;
try {
  reg = funcEval(regstr);
  console.log(reg);
} catch (e) {
  console.log("Invalid RegExp String");
}

if (reg) {
  str.replace(reg, (...args) => {
    console.log(args[1]); // "http://xxx.com/xxx.jpg"
  });
}
```
