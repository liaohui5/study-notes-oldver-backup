## 什么是 useCallback

用于优化代码, 可以让对应的函数只有在依赖发生改变的时候才重新定义

```jsx
const handler = useCallback(() => {
  // callback codes...
}, [states]);
```

### 基本应用

```jsx
import React, { useCallback, memo, useState } from "react";

const HomeMemo = memo((props) => {
  console.info("Home 组件渲染了");
  return <button onClick={() => props.handler()}>增加 count</button>;
});

const AboutMemo = memo((props) => {
  console.info("About 组件渲染了");
  return <button onClick={() => props.handler()}>减少 num</button>;
});

const App = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(10);

  // 1. 不使用 useCallback:
  // const increment = () => setCount((count + 1));
  // const decrement = () => setNum(num - 1);

  // 2. 使用 useCallback: 只有对应的 state 发生变化的时候才会重新定义 callback
  const increment = useCallback(() => setCount(count + 1), [count]);
  const decrement = useCallback(() => setNum(num - 1), [num]);

  console.info("App 组件渲染了");
  return (
    <div>
      <p>count: {count}</p>
      <p>num: {num}</p>
      <HomeMemo handler={increment} />
      <AboutMemo handler={decrement} />
    </div>
  );
};

export default App;
```

> 运行结果

- 不使用 useCallback: 无论点击 `HomeMemo` 还是 `AboutMemo` 中的按钮, 3 个组件都会重新渲染
- 使用 useCallback: 点击 `HomeMemo` 只会重新渲染 `App 和 HemoMemo` 两个组件而 `AboutMemo` 不会重新渲染

### 代码执行流程分析

> 不使用 useCallback:

1. 3 个组件第一次渲染完成
2. 点击 `HomeMemo` 中的按钮去改变 `count` 这个 state
3. state 发生变化, `App` 重新渲染(相当于再次还行 App 这个函数)
4. 重新渲染 -> `再次 const 开辟内存空间` -> 重新定义 `incrment decrement` 函数(此次定义的和第一次渲染完成定义的不是同一个内存空间)
5. `increment decrement` 发生变化了, 所以, `HomeMemo 和 About` 都会重新渲染

> 使用 useCallback:

1. 3 个组件第一次渲染完成
2. 点击 `HomeMemo` 中的按钮去改变 `count` 这个 state
3. state 发生变化, `App` 重新渲染(相当于再次还行 App 这个函数)
4. 判断 `useCallback` 的第二个参数是否发生变化, 如果发生变化, 才会重新定义 `callback`
5. count 发生变化, 并不会影响到 `decrement` 函数, 所以 `App 和 HomeMemo` 会重新渲染, `AboutMemo` 不会重新渲染

## 什么是 useMemo

只有依赖的值(参数 2)发生变化了, 才会重新执行 callback(参数 1), useMemo 就是 useCallback 的底层实现

```jsx
function useCallback(fn, deps) {
  return useMemo(() => fn, deps);
}
```

## 使用 useMemo 改造 useCallback

```jsx
// const increment = useMemo(() => {
//   return () => setCount(count + 1);
// }, [count]);
const increment = useMemo(() => () => setCount(count + 1), [count]);
const decrement = useMemo(() => () => setNum(num - 1), [num]);
```

## useMemo 和 useCallback 的区别

useMemo 可以返回任何值, useCallback 只能返回一个函数

```jsx
const user = useMemo(() => {
  return { id: 1, name: "tom" };
}, []);

const handler = useCallback(() => {
  // codes..
}, []);
```
