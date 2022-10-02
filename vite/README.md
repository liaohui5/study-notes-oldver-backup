## 相关文档

- [vite](https://cn.vitejs.dev/guide/)

- [Vite 配置](https://cn.vitejs.dev/config/)

- [Vite 插件](https://cn.vitejs.dev/plugins/)

- [vite 项目模板](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

- [vite 插件(非官方插件)](https://github.com/vitejs/awesome-vite#plugins)

## 安装 vite

```sh
npm i -g vite
```

## 手动配置环境

### 安装依赖

- vue2 项目依赖

```sh
npm i @vitejs/plugin-vue2 -D
npm i vue@2 vue-router@3 vuex@3
```

- vue3 项目依赖

```sh
npm i @vitejs/plugin-vue -D
npm i vue@3 vue-router@4 vuex@4
# vuex 可以替换为 pinia, 功能类似, 使用哪个包都可以
```

- react 项目依赖

```sh
npm i @vitejs/plugin-react -D
npm i react@18 react-dom@18 react-router@6 react-router-middleware-plus
# react-router-middleware-plus: 路由中间件
```

## 环境配置

- [vue2 示例项目](https://github.com/liaohui5/vite-config-for-spa/tree/vue2)
- [vue3 示例项目](https://github.com/liaohui5/vite-config-for-spa/tree/vue3)
- [react 示例项目](https://github.com/liaohui5/vite-config-for-spa/tree/react)

```jsx
// vite.config.js
import path from "path";
import { defineConfig } from "vite";

// 什么类型的项目就使用对应的插件
import vue2 from "@vitejs/plugin-vue2";
// import vue3 from "@vitejs/plugin-vue";
// import react from "@vitejs/plugin-react";

const resolve = (dir) => path.resolve(__dirname, dir);
// 使用 defineConfig 是为了代码提示, 也可以直接导出一个对象
export default defineConfig({
  plugins: [vue2()],
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
```
