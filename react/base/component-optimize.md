## 优化前的代码

默认情况下, react 在修改父组件的 state 时, 子组件无论是否有变化, 都会重新渲染, 这就不合理

```jsx
import React from "react";

class Child extends React.Component {
  render() {
    console.info("Child 组件渲染了");
    return <div>子组件: {this.props.age}</div>;
  }
}

class App extends React.Component {
  state = {
    name: "app",
    age: 10,
  };

  render() {
    console.info("App 组件渲染了");
    return (
      <div>
        <div>
          <p>{this.state.name} </p>
          <button onClick={() => this.setName()}>修改不影响子组件的数据</button>
        </div>
        <div>
          <p>{this.state.age}</p>
          <button onClick={() => this.setAge()}>修改会影响子组件的数据</button>
        </div>

        <Child age={this.state.age} />
      </div>
    );
  }

  setName() {
    this.setState({
      name: "name被修改了",
    });
  }

  setAge() {
    this.setState({
      age: 20,
    });
  }
}

export default App;
```

!> 上面代码执行和测试结果可知, 修改父组件 state 是, 无论是否影响子组件, 子组件都会被重新渲染

## 使用 shouldComponentUpdate 优化

- 使用这种方法优化的缺点就是, 需要自己去判断每个状态是否改变

```jsx
class Child extends React.Component {
  // 该方法有3个参数:
  // 1. nextProps: 最新的props数据 2. nextState:最新的state数据 3.nextCxt: 最新的 Context 数据
  // 该方法必须返回一个 bool 值:
  // 如果返回 true 表示需要重新渲染, false 则不需要重新渲染
  shouldComponentUpdate(nextProps, nextState, nextCxt) {
    // 如果当前的 props 和最新的 props 不一致, 就更新组件
    return this.props.age !== nextProps.age;
  }

  render() {
    console.info("Child 组件渲染了");
    return <div>子组件: {this.props.age}</div>;
  }
}
```

## 使用 PureComponent 优化(推荐)

- 这个组件是基于 `shouldComponentUpdate` 实现的, 但是好处就是, 不需要自己控制状态是否更新

```jsx
class Child extends React.PureComponent {
  render() {
    console.info("Child 组件渲染了");
    return <div>子组件: {this.props.age}</div>;
  }
}
```

## 优化注意点

!> 不要直接修改 state 的值, 直接修改 state 的值, 会让 `shouldComponentUpdate` 传递的参数不正确, 无法正确的判断

```jsx
class App extends React.PureComponent {
  state = {
    age: 10,
  };

  render() {
    console.info("App 组件渲染了");
    return (
      <div>
        <div>
          <p>{this.state.age}</p>
          <button onClick={() => this.setAge()}>修改会影响子组件的数据</button>
        </div>
      </div>
    );
  }

  setName() {
    this.setState({
      name: "name被修改了",
    });
  }

  setAge() {
    // 正确的写法: this.setState({age: 20});
    // 如果组件继承的是 PureComponent, 这样是无法修改的状态的
    this.state.age += 10;
    this.setState(this.state);
  }
}
```

## 优化函数式组件

不管是通过 `shouldComponentUpdate` 的方式, 还是通过 `PureComponent` 都是无法优化 `函数式组件` 的,
要想优化函数函数式组件, 就必须使用 `memo`

```jsx
import React from "react";

// 位优化前的写法:
// function Child(props) {
//   console.info("Child 组件渲染了");
//   return <div>子组件: {props.age}</div>;
// }

const Child = React.memo((props) => {
  console.info("Child 组件渲染了");
  return <div>子组件: {props.age}</div>;
});

class App extends React.Component {
  state = {
    name: "app",
    age: 10,
  };

  render() {
    console.info("App 组件渲染了");
    return (
      <div>
        <div>
          <p>{this.state.name} </p>
          <button onClick={() => this.setName()}>修改不影响子组件的数据</button>
        </div>
        <div>
          <p>{this.state.age}</p>
          <button onClick={() => this.setAge()}>修改会影响子组件的数据</button>
        </div>

        <Child age={this.state.age} />
      </div>
    );
  }

  setName() {
    this.setState({
      name: "name被修改了",
    });
  }

  setAge() {
    this.setState({
      age: 20,
    });
  }
}

export default App;
```
