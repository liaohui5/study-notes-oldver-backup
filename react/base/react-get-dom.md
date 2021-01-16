## 获取 dom

> 虽然可以使用原生的 API 获取 dom 元素, 但是不推荐
>
> 可以使用以下两种方式来获取 dom

```jsx
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.p1 = React.createRef();
  }
  render() {
    return (
      <div>
        <p ref={this.p1}>第一种方式: 通过 createRef 获取 dom</p>
        <p ref={(args) => (this.p2 = args)}>第二种方式: 通过回调函数获取 dom</p>
        <button onClick={() => this.getEle()}>获取元素</button>
      </div>
    );
  }

  getEle() {
    console.info(this.p1.current);
    console.info(this.p2);
  }
}

export default App;
```

## 使用 ref 的注意点

- 函数式组件默认不能使用 ref, 只有通过 `React.forwardRef()` 这个组件创建的才能使用`ref`
- 原生的 dom 节点使用 ref 获取的是 元素本身
- 类组件的使用 ref 获取的是, 类的实例

```jsx
import React from "react";

class Home extends React.Component {
  render() {
    return <div>home</div>;
  }
}

function About() {
  return <div>about</div>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.pRef = React.createRef();
    this.homeRef = React.createRef();
    this.aboutRef = React.createRef();
  }

  render() {
    return (
      <div>
        <p ref={this.pRef}>app</p>
        <Home ref={this.homeRef} />
        {/* <About ref={this.aboutRef} /> */}
        <button onClick={() => this.getEle()}>获取ref</button>
      </div>
    );
  }

  getEle() {
    console.info("原生dom的ref:", this.pRef);
    console.info("类组件的ref:", this.homeRef);
    // console.info("函数式组件的ref:", this.aboutRef);
  }
}

export default App;
```
