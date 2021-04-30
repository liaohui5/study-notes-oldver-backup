## 入口文件

在准备过程中, 已经通过 sourcemap 找到了真实的程序入口: `src/core/instance/index.js`

## 定义构造函数 - Vue

```js
import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

/**
 * 入口文件, 定义构造函数 Vue
 * @param {*} options
 */
function Vue(options) {
  // Vue 函数必须使用 new Vue() 来使用而不能直接 Vue()来调用, 如果是开发环境就打印一个警告
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }

  // 初始化: 这个方法定义在 core/instance/init.js 中
  // initMixin() 中会向构造函数的原型链上添加这个方法
  // Vue.prototype._init = function () {...}
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
```

## 初始化 - Vue.prototype.init

> 这个方法定义在 `src/core/instance/init.js` 中

```js
/**
 * 初始化: 这个方法在入口文件中调用的
 * @param {*} Vue 构造函数
 */
export function initMixin(Vue: Class<Component>) {
  // 初始化方法: 负责 Vue 的初始化过程
  Vue.prototype._init = function (options?: Object) {
    // vm: Vue 构造函数的实例对象
    const vm: Component = this;

    // 每个 Vue 实例都有一个 Uid 属性, 并且是依次递增的
    vm._uid = uid++;

    let startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== "production" && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`;
      endTag = `vue-perf-end:${vm._uid}`;
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;

    // 处理 options
    if (options && options._isComponent) {
      /**
       * 每个子组件初始化时走这里，这里只做了一些性能优化
       * 将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率
       */
      initInternalComponent(vm, options);
    } else {
      /**
       * 初始化根组件时(new Vue式)走这里，合并 Vue 的全局配置到根组件的局部配置，
       * 比如 Vue.component 注册的全局组件会合并到 根实例的 components 选项中
       * 至于每个子组件的选项合并则发生在两个地方：
       *   1、Vue.component 方法注册的全局组件在注册时做了选项合并
       *   2、{ components: { xx } } 方式注册的局部组件在执行编译器生成的 render 函数时做了选项合并，包括根组件中的 components 配置
       */
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== "production") {
      // 设置代理，将 vm 实例上的属性代理到 vm._renderProxy
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;

    // 初始化组件实例关系属性，比如 $parent、$children、$root、$refs 等
    initLifecycle(vm);

    //  初始化自定义事件，这里需要注意一点，所以我们在 <comp @click="handleClick" /> 上注册的事件，监听者不是父组件，
    // 而是子组件本身，也就是说事件的派发和监听者都是子组件本身，和父组件无关
    initEvents(vm);

    // 解析组件的插槽信息，得到 vm.$slot，处理渲染函数，得到 vm.$createElement 方法，即 h 函数
    initRender(vm);

    // 调用 beforeCreate 钩子函数
    callHook(vm, "beforeCreate");

    // 初始化组件的 inject 配置项，得到 result[key] = val 形式的配置对象，然后对结果数据进行响应式处理，并代理每个 key 到 vm 实例
    initInjections(vm);

    // !!数据响应式的重点: 处理 props、methods、data、computed、watch
    initState(vm);

    // 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上
    initProvide(vm);

    // 调用 created 钩子函数
    callHook(vm, "created");

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== "production" && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(`vue ${vm._name} init`, startTag, endTag);
    }

    // 如果发现配置项上有 el 选项，则自动调用 $mount 方法，
    // 也就是说有了 el 选项, 就不需要再手动调用 $mount
    // 反之，没有 el 则必须手动调用 $mount => new Vue().$mount()
    // 这个方法定义在: platforms/web/entry-runtim-with-compiler.js 这个文件中
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
```

### 处理 new Vue 时传的参数 options -

> 这个方法定义在 `src/core/instance/init.js` 中

```js
export function resolveConstructorOptions(Ctor: Class<Component>) {
  let options = Ctor.options;
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super);
    const cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
```
