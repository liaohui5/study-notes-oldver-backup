## 常见的测试框架

这两个测试框架, 配置起来比较简单, API 兼容性也比较好

- [jest](https://jestjs.io/docs/getting-started)

- [vitest](https://vitest.dev/guide/)

## 为什么使用框架?

为了快速验证

```js
function sayHi(username) {
  return 'hi,' + username;
}

// 手动验证
if (sayHi() === '') {
  // 通过验证
} else {
  // 未通过验证
}

// 框架 API 验证
expect(sayHi('tom')).toBe('hi,tom');
```

## 分类 API

- describe: 分类(会再命令行输出的时候,进行分类)
- it/test: 测试用例
- 修饰符:
  - skip: 跳过这个测试用例
  - todo: 只会执行这个测试用例
  - only: 不会执行, 相当于一个标记, 可以先写测试, 在写实现代码

```js
// describe.skip 也可以用在 describe 上
// describe.todo 也可以用在 describe 上
// describe.only 也可以用在 describe 上
describe('stack', () => {
  it('普通测试用例', () => {});
  it.skip('跳过这个测试用例, 不会执行', () => {});
  it.only('只会执行这个测试用例', () => {});
  it.todo('不会执行, 相当于一个标记, 可以先写测试, 在写实现代码', () => {});
});
```

## 断言 API

- [vitest](https://cn.vitest.dev/api/expect.html#tobe)

```js
expect(1).toBe(1);
expect(1).not.toBe(2);
expect(1).toBeTruthy(2);
expect(1).toBeTypeOf('number');
expect({ id: 1 }).toEqual({ id: 1 });
expect(() => throw new Error('err')).toThrow();
expect(() => throw new Error('err')).toThrowError('err');
// 快照测试
expect(/*..*/).toMatchInlineSnapshot();
expect(/*..*/).toMatchSnapshot();
```

## 生命周期 API

- beforeEach/afterEach
- beforeAll/afterAll

```js
beforeAll(() => {
  // 所有例子执行之前执行, 只会执行一次
  console.log('beforeAll-hook');
});

afterAll(() => {
  // 所有例子执行之后执行, 只会执行一次
  console.log('afterAll');
});

beforeEach(() => {
  // 每个测试用例执行前执行
  console.log('beforeEach');
});

afterEach(() => {
  // 每个测试用例执行后执行
  console.log('afterEach');
});

describe('stack', () => {
  it('should add value to items', () => {
    const stack = new Stack();
    const val = 'hello';
    stack.push(val);
    expect(stack.items.includes(val)).toBe(true);
  });
});
```

## vitest 配置

- [vite](https://vitejs.dev/config/)
- [vitest](https://vitest.dev/config/#configuration)

- vite.config.ts

```typescript
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

/* prettier-ignore */
export default defineConfig({
  plugins: [vue()],
  test: {
    // 是否开启自动全局(测试文件)导入vitest API
    globals: true,

    // 模拟浏览器DOM环境的包,允许的值有 happy-dom 或 jsdom
    environment: 'happy-dom',

    // vitest 启动时, 会执行的文件, 一般是用于设置测试代码环境
    // 比如测试vue组件, 需要 vue-router, 不可能每个测试文件都写一次
    // setupFiles: [
    //    resolve('./src/__tests__/setups/router-mock.ts'),
    // ],
  },

  // 配置路径别名
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
```

- tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* path: 让编辑器识别 vite 配置中的 @ 路径别名 */
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    },

    /* types: vitest/globals 不用全局导入, 就可以在测试文件中, 直接使用 expect toBe 等 API */
    "types": ["vite/client", "vitest/globals"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- tsconfig.node.json

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- vite-env.d.ts

```typescript
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// docs: https://cn.vitejs.dev/guide/env-and-mode.html#modes
interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL: string;
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<object, object, any>;
  export default component;
}
```
