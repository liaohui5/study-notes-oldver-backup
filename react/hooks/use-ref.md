## 什么是 useRef

简单来说就是和 React.createRef() 功能差不多的 hook, [回顾](/react/base/react-get-dom), 但是不同的是, useRef 可以存储自定义数据, 但是 createRef 不能存储自定义数据

```jsx
import React from "react";

class Home extends React.Component {
  render() {
    return <div>home</div>;
  }
}

const App = () => {
  const divRef = React.createRef();
  const pRef = React.useRef();
  const homeRef = React.useRef();
  const numRef = React.useRef(0); // 只有 useRef 可以存储自定义数据, createRef 不能

  const getRefs = () => {
    console.log("divRef: ", divRef.current); // dom 元素
    console.log("pRef: ", pRef.current); // dom 元素
    console.log("homeRef: ", homeRef.current); // Home instance
    console.log("numRef: ", numRef.current); // number
  };

  return (
    <div>
      <div ref={divRef}>div</div>
      <p ref={pRef}>p</p>
      <Home ref={homeRef} />
      <div>
        <button onClick={() => getRefs()}>获取Ref</button>
      </div>
    </div>
  );
};

export default App;
```

## 什么是 useImperativeHandle
默认情况下, 只要通过 ref 获取dom元素, 就能直接执行所有操作, 使用 useImperativeHandle 就能够限制外界的操作


```jsx
import React from "react";

const Home = React.forwardRef((props, appRef) => {
  const inputRef = React.useRef();

  // useImperativeHandle 的功能就是控制函数式组件 ref 的权限
  // 这个 useImperativeHandle 的第二个参数(函数)返回什么就只能操作什么
  // 比如只能输入数字类型的值

  // 注意: inputRef 是 Home组件中的 使用useRef 创建的, 而且
  // input 标签引用的是 inputRef, 而不是外部传递的 appRef
  // useImperativeHandle 的功能是劫持 appRef 然后在内部操作
  // inputRef 来实现对应的功能
  React.useImperativeHandle(appRef, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      setValue(val) {
        const reg = /^\d+$/;
        if (reg.test(val)) {
          inputRef.current.value = val;
        }
      },
    };
  });

  // 控制手动输入
  const [num, setNum] = React.useState(0);
  const inputChange = (val) => /^\d{0,}$/.test(val) && setNum(val);
  return (
    <div>
      <input type="text" ref={inputRef} value={num} onChange={(e) => inputChange(e.target.value)} />
    </div>
  );
});

const App = () => {
  const appRef = React.useRef();
  const getRef = () => {
    // 获取焦点:
    appRef.current.focus();

    // 控制程序直接设置值
    appRef.current.setValue(123);
  };

  return (
    <div>
      <Home ref={appRef} />
      <button onClick={() => getRef()}>获取ref</button>
    </div>
  );
};

export default App;

```
