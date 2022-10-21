## 相关文档

- [vuex 3.x 文档](https://v3.vuex.vuejs.org/zh/)
- [vuex 4.x 文档](https://vuex.vuejs.org/zh/)

## Vuex 是什么?

vuex 是专为 vue.js 设计的的集中式状态管理库[读官网的介绍](https://vuex.vuejs.org/zh/)

## 工作流程

由上图可知道, vuex 的工作流是一个严格的单向数据流

1. 将所有需要共享的状态放到的 `state / gettters` 中
2. 在组件中需要时直接通过 `mapState / mapGetters` 来获取出状态
3. 改变状态有两种方式, 当状态改变, vue 的响应式系统会自动重新渲染视图
   - 同步: 直接提交一个 `mutation` 去改变状态
   - 异步: 派发一个 `action` 然后提交一个 `mutation`, 在 `mutation` 中改变状态

![https://vuex.vuejs.org/vuex.png](https://vuex.vuejs.org/vuex.png)

![vuex](https://raw.githubusercontent.com/liaohui5/images/main/images/202210201603700.png)

## 基本使用

```js
// main.js
import { createApp } from "vue";
import store from "@/store";
import App from "@/App";
createApp(App).use(store).mount("#app");

// store/index.js
import { createStore } from "vuex";
export default createStore({
  state: {
    hits: 0,
  },
  actions: {
    setHitsAsync({ commit }, { hits }) {
      // async request
      commit("setHits", hits);
    },
  },
  mutations: {
    // mutations 必须是同步的方法
    setHits(state, payload) {
      state.hits = payload;
    },
  },
});
```

```vue
<template>
  <div>
    <p>点击了{{ hits }}次</p>
    <button @click="handleClick">点击</button>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const hits = computed(() => store.state.hits);

function handleClick() {
  // 如果有异步请求, 需要 dispatch(派发) action
  // store.dispatch("setHitsAsync", {
  //   hits: hits.value + 1,
  // });

  // 如果没有异步请求, 可以直接 commit(提交) mutation
  store.commit("setHits", hits.value + 1);
}
</script>
```

## 3.x 核心源码实现分析

- [推荐阅读: 官方文案#如何写一个插件](https://v2.cn.vuejs.org/v2/guide/plugins.html)

1. 要让 `Vue.use` 方法可以正确安装插件, 那么 `Vuex` 必须是一个带有 `install` 方法的对象
2. 要让 `Vuex.Store` 可以实例化, 那么 `Vuex.Store` 必须是一个类
3. 让传入的 `state` 具有响应式
4. 挂载一个全局的 `$store` 属性

```js
// 安装插件
function install(Vue) {
  Vue.mixin({
    // 每个组件都会执行这个方法
    beforeCreate() {
      if (this.$options && this.$options.store) {
        this.$store = this.$options.store; // 根元素
      } else {
        this.$store = this.$parent.$store; // 其他所有子元素
      }
    },
  });
}

class Store {
  constructor(options) {}
  dispatch() {}
  commit() {}
}

export default {
  install,
  Store,
};
```

## 4.x 核心源码实现分析

- [推荐阅读:官方文档#如何写一个插件](https://cn.vuejs.org/guide/reusability/plugins.html)

1. 要让 `use` 方法可以正确安装插件, 那么 `createStore` 这个 API 必须返回一个包含 `install` 方法的对象
2. `useStore` 方法返回一个 `createStore` 创建的对象
3. 让传入的 `state` 有响应式的效果
4. 需要全局挂载一个 `$store` 让所有组件的模板中可以直接使用

```js
import { inject } from "vue";
class Store {
  constructor(options) {}
  install(app) {
    app.config.globalProperties.$store = this;
    app.provide("store", this);
  }
}

export function createStore(options) {
  return new Store(options);
}

export function useStore() {
  return inject("store");
}
```

## 核心源码代码实现

其实 3/4 实现原理差不多, 只是稍微有些不同, 核心思想并没有变化

- [vuex4-core-demo](https://github.com/liaohui5/vuex4-core-demo)
- [vuex3-core-demo](https://github.com/liaohui5/vuex3-core-demo)
