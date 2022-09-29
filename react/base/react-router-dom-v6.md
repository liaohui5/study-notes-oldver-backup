### 文档信息

- [官方文档](https://reactrouter.com/en/main/start/overview)
- [官方示例](https://reactrouter.com/en/main/start/examples)

### 快速开始

#### API 风格路由(推荐)

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createHashRouter,
  Link,
  Outlet,
} from "react-router-dom";

// --- components
const App = () => {
  return (
    <div>
      <div className="nav-links">
        <Link to="/">home</Link>
        <span> | </span>
        <Link to="/about">about</Link>
      </div>
      <div className="main-conetnt">
        {/* <!-- useOutlet() --> */}
        <Outlet />
      </div>
    </div>
  );
};
const Home = () => <div>home page</div>;
const About = () => <div>about</div>;

// --- router
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

// --- render
createRoot(document.querySelector("#app")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

#### 组件风格路由

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router, Link, Routes, Route } from "react-router-dom";

// --- components
const Home = () => <div>home page</div>;
const About = () => <div>about</div>;
const App = () => {
  return (
    <div>
      <div className="nav-links">
        <Link to="/">home</Link>
        <span> | </span>
        <Link to="/about">about</Link>
      </div>
      <div className="main-conetnt">
        <Routes>
          <Route path="/" element={<Home />} index={true} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

// --- render
createRoot(document.querySelector("#app")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
```

### API & Components & hooks

- [react-router online documention](https://reactrouter.com/en/6.4.1)

#### API

- [createHashRouter](https://reactrouter.com/en/6.4.1/routers/create-hash-router)
- [createBrowserRouter](https://reactrouter.com/en/6.4.1/routers/create-browser-router)
- [RouterProvider](https://reactrouter.com/en/6.4.1/routers/router-provider)

#### Router Components

- [HashRouter](https://reactrouter.com/en/6.4.1/router-components/hash-router)
- [BrowserRouter](https://reactrouter.com/en/6.4.1/router-components/browser-router)

#### Components

- [Link](https://reactrouter.com/en/6.4.1/components/link) 类似于 a 标签的功能但是做了其他额外处理
- [NavLink](https://reactrouter.com/en/6.4.1/components/nav-link) 功能非常类似 link,不同是可以检测当前 location 路径是否是组件绑定的 path
- [Navigate](https://reactrouter.com/en/6.4.1/components/navigate) 当组件渲染的时候自动跳到指定路径
- [Outlet](https://reactrouter.com/en/6.4.1/components/outlet) 类似 vue-router 的 router-view 的效果, 视图的出口
- [Routes(like Switch)](https://reactrouter.com/en/6.4.1/components/routes) 类似 react-router 5.x 中的 switch 组件的功能
- [Route](https://reactrouter.com/en/6.4.1/components/route) & [Route 属性选项](https://reactrouter.com/en/6.4.1/route/route) 用于指定路径对应的组件 `<Route element={<div>hello</div>} />`, 和 react-router 5.x 的 Route 功能是一样的

#### hooks

- [useLoaction](https://reactrouter.com/en/6.4.1/hooks/use-location) 获取 location 对象
- [useOutlet](https://reactrouter.com/en/6.4.1/hooks/use-outlet) 获取渲染的组件
- [useParams](https://reactrouter.com/en/6.4.1/hooks/use-params) 获取参数
- [useSearchParams](https://reactrouter.com/en/6.4.1/hooks/use-search-params) 获取 url 的 `query` 并解析为对象
- [useRoutes](https://reactrouter.com/en/6.4.1/hooks/use-routes) 渲染路由表

### 动态路由

```jsx
// router 定义参数路径
const router = createHashRouter([
  {
    path: "/about/:aboutId",
    element: <About />,
  },
]);

// 使用时: 拼接 path 路径
const aboutLink = (
  <Link to={"/about/" + Math.ceil(Math.random() * 10)}>about</Link>
);

// 获取参数, 如果是 ?a=b 可以用 useSearchParams()
const About = () => {
  const { aboutId } = useParams();
  return <div>hello: {aboutId}</div>;
};
```

### 编程式导航(手动跳转)

```jsx
const Home = () => {
  const navigate = useNavigate(); // return a function to switch routes
  return (
    <div>
      <div> home page </div>
      <div>
        <button onClick={() => navigate("/about/3")}>click</button>
      </div>
    </div>
  );
};
```

### 中间件

- [react-router-middleware-plus](https://github.com/justbecoder/react-router-middleware-plus)

这个插件比较轻量级, 代码很少也很好理解, 有不符合需求的地方, 可以直接自己修改

```jsx
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useRoutesWithMiddleware } from "react-router-middleware-plus";
import {
  HashRouter as Router,
  Link,
  useOutlet,
  useNavigate,
} from "react-router-dom";

// --- components
const App = () => {
  return (
    <div>
      <div className="nav-links">
        <Link to="/">home</Link>
        <span> | </span>
        <Link to="/about">about</Link>
      </div>
      <div className="main-conetnt">{useOutlet()}</div>
    </div>
  );
};
const Home = () => (
  <div>
    home page
    <div>
      <button onClick={() => window.localStorage.setItem("isLogin", true)}>
        模拟登录
      </button>
    </div>
    <div>
      <button onClick={() => window.localStorage.setItem("isLogin", "")}>
        退出登录
      </button>
    </div>
  </div>
);
const About = () => <div>about</div>;

// --- middleware
function checkLogin({ children }) {
  const isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      alert("请先登录");
      navigate("/");
    }
  }, [isLogin]);
  return isLogin ? children : null;
}

// --- router component like: useRoutes(routes)
function AppRouter() {
  const routes = [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
          middleware: [checkLogin], // 匹配到这时: 先执行中间件(验证登录)
        },
      ],
    },
  ];
  return useRoutesWithMiddleware(routes);
}

// --- render
createRoot(document.querySelector("#app")).render(
  <StrictMode>
    <Router>
      <AppRouter />
    </Router>
  </StrictMode>
);
```
