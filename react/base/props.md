## Props

```jsx
import React from "react";

class Child extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p>Child组件通过props获取ID:{this.props.id}</p>
        <p>Child组件通过props获取name:{this.props.getName()}</p>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    id: 1001,
    name: "Tom adn Jerry",
  };
  render() {
    return (
      <div>
        {/* 传递属性或者方法让子组件使用 */}
        <Child id={this.state.id} getName={this.getName.bind(this)} />
      </div>
    );
  }

  getName() {
    return this.state.name;
  }
}

export default App;
```

## Context: Provider + Consumer

```jsx
import React from "react";

// 创建 context
const { Provider, Consumer } = React.createContext({});

class Son extends React.Component {
  render() {
    return (
      <Consumer>
        {
          // 同样, 在孙子组件中也能获取到provider 的 value
          (value) => {
            return (
              <div>
                <p>son组件中获取的name属性:{value.name}</p>
              </div>
            );
          }
        }
      </Consumer>
    );
  }
}

class Child extends React.Component {
  render() {
    return (
      <Consumer>
        {
          // 这个回调会被 Consumer 自动执行
          (value) => {
            return (
              <div>
                <p>child组件, 获取的ID是: {value.id}</p>
                <Son />
              </div>
            );
          }
        }
      </Consumer>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        {/* 使用 perovider 包裹所有的后代组件, 并且提供一个数据给 Consumer 来使用  */}
        <Provider value={{ name: "Tom and Jerry", id: 1001 }}>
          <div>app</div>
          <Child />
        </Provider>
      </div>
    );
  }
}

export default App;
```

## Context: ContextType

```jsx
import React from "react";

const ctx = React.createContext({
  name: "Tom and Jerry",
  id: 1001,
  cn_name: "猫和老鼠",
});

class Son extends React.Component {
  render() {
    return (
      <div>
        <p>son组件获取的 cn_name: {this.context.cn_name}</p>
      </div>
    );
  }
}

Son.contextType = ctx;

class Child extends React.Component {
  render() {
    return (
      <div>
        <p>child组件获取的name: {this.context.name}</p>
        <Son />
      </div>
    );
  }
}

Child.contextType = ctx;

class App extends React.Component {
  render() {
    return (
      <div>
        <div>app组件中获取ID: {this.context.id}</div>
        <Child />
      </div>
    );
  }
}

App.contextType = ctx;

export default App;
```
