## 渲染

```jsx
import { render } from "react-dom";

const App = <div>app</div>;

render(App, document.querySelector("#root"));
```

## jsx 绑定属性

```jsx
// - 绑定不会改变的值
const app = <div name="app">app</div>;

// 绑定会改变的值 {}
const name = Math.random();
const app = <div name={name}>app</div>;

// 绑定对象
const infos = { id: 101, name: "Tom" };
const app = <div infos={infos}>app</div>;
const app = <div infos={{ id: 101, name: "Tom" }}>app</div>;

// 绑定事件监听
const btnClick = () => console.log("clicked");
const app = <div onClick={() => btnClick}>app</div>;
```

## jsx 行内样式

```jsx
// 注意:横划线需要转换为驼峰写法 border-left -> borderLeft
const app = <div style={{ width:"200px", height:200px; borderLeft: "1px solid #eee" }}>app</div>;
```

## 绑定类名

[推荐使用类库 classnames](https://github.com/JedWatson/classnames)

!> 由于 `class` 是 js 的关键字, 所以绑定类名必须要要用 `className`

```jsx
const app = <div className="hello-cls">app</div>;
```

## 类组件

使用 `create-react-app` 创建的项目, 默认就是使用的类组件

```jsx
//-- App.jsx

import React from "react";

class App extends React.Component {
  // 必须要有 render 方法
  render() {
    return <div>App</div>;
  }
}

export default App;
```

## 列表渲染

!> 列表渲染时为了优化性能, 必须绑定 key 属性, 并且值唯一

```jsx
import React, { Component } from "react";

export default class App extends Component {
  state = {
    list: [
      { id: 101, name: "Alex" },
      { id: 102, name: "Tom" },
      { id: 103, name: "Jerry" },
    ],
  };

  render() {
    const listNodes = this.state.list.map((item) => {
      // 为了优化性能, 必须绑定 key 属性, 并且值唯一
      return <li key={item.id}>{item.name}</li>;
    });

    return (
      <div>
        <ul>{listNodes}</ul>
      </div>
    );
  }
}
```
