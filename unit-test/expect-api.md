## 状态验证

所谓状态验证, 就是验证程序执行后, 判断程序执行的结果, 或者改变的变量

```typescript
// 计算平均值: 测试返回值是否正确
export function mean(nums: number[]) {
  let sum = 0;
  let len = nums.length;
  if (len === 0) {
    return sum;
  }
  for (let i = 0; i < len; i++) {
    sum += nums[i];
  }
  return sum / len;
}

// 获取/设置 id
export let $id: number = 0;
export function incrementId(initValue = 0): void {
  $id = initValue ? initValue : ++$id;
}
```

```typescript
import { mean, $id, incrementId } from '@/main';

describe('状态验证', () => {
  it('验证函数的返回值', () => {
    const nums = [1, 2, 3, 4, 5];
    expect(mean(nums)).toBe(3);
  });

  it('验证改变的变量', () => {
    expect($id).toBe(0);

    incrementId(5);
    expect($id).toBe(5);

    incrementId();
    expect($id).toBe(6);
  });
  // 调用实例方法, 改变类的属性, 也可以这样 验证状态
});
```

## 行为验证

行为验证的缺点就是: `会暴露被测试代码的实现细节, 会破坏封装性, 丧失了测试的有效性`

所以, 应该优先使用状态验证, 如果状态验证不太好测试, 才考虑用行为验证

```typescript
// main.ts
import axios from 'axios';
export function getUsers(params = { page: 1, size: 10 }) {
  // params 默认值: page 当前页, size: 每页多少�数据
  return axios.get('/api/users', { params });
}
```

```typescript
// main.spec.ts
import axios from 'axios';

describe('行为验证', () => {
  it('验证函数是否被调用, 和调用时的函数', async () => {
    vi.spyOn(axios, 'get');
    getUsers({ page: 2, size: 15 });

    expect(axios.get).toBeCalledWith('/api/users', {
      params: {
        page: 2,
        size: 15,
      },
    });
  });
});
```

## 异步代码验证

- JS 中异步代码主要是 定/超时器 和 Promise, 其他的用的相对较少

```typescript
// main.ts
export function delay(cb: CallableFunction, wait: number, ...args: any[]) {
  setTimeout(() => cb(...args), wait);
}

export function commitment(isResolved: boolean) {
  return new Promise((resolve, reject) => {
    if (isResolved) {
      resolve('resolved-value');
    } else {
      reject('rejected-reason');
    }
  });
}
```

```typescript
// main.spec.ts
import { delay, commitment } from '@/main';

describe('异步代码验证', () => {
  it('处理定时器', async () => {
    // given
    // 1.使用假的时间
    vi.useFakeTimers();
    const cb = vi.fn();
    const ms = 2 * 1000;

    // when
    delay(cb, ms, 11, 'str', false);

    // then
    expect(cb).not.toBeCalled();

    // 2.快进到下一个定时器
    vi.advanceTimersToNextTimer();
    expect(cb).toBeCalledWith(11, 'str', false);

    // 3.恢复使用真的时间, 不影响其他测试用例
    vi.useRealTimers();
  });

  it('处理 resolved 状态的 promise', async () => {
    const res = await commitment(true);
    expect(res).toBe('resolved-value');

    await expect(commitment(true)).resolves.toBe('resolved-value');
    // 这两种写法是同等效果
  });

  it('处理 rejected 状态的 promise', async () => {
    await expect(commitment(false)).rejects.toBe('rejected-reason');

    await expect(commitment(false)).rejects.toThrowError('rejected-reason');
    // 这两种写法是同等效果
  });
});
```

## 异常验证

```typescript
// main.ts
export function divide(dividend: number, divisor: number) {
  if (divisor === 0) {
    throw new RangeError('divisor not can be zero');
  }
  return dividend / divisor;
}
```

```typescript
// main.spec.ts
import { divide } from '@/main';

describe('验证代码异常', () => {
  it('验证代码是否抛出异常', () => {
    // 注意: 不能直接抛出到最顶层, 这样会让这个 测试用例执行时报错
    // expect(divide(1, 0)).toThrowError("divisor not can be zero");
    // 虽然可以手动 try catch 捕获, 但是不推荐这样做
    // try {
    //   divide(1, 0);
    // } catch (e: any) {
    //   expect(e.message).toBe("divisor not can be zero");
    // }

    expect(() => divide(1, 0)).toThrow('divisor not can be zero');

    // 假如这个错误信息不是固定的, 也可以使用正则来匹配关键信息
    expect(() => divide(1, 0)).toThrow(/not can be zero/);

    // 如果不需要知道错误信息, 只需要抛出异常即可, 可以什么都不填
    expect(() => divide(1, 0)).toThrow();

    // 注: toThrow 和 toThrowError 其实是同一个函数, 不过是别名罢了
  });
});
```

## 快照验证

所谓的快照验证就是 `第一次执行测试生成快照(字符串)`, `后面执行测试的时候将程序生成的字符串结果和快照对比是否有改变`

如果没有改变, 证明代码执行结果没有变, 如果改变: 测试就无法通过, 问你是否更新

- toMatchSnapshot: 生成快照文件(文件名为 `xxx.snap` 的文件)
- toMatchFileSnapshot: 生成快照文件, 但是可以指定文件名(如: `xxx.json`), 可以支持 IDE 语法高亮, 便于开发时人查看和比对
- toMatchInlineSnapshot: 在测试用例中生成快照字符串(如果字符串不是很多, 推荐使用这个方法, 不会生成新的文件, 很方便)

```typescript
// main.spec.ts
export function genConfig() {
  return {
    // api 请求地址
    API_URL: 'http://localhost:8080',

    // 静态资源地址
    ASSETS_URL: 'https://qiniu.demo.com',
  };
}
```

```typescript
import { genConfig } from '@/main';

describe('快照验证', () => {
  it('行内快照', () => {
    expect(genConfig()).toMatchInlineSnapshot(`
      {
        "API_URL": "http://localhost:8080",
        "ASSETS_URL": "https://img.demo.com",
      }
    `);
  });

  it('生成文件', () => {
    expect(genConfig()).toMatchSnapshot();
  });

  it('生成指定文件名的文件', () => {
    const config = genConfig();
    expect(JSON.stringify(config)).toMatchFileSnapshot('./config.json');
  });
});
```

![snapshot](https://raw.githubusercontent.com/liaohui5/images/main/images/20230914001307.png)
