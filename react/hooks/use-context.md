## 回顾类组件中使用 Context
- [类组件使用 Context](/react/base/props?id=context-provider-consumer)

## 基本使用
简单而言,useContenxt 就是可以把 Provider 中提供的数据直接获取到

```jsx
import React, { useContext } from "react";

const UserCtx = React.createContext();

const Home = () => {
  // 使用 react-hooks 的方式获取
  const user = useContext(UserCtx);
  return (
    <div>
      <p>home</p>
      <p>id: {user.id}</p>
      <p>username: {user.username}</p>
      
      {/* 使用 Consumer 的方式获取:
        <UserCtx.Consumer>
        {(user) => {
          return (
            <div>
              <p>id: {user.id}</p>
              <p>username: {user.username}</p>
            </div>
          );
        }}
      </UserCtx.Consumer> */}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <p>app</p>
      <UserCtx.Provider value={{ id: 101, username: "tom" }}>
        <Home />
      </UserCtx.Provider>
    </div>
  );
};

export default App;
```


