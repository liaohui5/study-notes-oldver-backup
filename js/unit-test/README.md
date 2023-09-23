## 写测试是为了什么?

- 为了 kpi?
- 为了完成 `测试覆盖率` 要求?

## 为什么应该要写测试?

- 快速验证代码正确性
- 写出易于维护的代码: `unit test case is best documentation`
- 增加重构的自信心

> 快速验证代码的正确性

如果手动验证代码是否正确(针对 js 这个语言来说), 需要在浏览器中运行然后查看结果, 或者在 nodejs 中手动运行一遍然后查看结果是否正确, 如果验证代码的流程比较复杂, 可能测试起来就比较耗费时间

> 单元测试会逼着你写出易于测试/维护的代码

不写单元测试的代码可能是这样的:

```js
import router from '@/router';
import { ElMessage } from 'element-ui';

// 不写单元测试: 可能就会写出这样的代码
const http = axios.create({
  /* ... */
});

http.interceptor.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

http.interceptor.response.use(
  (response) => {
    const { code, msg, data } = response;
    if (code === 0) {
      return data;
    }
    ElMessage.error(msg); // ElMessage is ElementUI component
    return Promise.reject(msg);
  },
  (err) => {
    if (err.response.status === 401) {
      ElMessage.error('请先登录');
      router.replace({ name: 'Login' }); // router is instance of VueRouter
    }

    if (err.response.status === 400) {
      // showErrMsg ...
    }
    if (err.response.status === 403) {
      // showErrMsg ...
    }
    if (err.response.status === 500) {
      // showErrMsg ...
    }
    return Promise.reject(err);
  },
);

// 看起来好像没有什么问题, 代码也能够正常执行, 但是:
// 1. http.interceptor.request.use 中 强依赖了 localStorage, 不够 "低耦合"
// 2. http.interceptor.response.use 中强依赖了 ElMessage 和 VueRouter 不够 "低耦合"
// 3. 而且类似判断 status === 401 可能有多个, 这应该是一个单独的功能, 不够 "单一职责"
// 这样的代码, 不利于重构和测试
```

```ts
import { hasToken, getToken } from '@/utils/token';
import { showErrMsg } from '@/utils/msg';
import { errorHandler } from '@/utils/httpErrorHandler';

const http = axios.create({
  /* ... */
});

http.interceptor.request.use((config) => {
  if (hasToken()) {
    config.headers.token = getToken();
  }
  return config;
});

http.interceptor.response.use(
  (response) => {
    const { code, msg, data } = response;
    if (code === 0) {
      return data;
    }
    showErrMsg(msg);
    return Promise.reject(msg);
  },
  (err) => {
    errorHandler(err.response.status);
    return Promise.reject(err);
  },
);

// 虽然改动不多, 但是这已经能够说明问题了:
// 重构:
// 1. 使用 hasToken & getToken 来做一个中间层, 假如到时候要改成 indexDB 来存储而不是 localStorage 来保存, 这个代码可以不用改, 直接改 hasToken & getToken 就可以了
// 2. 如果我直接把这个代码复制到一个不是使用 elementUI 的项目中, 那么只要实现 showErrMsg 这个方法就可以了, 不用改动这个代码
// 3. 如果有多个状态码要判断, 只需要改动 errorHandler 就可以了, 就不用改动这个文件, 那么改动测试也是一样的, 不需要改动这个文件的测试
// 测试:
// 1. 如果不封装 hasToken getToken, 如果要改成用 indexDB 来存储, 那么就需要改动这个 http 的测试文件
// 2. 如果不封装 errorHandler, 测试就比较复杂了, 如果有这个 errorHandler 就可以在测试用例中测试 errorHandler 是否调用就可以了
//    至于 errorHandler 的功能是否有误, 那么写一个 errorHandler 对应的测试文件去测试他的功能即可
```

## 什么时候写测试?

- 先写测试再写实现代码, `from red to green` 的 TDD 开发模式(推荐)
- 现在实现代码, 然后再补测试(这样会很痛苦, 因为很可能写出不利于测试的代码, 导致需要重构)

## 单元测试的重点

对于一个程序 `是否能够获取想要的结果` 来说, 最重要的就 3 个因素: `环境` `输入` `输出结果`

![program](https://raw.githubusercontent.com/liaohui5/images/main/images/20230907195313.png)

## 笔记中的代码

- [ts-vue-vitest-demo](https://github.com/liaohui5/ts-vue-vitest-demo)
