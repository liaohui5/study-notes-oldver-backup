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

## vue-router 4.x 核心源码分析

1. 提供全局的 `router-view` 和 `router-link`
2. 提供 `createRouter` 和 `createWebHashHistory` 方法
3. 提供全局的 hooks 方法 `useRouter` 和 `useRoute`
4. 根据传入的 `routes` 选项, 匹配到不同的路径时显示对应的组件

## vue-router 3.x 核心源码分析

1. 提供全局的 `router-view` 和 `router-link`
2. 根据传入的 `routes` 选项, 匹配到不同的路径时显示对应的组件
3. 给所有组件实例提供 `$router` 和 `$route` 的属性

```js
class VueRouter {
  constructor({ mode = "hash", routes = [] }) {}
}

VueRouter.install = function (Vue) {
  Vue.mixin({
    beforeCreate() {
      // 给所有组件实例挂载一个 $router 属性
      if (this.$options && this.$options.router) {
        this.$router = this.$options.router;
      } else {
        this.$router = this.$parent.$router;
      }
    },
  });
};

export default VueRouter;
```
