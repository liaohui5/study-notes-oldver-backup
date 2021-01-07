### 异常处理

在 js 中, 如果代码出现异常, 代码就会直接停在出现异常的位置, 后面的代码全都不会执行,
但是有些时候就算代码出现异常, 也应该让代码继续执行(比如在 node.js 中, 就算请求传递
的参数有误, 也应该正常响应数据)这就需要捕获代码异常

### 抛出异常

```js
function testFn(flag) {
  if (flag) {
    return "ok";
  }
  throw new Error("error info...");
}
```

### 捕获异常

```js
let bool = false;

try {
  // 可能会抛出异常的代码
  testFn(bool);
} catch (e) {
  console.info("捕获到的错误信息:", e.message);
}
console.log("后面的代码...");
```

### `try catch` 无法捕获异步的异常

由于 js 是单线程的特性, 有些异步操作, 不能捕获到异常, 比如 `Promise` 和 `setTimeout`

```js
const fn1 = () => {
  setTimeout(() => {
    throw new Error("async exception");
  }, 1000);
};

try {
  fn1();
} catch (e) {
  console.info(e); // 并没有捕获到该错误
}
```

### 监听代码异常事件

- onerror: 代码抛出异常, 或者资源加载失败, 会触发 `error` 事件
- unhandledrejection: `当Promise被rejected且没有rejection处理器(简单来说就是没有.catch)` 处理时会触发 `unhandledrejection`事件

```js
const fn1 = () => {
  return new Promise((resolve, reject) => reject("rejected"));
};

const fn2 = () => {
  throw new Error("throw exception");
};

window.addEventListener("unhandledrejection", (e) => {
  console.info(e.reason); // rejected
});

window.addEventListener("error", (e) => {
  console.info(e.message); // Uncaught Error: throw exception
});

fn1();
fn2();
```
