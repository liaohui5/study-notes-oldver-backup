> 什么是 useRef

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
