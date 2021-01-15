### 原生 css 动画

顾名思义就是自己手写 css 动画, 这里结合了 `styled-components`

```jsx
import React from "react";
import styled from "styled-components";

const HomeWrapper = styled.div`
  .box {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    opacity: ${(props) => props.opacity};
    background: skyblue;
    transition: all 1s linear;
  }
`;

class App extends React.PureComponent {
  state = {
    width: 0,
    height: 0,
    opacity: 0,
  };
  render() {
    return (
      <HomeWrapper {...this.state}>
        <div className="box">原生css动画</div>
        <button onClick={() => this.show()}>显示</button>
        <button onClick={() => this.hide()}>隐藏</button>
      </HomeWrapper>
    );
  }

  // 显示
  show() {
    this.setState({
      width: "300px",
      height: "300px",
      opacity: 1,
    });
  }

  // 隐藏
  hide() {
    this.setState({
      width: 0,
      height: 0,
      opacity: 0,
    });
  }
}

export default App;
```

### 动画组件

- [react-transition-group](http://reactcommunity.org/react-transition-group/)

- 安装

```shell
npm i react-transition-group
# or
yarn add react-transition-group
```

- 使用组件

```css
/* src/app.css 定义组件需要的动画类 */
.box-enter {
  /* 进入动画执行之前的初始化状态 */
  width: 0;
  height: 0;
  opacity: 0;
  background-color: skyblue;
}

.box-enter-active {
  /* 进入动画执行过程中的状态 */
  width: 300px;
  height: 300px;
  opacity: 1;
  transition: all 1s linear;
}

.box-exit {
  /* 退出动画执行过程中的状态 */
  width: 0;
  height: 0;
  opacity: 0;
  background: red;
  transition: all 1s linear;
}
```

```jsx
// src/app.jsx
import React from "react";
import { CSSTransition } from "react-transition-group";
import "./app.css";

class App extends React.PureComponent {
  state = {
    show: false,
  };

  render() {
    return (
      <div>
        {/*
          CSSTransition:
            in<Boolean>: true 触发进入动画, false触发退出动画
            classNames<String>: 指定动画类名的前缀
            timeout<int>: 指定动画超时时间, 只能大于等于 -enter-active 中指定的时间
        */}
        <CSSTransition classNames={"box"} in={this.state.show} timeout={3000}>
          <div></div>
        </CSSTransition>
        <button onClick={() => this.toggle(true)}>显示</button>
        <button onClick={() => this.toggle(false)}>隐藏</button>
      </div>
    );
  }

  // 切换显示/隐藏
  toggle(show) {
    this.setState({ show });
  }
}

export default App;
```
