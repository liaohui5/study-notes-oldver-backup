## 模拟环境

> 模拟 DOM API

因为 JS 可以再 nodejs 和 浏览器 环境中运行, 但是测试代码一般都是在 `nodejs` 中执行,

如果是要调用浏览器环境专有的 API, 比如 `document.querySelector` 这样的, 再 nodejs 中是没有这个 API 的,

此时就需要模拟浏览器的 DOM 环境, 主要有两个包可以做这个事情, [happy-dom](https://github.com/capricorn86/happy-dom) 和 [js-dom](https://github.com/jsdom/jsdom)

推荐 happy-dom, 因为 happy-dom 性能更好(可能是 jsdom 的检查机制更加严格的问题)

> 手动模拟其他 API/变量

因为 happy-dom 和 jsdom 不可能将 window 上的所有 API 全部实现一遍, 因此, 有些 API 就需要手动模拟,

而且, window 是个对象, 有的时候可能会在 window 对象上设置一些属性, 此时如果要测试这样的方法, 就需要模拟环境

```typescript
// 被测试的源码
export function getWinSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function openURL(url: string) {
  window.open(url);
}

export function getBaseURL() {
  const baseUrlMap = {
    development: 'http://localhost:3000',
    production: 'http://api.demo.com',
    test: 'http://test.demo.com',
  };
  const url = baseUrlMap[import.meta.env.NODE_ENV];
  if (!url) {
    throw new Error('unknown env');
  }
  return url;
}
```

```typescript
// 测试代码
import { getWinSize, openURL, getBaseURL } from '@/main';

describe('模拟浏览器运行环境的全局变量和方法', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    // 每个测试执行完后清除所有全局模拟, 保证每个测试的独立性
  });

  it('模拟全局变量', () => {
    vi.stubGlobal('innerWidth', 100);
    vi.stubGlobal('innerHeight', 50);

    const { width, height } = getWinSize();
    expect(width).toBe(100);
    expect(height).toBe(50);
  });

  it('模拟全局函数', () => {
    // openURL(url);
    // expect(window.open).toBeCalledWith(url);
    // 这样是无法通过测试的, 因为 happy-dom 没有实现 window.open 方法

    const openFn = vi.fn(); // 生成一个间谍函数
    vi.stubGlobal('open', openFn);

    const url = 'https://google.com';
    openURL(url);
    expect(window.open).toBeCalledWith(url); // toBeCalledWith: 判断间谍函数是否调用,及其调用时传入的参数
  });

  it('模拟环境变量', () => {
    vi.stubEnv('NODE_ENV', 'development');
    expect(getBaseURL()).toBe('http://localhost:3000');

    vi.stubEnv('NODE_ENV', 'production');
    expect(getBaseURL()).toBe('http://api.demo.com');

    vi.stubEnv('NODE_ENV', 'test');
    expect(getBaseURL()).toBe('http://test.demo.com');

    vi.stubEnv('NODE_ENV', 'unknown-env');
    expect(() => getBaseURL()).toThrow(); // toThrow: 被测试的函数应该抛出一个异常
  });
});
```

## 模拟输入

一般直接输入的函数, 不需要模拟, 直接传入参数后执行, 然后测试输出结果即可

```typescript
function sum(nums: number[]) {
  let res = 0;
  for (let i = 0, l = nums.length; i < l; i++) {
    res += nums[i];
  }
  return res;
}

it('测试直接输入的函数', () => {
  const arr = [1, 3, 5, 7, 9];
  const sumValue = sum(arr);
  expect(sumValue).toBe(25);
});
```

但是在写程序时, 不可避免的会有一下间接输入, 如调用其他方法获取的值, 或者发送请求获取的响应值

```typescript
// types.d.ts
interface IUserDto {
  id: number;
  username: string;
  phone: string;
}

// user.ts
function getUserInfo(): Promise<IUserDto> {
  return fetch('http://api.xxx.com/users/1').then((res) => res.json());
}

// main.ts
async function getUserPhone(): string {
  const user: IUserDto = await getUserInfo();
  return String(user.phone).substring(0, 3) + '*'.repeat(8);
}
```

```typescript
import { getUserPhone } from '@/main';
import * as userModule from '@/user';

describe('模拟程序间接输入', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('使用 mock 替换模块的方式来模拟间接输入', async () => {
    // 直接使用工厂函数来返回一个值
    vi.mock('@/user', () => {
      return {
        getUserInfo: () => Promise.resolve({ phone: '18712345678' }),
      };
    });
    const phone = await getUserPhone();
    expect(phone).toBe('187' + '*'.repeat(8));
    // 也可以使用 vi.mock + vi.mocked(xxx).mockImplementation 的方式来实现
    // 具体参考文档: https://cn.vitest.dev/api/vi.html#vi-mocked
  });

  it('使用 spyOn 的方式来模拟间接输入', async () => {
    vi.spyOn(userModule, 'getUserInfo').mockResolvedValue({
      id: 1,
      username: 'xxx',
      phone: '18912345678',
    });

    const phone = await getUserPhone();
    expect(phone).toBe('189' + '*'.repeat(8));
  });
});
```

## 注意 BUG

<span style="color:red;">注:由于 vitest 的 mock 实现原理是通过劫持 `import` 语句来实现的, 如果是同一个模块直接调用就会 mock 失败</span>

```typescript
// foo.ts
export foo = () => Math.random().toString(16).slice(2);
export bar = () => foo() + "-bar";
```

```typescript
// foo.spec.ts
import { foo, bar } from '@/foo';
vi.mock('@/foo', () => {
  return {
    foo: () => 'random-string',
  };
});

it('这个测试用例会失败, 因为 bar 是直接调用的 foo 函数, 没有 import, vitest 无法劫持', () => {
  expect(bar()).toBe('random-string-bar');
});
```

如何避免这个 bug? 只需要让 `foo` 和 `bar` 在不同的文件中, 然后 `import`, 这样 vitest 就可以劫持到

```typescript
// foo.ts
export foo = () => Math.random().toString(16).slice(2);

// bar.ts
import {foo} from "./foo"
export bar = () => foo() + "-bar";
```

```typescript
// bar.spec.ts
import { bar } from '@/bar';
vi.mock('@/foo', () => {
  return {
    foo: () => 'random-string',
  };
});
it('这个测试用例会成功', () => {
  expect(bar()).toBe('random-string-bar');
});
```

## 保证代码结果的可预测性

有时候我们需要测试随机数/日期相关的内容来做一些事情, 此时就不太好测试,

因为日期你今天写的测试通过来, 明天再来测试可能就无法通过了

- [模拟日期实现原理](https://github.com/sinonjs/fake-timers)
- [useFakeTimers 文档, 推荐阅读](https://cn.vitest.dev/api/vi.html#vi-usefaketimers)

```typescript
// main.ts
export function randomString(): string {
  // 这个代码, 其实 Math.random 随机数的结果是多少并不重要,
  // 重要的是, 是否能正确的变成一个随机字符串
  // 因为任何随机数后续的处理流程都是一样的
  return Math.random().toString(16).substring(2);
}

export function isFriday() {
  // 如果不使用模拟的时间, 那么会导致, 有的时候能通过,
  // 有的时候不能通过, 这就导致结果不可预测
  const date = new Date();
  return date.getDay() === 5;
}
```

```typescript
// main.spec.ts
import { isFriday, randomString } from '@/main';
describe('保证代码结果的可预测性', () => {
  it('随机数处理', () => {
    vi.spyOn(Math, 'random').mockImplementation(() => 0.1);
    expect(randomString()).toBe('1999999999999a');
  });

  it('日期处理', () => {
    // 使用一个模拟的时间
    vi.useFakeTimers();
    const mockDate = new Date(2023, 8, 15); // 2023-9-15
    vi.setSystemTime(mockDate);
    expect(isFriday()).toBe(true);

    const mockDate2 = new Date(2023, 8, 16); // 2023-9-16
    vi.setSystemTime(mockDate2);
    expect(isFriday()).toBe(false);

    // 使用真实的系统时间, 不要影响其他测试用例
    vi.useRealTimers();
  });
});
```

## 时光机:模拟定时器/超时器

因为有的时候,定时器如果比较多的话,需要等待比较长的时间,想要快速验证,就应该使用模拟的时间

```typescript
/**
 * 函数防抖
 * @param func - 要防止抖动的函数
 * @param wait - 触发频率(等待时间)
 * @param immediateInvok - 第一次是否立即调用
 * @param thisArg - 调用函数的时候 this 指向
 * @returns
 */
export function debounce(
  func: Function,
  wait: number = 100,
  immediateInvok: boolean = false,
  thisArg?: object
): (...args: any[]) => void {
  let timer: NodeJS.Timeout;
  let shouldExecute = immediateInvok;

  return function (...args: unknown[]): void {
    timer && clearTimeout(timer);
    if (shouldExecute) {
      func.apply(thisArg, ...args);
      shouldExecute = false;
    } else {
      timer = setTimeout(func.bind(thisArg, ...args), wait);
    }
  };
}
```

```typescript
import { debounce } from '@/main';
describe('时光机:跳过定时器快速验证代码', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('加速定时器', () => {
    // given
    vi.useFakeTimers();
    const cb = vi.fn();

    // when
    const wait = 1000;
    debounce(cb, wait)(); // execute returned function
    expect(cb).not.toBeCalled();

    // then
    vi.advanceTimersToNextTimer(); // 快进到下一个定时器(推荐)
    // vi.advanceTimersByTime(wait); // 快进指定毫秒
    expect(cb).toBeCalled();
  });
});
```
