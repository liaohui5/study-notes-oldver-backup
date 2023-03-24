## vue2 和 vue3 响应式有什么不同?

从实现上来说, vue2 主要用的是 `Object.defineProperty` 这个 API 来定义 getter 和 setter 来实现数据的劫持

而, vue3 主要使用 `Proxy + Reflect` 来实现数据的劫持

## 什么是 effect ?

effect 是 vue 响应式的核心, 是收集依赖的触发入口, 一般都是这样的使用 `effect` API

```javascript
const data = reactive({ age: 10 });

const render = () => {
  document.body.textContent = data.age;
};

// 初次执行会执行 render 一次, 当数据变化会再次执行 render
effect(render);

// 模拟数据变化
setTimeout(() => {
  data.age = 20;
}, 1000);
```

由上面代码可以看到, effect 并没有直接的去操作 `data` 那么他如何实现响应式最终的呢?

1. 如何收集依赖的?
2. 何时收集依赖, 何时触发依赖更新的
3. 所谓的依赖是什么?

![effect](https://raw.githubusercontent.com/liaohui5/images/main/images/202303241556043.png)

```javascript
/*
const data1 = reactive({ id: 1, age: 2 })
const data2 = reactive({ name: 'tom', email: 'email@qq.com' })

                    ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓

收集依赖后的结构如下:
targetMap {
  [ data1 ] = effectMap {
    [ id ] = depSet [ reactiveEffect1, reactiveEffect2 ...],
    [ age ] = depSet [ reactiveEffect1, reactiveEffect2 ...]
  },
  [ data2 ] = effectMap {
    [ name ] = depSet [ reactiveEffect1, reactiveEffect2 ...],
    [ email ] = depSet [ reactiveEffect1, reactiveEffect2 ...]
  }
}

targetMap: 存储所有依赖的容器
  effectMap: 某个代理对象(reactive/ref/computed)的 target 
    depSet: 某个对象的 key 对应的所有 "依赖" (就是一些对象)
reactiveEffect: 响应式依赖对象(暂且叫这个吧), 这个对象保存了 effect 执行时传入的方法(暂且叫: effectCB)

reactive 执行时: 会 new Proxy, 并且设置get/set, 在 get 中收集依赖, 在 set 中触发依赖执行更新
effect 执行时: 会实例化一个"响应式依赖对象", 保存传入 effectCB 到这个对象上

收集依赖: 用 target 和 key 去构建上面的 targetMap 结构
触发依赖: 用 target 和 key 去 targetMap 中获取对应的 depSet 然后遍历执行
*/
```

- 所谓的依赖收集: 就是将一些 "响应式依赖对象" 放到依赖管理容器中
- 所谓的触发依赖: 就是将 "响应式依赖对象" 拿出来执行 effectCB 方法

## reactive 如何实现的

```javascript
function reactive(raw) {
  if (isObject(raw)) {
    cnosole.log('必须传入对象');
    return;
  }
  return new Proxy(raw, {
    get(target, key, recevier) {
      // 收集依赖: track(target, key)
      return Reflect.get(target, key, recevier);
    },
    set(target, key, value, recevier) {
      // 触发依赖执行: trigger(target, key)
      return Reflect.set(target, key, value, recevier);
    },
  });
}
```

## readonly 是如何实现的?

这个就简单了, 以上所知, 要在 proxy 的 getter 中收集依赖, 那么只要是 readonly, 在 getter 中就不收集依赖, 在 setter 中不修改值就可以了

## 什么是 ref

> ref 是 reference 的缩写, 看名字就知道, 他会让值强制性的变成一个引用值

`ref` 也是和 `reactive` 一样的, 让数据具有响应式的效果

但不同的是: `ref` 可以让非引用值具有响应式的特性

```javascript
const data1 = reactive(1); // 报错, 必须是对象才可以
const data2 = ref(1); // 任意的值都可以
```

### 有了 reactive 为什么还要有 ref ?

从本质上来说 `ref` 是 `reactive` 封装的 标准的/规范的 语法糖 [源码为证](https://github.com/vuejs/core/blob/4c9bfd2b999ce472f7481aae4f9dc5bb9f76628e/packages/reactivity/src/ref.ts#L115)

```javascript
const data1 = reactive({ value: 1 });
const data2 = ref(1);
// 这两个API效果使用起来是一样的, 都具有响应式
```

## computed

简单的理解, 具有缓存和计算功能的的响应式对象, 只有依赖的数据发生改变才会再次执行计算

```javascript
const r1 = ref(1);
const r2 = ref(2);

const computedRef = computed(() => {
  // 复杂的计算: 各种判断, 各种计算, 只有当依赖的
  // 响应式数据(r1,r2)改变时才会再次执行这个计算的函数
  return r1.value + r2.value;
});
```

