## 按照功能切分模块

- router/index: 实例化和安装 router 实例到 app 对象中
- router/routes: 存放所有的路由信息
- router/consts: 存放路由表所有记录 RouteRecord 的 name 等属性
- router/guards: 存放路由的所有路由守卫
- hooks/goto: 存放所有与页面中跳转相关的逻辑

```typescript
// index.ts
import type { App } from 'vue';
import { Router, createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './routes';
import { setupRouterGuards } from './guards';

// 模块总出口, 这样导出方便其他文件导入, 如: import {routes} from "@/router"
export { setupRouterGuards } from './guards';
export { routes } from './routes';
export { RouteNames } from './const';

// 实例化 & 安装 Router 实例对象
export function setupRouter(app: App) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  setupRouterGuards(router);
  setRouterInstance(router);
  app.use(router);
}

// 方便在 setup 外部使用 router 实例对象,如: router.push({name:'xxx'})
let _router: Router;
export function getRouterInstance() {
  return _router;
}

export function setRouterInstance(router: Router) {
  _router = router;
}

/*
main.ts 中如何使用 router/index.ts ?

import {setupRouter} from "@/router";

const app = createApp(Vue);

setupRouter(app); // 这个函数会调用 app.use(router)

app.mount();
*/
```

```typescript
// consts.ts
export const enum RouteNames {
  LOGIN = 'Login',
  HOME = 'Home',
  UPDATE_USER_PASSWORD = 'Update_user_password',
  USERS = 'Users',
  ROLES = 'Roles',
  PERMISSIONS = 'Permissions',
}
```

```typescript
// routes.ts
import type { RouteRecordRaw } from 'vue-router';
import { RouteNames } from './const';

import Login from '@/pages/login/index.vue';
import Home from '@/pages/home/index.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: RouteNames.LOGIN,
    component: Login,
    meta: {
      isPublic: true,
      noLayout: true,
    },
  },
  {
    path: '/',
    name: RouteNames.HOME,
    component: Home,
    meta: {
      dontCheckPermission: true,
    },
  },
  {
    path: '/users',
    name: RouteNames.USERS,
    component: () => import('@/pages/user/index.vue'),
  },
  {
    path: '/roles',
    name: RouteName.ROLES,
    component: () => import('@/pages/role/index.vue'),
  },
  {
    path: '/permissions',
    name: RouteName.PERMISSIONS,
    component: () => import('@/pages/permission/index.vue'),
  },
  {
    path: '/update_password',
    name: RouteNames.UPDATE_USER_PASSWORD,
    meta: { dontCheckPermission: true },
    component: () => import('@/pages/user/update-password.vue'),
  },
];
```

```typescript
// guards.ts
import type { Router } from 'vue-router';
import { hasToken } from '@/utils/token';
import { RouteNames } from '@/router';
import { start, done } from '@/utils/loadingProgress';
import { showErrorMsg } from '@/utils/msgs';

// 页面加载 进度条
export function loadingProgress(router: Router) {
  router.beforeEach(() => start());
  router.afterEach(() => done());
}

// 检查是否登录
export function checkLogin(router: Router) {
  router.beforeEach((to, _form, next) => {
    if (to.meta.isPublic || hasToken()) {
      return next();
    }

    showErrorMsg('请先登录');
    return next({ name: RouteNames.LOGIN });
  });
}

// 安装所有守卫
export function setupRouterGuards(router: Router) {
  loadingProgress(router);
  checkLogin(router);
}
```

## 测试路由守卫

[vue-router-mock](https://github.com/posva/vue-router-mock) 这是 vue-router 作者写的一个专门用于单元测试的包, 可以直接用这个包来做单元测试

> 为什么只需要测试路由守卫的逻辑?

因为并不是所有代码都值得测试, 单元测试应该只测试一些容易出错的代码, 让这些代码变得容易维护,

像 `consts.ts` `routes.ts` `index.ts` 这种没有什么逻辑, 只声明一些变量,然后导出,这不太容易出错的代码,

就没有必要在写单元测试了

```typescript
// router.spec.ts
import { RouterMock } from 'vue-router-mock';
import type { Router } from 'vue-router';
import { removeToken, saveToken } from '@/utils/token';
import { routes, RouteNames } from '@/router';
import { start, done } from '@/utils/loadingProgress';
import { createRouterMock, type RouterMockOptions } from 'vue-router-mock';
import { setRouterInstance, setupRouterGuards } from '@/router';

// 由于在 guards 中会用到这两个函数, 但是这个测试并不关心这两个函数的具体实现
// 如果要测试 start/done 可以在 loadingProgress.spec.ts 中去测试
vi.mock('@/utils/loadingProgress', () => {
  return {
    start: vi.fn(),
    done: vi.fn(),
  };
});

// 启动 vue-router-mock
function setupRouterMock(options: RouterMockOptions = {}) {
  const routerMock = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
    ...options,
  });

  // 设置路由守卫
  setupRouterGuards(routerMock as Router);

  // 设置路由实例
  setRouterInstance(routerMock as Router);

  return routerMock;
}

describe('router', () => {
  let routerMock: RouterMock;
  beforeEach(() => {
    removeToken(); // 删除 token, 验证登录需要用到 token 是否存在
    routerMock = setupRouterMock({
      routes,
      useRealNavigation: true,
    });
  });

  describe('page loading progress router guard', () => {
    it('should be add loading progress when route change', async () => {
      await routerMock.push({ name: RouteNames.LOGIN });
      expect(start).toBeCalled();
      expect(done).toBeCalled();
    });
  });

  describe('check login router guard', () => {
    it('should redirect to login page when have not token to access home page', async () => {
      removeToken();
      await routerMock.push({ name: RouteNames.HOME });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it('should go to login page when have not token', async () => {
      removeToken();
      await routerMock.push({ name: RouteNames.LOGIN });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it('should go to home page when has token', async () => {
      saveToken('token-string'); // 保存 token, 验证登录需要用到 token 是否存在
      await routerMock.push({ name: RouteNames.HOME });
      expect(routerMock.currentRoute.value.name).toBe(RouteNames.HOME);
    });
  });
});
```

## 测试 goto.ts 钩子函数

因为可能很多地方都需要用到 `router` 去跳转页面, 所以,

必须应该封装一个 `goto.ts` 来做这个事情, 统一测试/管理跳转页面的逻辑

```typescript
// goto.ts
import { getRouterInstance } from '@/router';
import { RouteNames } from '@/router/const';
import { useRouter } from 'vue-router';

export function useGoto() {
  const router = useRouter();

  function gotoLogin() {
    router.push({
      name: RouteNames.LOGIN,
    });
  }

  function gotoHome() {
    router.push({
      name: RouteNames.HOME,
    });
  }

  function gotoUpdatePassword() {
    router.push({
      name: RouteNames.UPDATE_USER_PASSWORD,
    });
  }

  return {
    gotoLogin,
    gotoHome,
    gotoUpdatePassword,
  };
}

export function redirectToLogin(): void {
  getRouterInstance().replace({
    name: RouteNames.LOGIN,
  });
}
```

```typescript
// goto.spec.ts
import { mount, config } from "@vue/test-utils";
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
  type RouterMockOptions,
  RouterMock,
} from "vue-router-mock";
import { redirectToLogin, useGoto } from "@/hooks/goto";
import { RouteNames, routes, setRouterInstance } from "@/router";

// 应该封装 test helper
export function setupRouterMock(opts: RouterMockOptions) {
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
    ...opts,
  });

  beforeEach(() => {
    router.reset();
    injectRouterMock(router); // 注入 routerMock 实例
  });

  setRouterInstance(router);

  config.plugins.VueWrapper.install(VueRouterMock);
  return router;
}

// 应该封装 test helper, 方便测试只能在 setup 中使用的一些方法
export function useSetup(setup: () => void) {
  const Comp = {
    render() {},
    setup,
  };

  const wrapper = mount(Comp);

  return {
    wrapper,
    router: wrapper.router,
  };
}

describe("goto", () => {
  let routerMock: RouterMock;
  beforeAll(() => {
    routerMock = setupRouterMock({ // 注入 router, 在实例化组件的时候, 能够直接使用
      routes,
    });
  });

  describe("goto hooks", () => {
    it("should be go to home page", async () => {
      const { router } = useSetup(() => {
        const { gotoHome } = useGoto();
        gotoHome();
      });

      expect(router.currentRoute.value.name).toBe(RouteNames.HOME);
    });

    it("should be go to login page", async () => {
      const { router } = useSetup(() => {
        const { gotoLogin } = useGoto();
        gotoLogin();
      });

      expect(router.currentRoute.value.name).toBe(RouteNames.LOGIN);
    });

    it("should be go to update user password page", async () => {
      const { router } = useSetup(() => {
        const { gotoUpdatePassword } = useGoto();
        gotoUpdatePassword();
      });

      expect(router.currentRoute.value.name).toBe(
        RouteNames.UPDATE_USER_PASSWORD
      );
    });
  });

  it("should go to login page, use router outside of setup", () => {
    redirectToLogin();
    expect(routerMock.currentRoute.value.name).toBe(RouteNames.LOGIN);
  });
});
```
