## 什么是 useReducer

useReduer 并不是用来替代 redux 的, useReducer 是 useState 的一种替代方案, 可以更好的复用操作数据的逻辑代码

## 基本使用

```jsx
// state: 被处理的数据 dispatch: 触发 reducer 的函数
// reducer: 数据处理函数   initData: 初始数据
const [state, dispatch] = useReducer(reducer, initData);
```

- 使用实例

```jsx
import React, { useReducer } from "react";

// 处理函数
const counterReducer = (state, action) => {
  const { type, payload } = action;
  const counter = { count: state.count };
  switch (type) {
    case "increment":
      counter.count += payload;
      break;
    case "decrement":
      counter.count -= payload;
      break;
  }
  return { ...state, ...counter };
};

const Home = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  return (
    <div>
      <p>home</p>
      <p>count:{state.count}</p>
      <p>
        <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
          加5
        </button>
        <button onClick={() => dispatch({ type: "decrement", payload: 5 })}>
          减5
        </button>
      </p>
    </div>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>app</p>
      <p>count:{state.count}</p>
      <p>
        <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
          加1
        </button>
        <button onClick={() => dispatch({ type: "increment", payload: 2 })}>
          加2
        </button>
        <button onClick={() => dispatch({ type: "decrement", payload: 1 })}>
          减1
        </button>
        <button onClick={() => dispatch({ type: "decrement", payload: 2 })}>
          减2
        </button>
      </p>
      <hr />
      <Home />
    </div>
  );
};

export default App;
```
