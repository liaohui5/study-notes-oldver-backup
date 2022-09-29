### 文档信息

- [官方文档](https://reactrouter.com/web/guides/quick-start)
- [中文文档](http://react-guide.github.io/react-router-cn/docs/Introduction.html)

### 快速开始

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Home = () => <div>home</div>;
const About = () => <div>about</div>;
const Default = () => <div>default</div>;

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div id="app">
          {/* 页面导航 */}
          <Link to="/home">home</Link>
          <span>|</span>
          <Link to="/about">about</Link>

          {/* 内容展示 */}
          <Switch path="/">
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            {/* 不指定 path, 表示和所有的路径都匹配, 默认路由 */}
            <Route component={Default} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
```

### API

> BrowserRouter/HashRouter 路由器模式

- BrowserRouter: `history` 模式, 通过 url 来映射组件的关系
- HashRouter: `hash` 模式, 通过 hash 来映射组件的关系

> Route 路由定义

- 映射 路由地址 和 组件 的对应关系, 根据匹配到的地址来显示对应的组件

> Link 切换到路由地址

- 功能类似 a 标签, 但是做了额外的处理

> Switch 切换 Route

- 默认情况下, 会把符合条件的所有路由都展示处理, switch 表示只显示一个

> Redirect

- 重定向路由

## 嵌套路由

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

// 登录
const Login = () => <div>login</div>;

const Users = () => <div>用户管理</div>;
const Roles = () => <div>角色管理</div>;
const Permissions = () => <div>权限管理</div>;

// 后台首页
const Admin = (props) => {
  console.info(props);
  if (!props.isLogin) {
    // 没登录
    return <Redirect to="/login" />;
  }

  return (
    <div>
      {/* 二级路由不用 Router 来包裹 */}
      <Link to="/admin/users">用户管理</Link>
      <Link to="/admin/roles">角色管理</Link>
      <Link to="/admin/permissions">权限管理</Link>

      <Switch path="/admin">
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/roles" component={Roles} />
        <Route exact path="/admin/permissions" component={Permissions} />
      </Switch>
    </div>
  );
};

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div id="app">
          <Link to="/login">login</Link>
          <Link to="/admin">admin</Link>

          <Switch path="/">
            <Route exact path="/login" component={Login} />
            {/* 如果要使用嵌套路由不能使用精准匹配 exact */}
            {/* 如果想要给 路由对应的组件传值, 可以使用双标签的形式 */}
            <Route path="/admin">
              <Admin isLogin={true} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
```

## 编程式导航(手动跳转)

- 通过 `Route` 组件映射的组件, 会给这个组件注入以下几个 props 属性

  - history: 提供一些跳转的方法和路由历史信息
    - length: 历史总数
    - go(): 前进或后退几个历史
    - push(): 进入一个指定的页面,会添加一个历史
    - replace(): 进入一个指定的页面,替换当前历史, 会破坏浏览器后退功能
  - location: 路由地址信息
  - match: 匹配路由结果的信息

- 主要是 `Navbar` 组件的 `goPage `

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Users = () => <div>用户管理</div>;
const Roles = () => <div>角色管理</div>;
const Permissions = () => <div>权限管理</div>;
const Navbar = (props) => {
  // 手动处理, 而不是通过 Link/NavLink 组件
  const goPage = (path) => props.history.push(path);
  return (
    <div>
      <button onClick={() => goPage("/users")}>用户管理</button>
      <button onClick={() => goPage("/roles")}>角色管理</button>
      <button onClick={() => goPage("/permissions")}>权限管理</button>
    </div>
  );
};

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Route component={Navbar} />
        <Switch>
          <Route exact path="/users" component={Users} />
          <Route exact path="/roles" component={Roles} />
          <Route exact path="/permissions" component={Permissions} />
        </Switch>
      </Router>
    );
  }
}

export default App;
```

## 动态路由

> 在定义 Route 映射的时候直接指定参数

```jsx
import React from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";

const Article = (props) => {
  const { id, title } = props.match.params;
  return (
    <div>
      <p>文章ID: {id}</p>
      {title ? <p>文章标题: {title}</p> : null}
    </div>
  );
};

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Link to={`/article/1/测试`}>文章详情</Link>
        <Switch>
          {/* :id 必选参数, :title? 可选参数 */}
          <Route exact path="/article/:id/:title?" component={Article} />
        </Switch>
      </Router>
    );
  }
}

export default App;
```

> 在 Link/NavLink 跳转的时候指定参数

```jsx
import React from "react";
import { HashRouter as Router, Link, Route, Switch } from "react-router-dom";

const Article = (props) => {
  const { state, search, hash } = props.location;
  const { id, title } = state || {};
  return (
    <div>
      <p>url query: {search}</p>
      <p>url hash: {hash}</p>
      <p>文章ID: {id}</p>
      {title ? <p>文章标题:{title}</p> : null}
    </div>
  );
};

class App extends React.PureComponent {
  render() {
    const linkParams = {
      pathname: "/article", // Route 组件的 path 属性
      search: "?sort=id", // url query
      hash: "test-hash", // url hash
      state: { id: 101, title: "hello-react" }, // 自定义数据, 只存在内存中, 一刷新就没了
    };

    return (
      <Router>
        <Link to={linkParams}>文章详情</Link>
        <Switch>
          <Route exact path="/article" component={Article} />
        </Switch>
      </Router>
    );
  }
}

export default App;
```

> 动态路由设计方案

两种动态路由是可以结合一起使用的, 需要持久保存的数据就用 `Route 指定 path` 的方式,

如果不需要持久保存, 就直接使用 `给 Link 组件的 to 属性传一个对象 ` 的方式

## 集中管理(墙裂推荐)

- [react-router-config](https://www.npmjs.com/package/react-router-config)

> 为什么要集中管理?

项目越来越大就会有很多的二级路由, 此时每个路由都使用 `<Route>` 这种形式来定义的话, 就很不利于维护, 到不如和 `vue-router` 那样, 直接定义一个映射文件, 然后把所有的路由定义都放到映射文件中, 这样的话, 就算致路由很多, 也不会导致路由关系混乱, 易于维护
