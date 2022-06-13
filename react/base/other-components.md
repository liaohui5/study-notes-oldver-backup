## portals

- [文档](https://react.docschina.org/docs/portals.html)

默认情况下, 所有的组件都会渲染到 `#root` 这个容器中, 但是有一些特殊的组件, 需要直接渲染到 `body` 中或者其他位置, 就需要用到 `portals`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React</title>
  </head>
  <body>
    <div id="root"></div>
    <div id="modal-container"></div>
  </body>
</html>
```

```jsx
import React from "react";
import { createPortal } from "react-dom";

const Modal = React.memo((props) => {
  // createPortal: 接收两个参数
  // 1. 需要渲染的内容
  // 2. 渲染到哪个元素中
  return createPortal(props.children, document.querySelector("#modal-wrapper"));
});

class App extends React.Component {
  render() {
    return (
      <div>
        <Modal>这是弹窗内容, 渲染到 #modal-container 这个元素中</Modal>
      </div>
    );
  }
}

export default App;
```

## Fragment

- [文档](https://react.docschina.org/docs/fragments.html)

默认情况下, `render` 函数都只能返回一个元素且会生成真实的 dom, 不管是否有必要,
但是有了 `fragment` 就能用这个组件替换根节点, 避免生成不需要的节点元素

```jsx
import React from "react";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* React.Fragment 不会生成真实的 dom 元素 */}
        <p>这是中间的内容1</p>
        <p>这是中间的内容2</p>
        <p>这是中间的内容3</p>
      </React.Fragment>
    );
  }
}

export default App;
```

渲染结果如下:

![react-fragment](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131702681.png)
