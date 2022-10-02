## 介绍

> 什么是 typescript(TS)

typescript 简称 ts

ts 和 js 的关系就比如 less/sass 和 css 的关系一样,

简单来说, typescript 是 javascript 的进化版, 超集

> 为什么需要 ts

因为 js 是弱类型语言, 很多错误只有在运行的时候才会被发现,

而 ts 是强类型语言, 他支持静态检查机制, 可以帮助程序员在编译时发现代码的错误

> ts 的特点

- 支持 js 的全部特性
- 支持代码静态检查
- 支持(枚举,泛型,命名空间,接口)等特性

## 相关文档

- [typescript 官网](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [typescript 中文手册](https://typescript.bootcss.com/basic-types.html)
- [typescript 中文手册](https://bosens-china.github.io/Typescript-manual/download/zh/handbook/basic-types.html)
- [typescript 中文手册](http://www.patrickzhong.com/TypeScript/)

## 安装

> 安装编译器

在安装 typescript 之前请确保安装了 [node.js](https://nodejs.org/en/)

```sh
# 在项目中安装
npm i typescript@4.8 -D

# 全局安装
npm i -g typescript@4.8
```

## 快速体验 typescript

- [在线测试 typescript](https://www.typescriptlang.org/zh/play?#code/FANwhgTgBAzgLhAXLBBLAdgcygXigIgAsBTAG1IHso4Z8BuYYAYwvRgtOIDpLMAKeBACUDIA)

```sh
## 新建node项目
mkdir ts-quick-starter && cd mkdir ts-quick-starter
npm -y init

## 安装 typescript 编译器
npm i -D typescript@4.8

## 新建 hello.ts
echo "var str: string = 'hello ts';\nconsole.log(str);" > hello.ts

## 将 ts 编译为 js, 然后用 node 运行
tsc ./hello.ts
node ./hello.js
```
