## use-effect 功能介绍

```jsx
useEffect(() => {
  // componentDidMount && componentDidUpdate
  console.log("组件挂载成功或者状态变化执行这个 callback");

  return () => {
    // componentWillUnmount
    consle.log("组件卸载之前将执行这个 callback");
  };
});
```

## 监听某个状态变化执行

默认情况下只要任何状态发生改变就会执行 `callback`, 但是有些时候我们只需要监听某一个状态发生改变才执行, 就需要用到第二个参数

```jsx
const [name, setName] = useState("tom");
const [age, setAge] = setState(10);
useEffect(callbackFunc, [age]); // 此时只有age发生改变时,才会执行 callbackFunc
```

## 多个 useEffect 会覆盖吗?

- 不会

```jsx
import React, { useState, useEffect } from "react";

const Demo = () => {
  useEffect(() => {
    console.info("组件挂载111");
    return () => {
      console.info("组件卸载111");
    };
  });

  useEffect(() => {
    console.info("组件挂载222");
    return () => {
      console.info("组件卸载222");
    };
  });

  return <div>demo</div>;
};

const App = () => {
  const [showDemo, setShowDemo] = useState(true);

  return (
    <div>
      {showDemo ? <Demo /> : null}
      <div>
        <button onClick={() => setShowDemo(false)}>hide</button>
      </div>
    </div>
  );
};

export default App;
```
