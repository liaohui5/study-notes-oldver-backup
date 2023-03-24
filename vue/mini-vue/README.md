## 什么是声明式/指令式编程?

### 指令式(Imperative)

使用详细的指令去处理一件事情来达到你预期的结果

```js
// 比如: 我想从所有数据 data 中找到, 字段 name 为 "tom" 那一条
// 1. 遍历所有数据
// 2. 判断条件
// 3. 输出到控制台并且停止循环

let item;
for (let i = 0; i < data.length; i++) {
  item = data[i];
  if (item.name === 'tom') {
    console.log(item);
    break;
  }
}
```

### 声明式(Declarative)

按照规定的语法, 只是声明我想要的结果, 并不关心如何实现

```sql
SELECT * FROM `users` WHERE `users`.`name` = "tom";
```

## vue 源码核心模块

在 vue3 中, 主要有以下 3 大模块, 这些包都可以单独使用

其他模块虽然也很重要, 但是并不是核心功能模块, 如: `compiler-sfc` 这个模块主要是用于工具链的支持, 并不是核心实现原理

1. runtime-core: 运行时核心 [runtime-dom 浏览器平台的 runtime-core 实现](https://www.npmjs.com/package/@vue/runtime-dom)
2. compiler-core: 编译器核心 [compiler-dom 浏览器平台的 compiler-core 实现](https://www.npmjs.com/package/@vue/compiler-dom)
3. reactivity: 响应式 API [reactivity 不依赖具体环境,node 和浏览器都可以使用](https://www.npmjs.com/package/@vue/reactivity)

## API

> reactivity

- reactive API

  - [x] reactive
  - [x] readonly
  - [x] isReactive
  - [x] isReadonly
  - [x] isProxy

- ref API

  - [x] ref
  - [x] isRef
  - [x] toRef
  - [x] unRef
  - [x] toRefs
  - [x] proxyRefs

- computed API

  - [x] computed

- effect API
  - [x] effect

> runtime-core

- [x] createApp
- [x] h/createVNode
- [x] diff-computation
