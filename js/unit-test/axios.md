## 按照功能拆分模块

```typescript
// utils/http.ts 创建实例, 增加全局的拦截器
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { getToken, hasToken } from './token';
import { errorHandler, DEFAULT_ERR_MSG } from './httpErrorHandler';
import { showErrorMsg } from './msgs'; // 显示错误信息,并没有那么重要,不影响功能,不测试了

/* @ts-ignore */
const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const TOKEN_HEADER_KEY = 'token';
export const http: AxiosInstance = axios.create({
  baseURL,
  timeout: 5 * 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// global request interceptors
http.interceptors.request.use((config) => {
  if (hasToken()) {
    config.headers![TOKEN_HEADER_KEY] = getToken();
  }

  return config;
});

// global reponse interceptors
http.interceptors.response.use(
  ({ data: response }: AxiosResponse) => {
    const { success, data, msg } = response;
    if (success) {
      return data;
    }
    showErrorMsg(msg || DEFAULT_ERR_MSG);
    return Promise.reject(msg);
  },
  (err: AxiosError) => {
    /* @ts-ignore */
    errorHandler(err.response!.status, err.response?.data);
    return Promise.reject(err);
  }
);
```

```typescript
// utils/token.ts 处理 token 相关内容
export const TOKEN_KEY = '__user_token__';

export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || '';
}

export function hasToken(): boolean {
  return Boolean(getToken());
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
```

```typescript
// utils/httpErrorHandler.ts HTTP 相关错误处理
import { redirectToLogin } from '@/hooks/goto';
import { showErrorMsg } from '@/utils/msgs';

// http status code error messages
export const errno: { [key: string]: string } = {
  401: '请先登录',
  404: '请求地址错误',
  403: '拒绝访问',
  500: '服务器故障',
};

export const DEFAULT_ERR_MSG = '网络连接故障';
export function getErrorMsg(statusCode?: number) {
  let errorMsg = errno[String(statusCode)];
  if (!errorMsg) {
    errorMsg = DEFAULT_ERR_MSG;
  }
  return errorMsg;
}

export function errorHandler(statusCode: number, data?: { msg: string }): void {
  const message = data?.msg || getErrorMsg(statusCode);
  showErrorMsg(message);

  // redirect to login
  if (statusCode === 401) {
    redirectToLogin();
  }
}
```

## 测试 axios 全局拦截器

和 vue-router-mock 类似, 需要一个库来辅助测试 [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter)

```typescript
// http.spec.ts
import AxiosMockAdapter from 'axios-mock-adapter';
import { removeToken, saveToken } from '@/utils/token';
import { http, TOKEN_HEADER_KEY } from '@/utils/http';
import { errorHandler } from '@/utils/httpErrorHandler';

vi.mock('@/utils/httpErrorHandler', () => {
  return {
    errorHandler: vi.fn(),
  };
});

// 模拟放松请求
function triggerApiRequest() {
  return http.get('/api/users');
}

// 模拟响应结果
interface MockResponseBody {
  success?: boolean;
  msg?: string;
  data?: unknown;
}
const mockHttp = new AxiosMockAdapter(http);
function mockReply(httpStatusCode: number, response?: MockResponseBody) {
  if (response) {
    // 返回结果的格式,需要和服务端商议好, 如 { success = true, msg = 'success', data = null }
    const { success = true, msg = '', data = null } = response;
    mockHttp.onGet('/api/users').reply(httpStatusCode, { success, msg, data });
  } else {
    mockHttp.onGet('/api/users').reply(httpStatusCode);
  }
}

describe('http', () => {
  beforeEach(() => {
    removeToken();
    mockHttp.reset();
  });

  it(`should add request header ${TOKEN_HEADER_KEY} when has token`, async () => {
    const token = 'token-string';
    saveToken(token);
    mockReply(200, {});
    await triggerApiRequest();

    expect(mockHttp.history.get[0].headers![TOKEN_HEADER_KEY]).toBe(token);
  });

  it('should throw an error when success is false', async () => {
    const msg = 'error-message';
    mockReply(200, { success: false, msg });
    await expect(() => triggerApiRequest()).rejects.toThrowError(msg);
  });

  it('should resolved response body data when success is true', async () => {
    const data = 1;
    mockReply(200, { data });
    const res = await triggerApiRequest();
    expect(res).toBe(data);
  });

  it('should throw an error when http status is not 200', async () => {
    mockReply(1);
    await expect(() => triggerApiRequest()).rejects.toThrow();
  });

  it('should call httpErrorHandler when http status is not 200', async () => {
    mockReply(500);
    await expect(() => triggerApiRequest()).rejects.toThrow();
    expect(errorHandler).toBeCalled();
    // 在这里只需要判断 errorHandler 是否执行就可以,
    // 至于 errorHandler 是否执行正确, 输出我们需要的结果
    // 那么在 errorHandler.spec.ts 中去测试即可
  });
});
```

## 测试错误处理

```typescript
// errorHandler.spec.ts 全局HTTP错误处理
import { DEFAULT_ERR_MSG, getErrorMsg, errorHandler } from '@/utils/httpErrorHandler';
import { redirectToLogin } from '@/hooks/goto';

vi.mock('@/hooks/goto', () => {
  return {
    redirectToLogin: vi.fn(),
  };
});

describe('getErrorMsg', () => {
  it('should return default msg when no matched errno ', () => {
    const msg = getErrorMsg(555);
    expect(msg).toBe(DEFAULT_ERR_MSG);

    const msg2 = getErrorMsg();
    expect(msg2).toBe(DEFAULT_ERR_MSG);
  });
});

describe('handleErrorByHttpStatus', () => {
  it('should redirect to login page when status code is 401', () => {
    errorHandler(401);
    expect(redirectToLogin).toBeCalled();
    // 在这里只需要测试 redirectToLogin 是否调用, 至于是否输出了我们想要的结果
    // 那么应该在 goto.spec.ts 中去测试 详细, 可以查看 vue-router 测试技巧
  });
});
```
