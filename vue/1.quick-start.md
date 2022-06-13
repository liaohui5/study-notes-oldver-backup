## Vue.js 是什么

> Vue (读音 /vjuː/，类似于 **view**) 是一套用于构建用户界面的**渐进式框架**。
> 与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。
> Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
> 另一方面，当与 [现代化的工具链](https://cn.vuejs.org/v2/guide/single-file-components.html)
> 以及各种 [支持类库](https://github.com/vuejs/awesome-vue#libraries--plugins) 结合使用时，Vue 也完全能够为复杂的单页应用提供驱动

## 文档

> vue.js 2.x

- [Vue.js 2](https://cn.vuejs.org/v2/guide/index.html)
- [vue-router](https://v3.router.vuejs.org/zh/guide/#html)
- [vuex](https://v3.vuex.vuejs.org/zh/)

> vue.js 3.x

- [Vue.js 3](https://v3.cn.vuejs.org/guide/introduction.html)
- [vue-router](https://router.vuejs.org/zh/guide/)
- [vuex](https://vuex.vuejs.org/zh/guide/)
- [pinia](https://pinia.vuejs.org/introduction.html)
- [pinia 中文](https://pinia.web3doc.top/introduction.html)

## MVC & MVVM & 响应式 & 双向数据绑定

- MVVM 的概念是从后端的 MVC 的概念演化而来
- MVC: M(model)-V(view)-C(controller) 典型的指令式编程
- MVVM: M(model)-V(view)-VM(ViewModel) 响应式编程, 数据改变会自动修改视图, 视图数据修改 model 中的数据也会自动修改(也就是`双向绑定`)

![mvvm.png](https://raw.githubusercontent.com/liaohui5/images/main/images/202206081605132.png)

注: Vue.js 并没有完全遵守 MVVM 模型,只能说非常相似([官方文档](https://cn.vuejs.org/v2/guide/instance.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA-Vue-%E5%AE%9E%E4%BE%8B))

## 渐进式框架

所谓的渐进式就是一开始不需要理解很多的概念, 可以快速上手, 而且有中文文档, 当你需要对应功能的时候可以去官网找到想要的库, 然后学习
比如 vue-router vuex 等...

## 组件化

所谓组件化就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在 Vue 中每一个.vue 文件都可以视为一个组件

![components.png](https://raw.githubusercontent.com/liaohui5/images/main/images/202206081559023.png)

组件化的优势:

1. 降低耦合
1. 利于维护&调试
1. 高度复用
