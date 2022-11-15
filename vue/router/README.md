## vue-router 是什么?

vue-router 是专为 vue.js 设计的官方路由管理器 [推荐阅读官方文档](https://v3.router.vuejs.org/zh/)

## vue-router 的本质

vue-router 的本就就是监听地址栏 URL 变化显示不同的视图

- [监听 hash 变化事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event)

- [添加浏览器记录添加 state](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)

- [监听浏览器记录 state 变化事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event)

## vue-router 基本使用

```js
// main.js
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
createApp(App).use(router).mount();

// router/index.js
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home.vue";
import About from "@/views/about.vue";
const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
];
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
```

```vue
<!-- App.vue-->
<template>
  <router-view />
</template>

<!-- home.vue -->
<template>
  <div>home</div>
</template>

<!-- about.vue -->
<template>
  <div>about</div>
</template>
```

## vue-router 3.x 核心源码分析

1. 提供全局的 `router-view` 和 `router-link`
2. 根据传入的 `routes` 选项, 匹配到不同的路径时显示对应的组件
3. 给所有组件实例提供 `$router` 和 `$route` 的属性

## 核心源码实现 3.x

1. 创建匹配器, 格式化传入的参数(`create-matcher.js/create-route-map.js`)
2. 更具不同的 `mode` 创建不同的 `history` 实例(`history`)
3. 注册全局组件 `router-view/router-link` (`component`)

- [vue-router-core-demo](https://github.com/liaohui5/vue-router-core-demo)
