## 什么是高阶组件?

- [在线文档](https://reactjs.bootcss.com/docs/higher-order-components.html)

所谓高阶组件就是: 参数为组件，返回值为新的组件的函数

```js
const connectedComponent = connect(SomeComponent);
```

## 高阶组件应用 - 抽离相同的代码

> 优化前的代码

```jsx
import React from "react";

const UserCtx = React.createContext();

const Child = React.memo((props) => {
  return (
    <div>
      <ul>
        <li>id: {props.id}</li>
        <li>username: {props.username}</li>
        <li>email: {props.email}</li>
      </ul>
    </div>
  );
});

const Parent1 = React.memo(() => {
  return (
    <div className="some-styles">
      <p>这是parent1, 这是很多其他代码...</p>
      <UserCtx.Consumer>{(user) => <Child {...user} />}</UserCtx.Consumer>
    </div>
  );
});

const Parent2 = React.memo(() => {
  return (
    <div className="some-styles">
      <p>这是parent2, 这是很多其他代码...</p>
      <UserCtx.Consumer>{(user) => <Child {...user} />}</UserCtx.Consumer>
    </div>
  );
});

const Parent3 = React.memo(() => {
  return (
    <div className="some-styles">
      <p>这是parent3, 这是很多其他代码...</p>
      <UserCtx.Consumer>{(user) => <Child {...user} />}</UserCtx.Consumer>
    </div>
  );
});

class App extends React.PureComponent {
  render() {
    const user = {
      id: 1001,
      username: "tom",
      email: "tom@qq.com",
    };

    return (
      <div>
        <UserCtx.Provider value={user}>
          <Parent1 />
          <Parent2 />
          <Parent3 />
        </UserCtx.Provider>
      </div>
    );
  }
}

export default App;
```

以上代码可知, parent1, parent2, parent3 3 个组件的代码的整体结构是差不多的, 只是中间的代码不同

> 抽离公共代码后的代码

```jsx
import React from "react";

const UserCtx = React.createContext();

const Child = React.memo((props) => {
  return (
    <div>
      <ul>
        <li>id: {props.id}</li>
        <li>username: {props.username}</li>
        <li>email: {props.email}</li>
      </ul>
    </div>
  );
});

const BaseParent = (OtherComponent) => {
  return React.memo((props) => {
    return (
      {/* 有公共的样式 */}
      <div className="some-styles">
        <OtherComponent {...props}/>
        {/* 有公共的子组件 */}
        <UserCtx.Consumer>{(user) => <Child {...user} />}</UserCtx.Consumer>
      </div>
    );
  });
};

let Parent1 = React.memo(() => {
  return <p>这是parent1, 这是很多其他代码...</p>;
});
Parent1 = BaseParent(Parent1);

let Parent2 = React.memo(() => {
  return <p>这是parent2, 这是很多其他代码...</p>;
});
Parent2 = BaseParent(Parent2);

let Parent3 = React.memo(() => {
  return <p>这是parent3, 这是很多其他代码...</p>;
});
Parent3 = BaseParent(Parent3);

class App extends React.PureComponent {
  render() {
    const user = {
      id: 1001,
      username: "tom",
      email: "tom@qq.com",
    };

    return (
      <div>
        <UserCtx.Provider value={user}>
          <Parent1 />
          <Parent2 />
          <Parent3 />
        </UserCtx.Provider>
      </div>
    );
  }
}

export default App;
```

由上面的代码可知, 高阶组件就是一个中间组件, 其实高阶组件还可以做更多的事情, 比如 `拦截组件生命周期` `拦截组件的 props`,
因为 React 的渲染机制就是, `先渲染父组件再渲染子组件` 那也就是说, 可以在高阶组件中将 props 处理好之后,
再将这个经过处理的 props 传递给子组件
