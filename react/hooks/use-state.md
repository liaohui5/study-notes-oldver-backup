## 基本使用

```jsx
import React, { useState } from "react";

const App = () => {
  // 同一个函数式组件中, 可以多次使用 useState 这个 hook
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  return (
    <div>
      <div>
        <p>count: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <button onClick={() => setCount(count - 1)}>减少</button>
      </div>
    </div>
  );
};

export default App;
```

## hooks 设置 state 的方法是否是异步?

这个设置 state 的方法本质上是用的 setState 来实现的, 所以和 [setState 特性](http://localhost:3000/#/react/base/jsx?id=setstate-%e6%98%af%e5%90%8c%e6%ad%a5%e8%bf%98%e6%98%af%e5%bc%82%e6%ad%a5)一致
