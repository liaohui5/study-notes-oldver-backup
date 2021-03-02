## 为什么要自定义 React-hooks

因为 react-hooks 只能用在函数式组件中, 但是有时候, 很多组件都需要做同一个操作, 使用 react-hooks 就会有很多重复的代码
但是 react-hooks 又不能在普通函数中使用, 没法封装... 所以就需要自定义 react-hooks

```jsx
import React from "react";

const UserCtx = React.createContext();
const InfoCtx = React.createContext();

const Home = () => {
  const user = React.useContext(UserCtx);
  const info = React.useContext(InfoCtx);
  const data = { ...user, ...info };
  return (
    <div>
      <p>id: {data.id}</p>
      <p>email:{data.email}</p>
    </div>
  );
};

const About = () => {
  const user = React.useContext(UserCtx);
  const info = React.useContext(InfoCtx);
  const data = { ...user, ...info };

  return (
    <div>
      <p>name: {data.name}</p>
      <p>github:{data.github}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <UserCtx.Provider value={{ id: 1001, name: "tom" }}>
        <InfoCtx.Provider
          value={{ email: "xxx@qq.com", github: "https://github.com/xxx" }}
        >
          <Home />
          <About />
        </InfoCtx.Provider>
      </UserCtx.Provider>
    </div>
  );
};

export default App;
```

## 使用自定义 hook 优化代码

- 自定义一个函数, 并且以 `use` 作为前缀就能在这个函数中使用 React-Hooks

```jsx
import React from "react";

const UserCtx = React.createContext();
const InfoCtx = React.createContext();

const useGetContextData = () => {
  const user = React.useContext(UserCtx);
  const info = React.useContext(InfoCtx);
  return { ...user, ...info };
};

const Home = () => {
  const data = useGetContextData();
  return (
    <div>
      <p>id: {data.id}</p>
      <p>email:{data.email}</p>
    </div>
  );
};

const About = () => {
  const data = useGetContextData();

  return (
    <div>
      <p>name: {data.name}</p>
      <p>github:{data.github}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <UserCtx.Provider value={{ id: 1001, name: "tom" }}>
        <InfoCtx.Provider
          value={{ email: "xxx@qq.com", github: "https://github.com/xxx" }}
        >
          <Home />
          <About />
        </InfoCtx.Provider>
      </UserCtx.Provider>
    </div>
  );
};

export default App;
```
