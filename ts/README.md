## ts 介绍

- [中文文档](https://www.tslang.cn/docs/handbook/interfaces.html)

> 什么是 typescript(TS)

typescript 简称 ts

ts 和 js 的关系就比如 less/sass 和 css 的关系一样,

简单来说, typescript 是 javascript 的进化版, 超集

> 为什么需要 ts

因为 js 是弱类型语言, 很多错误只有在运行的时候才会被发现,

而 ts 是强类型语言, 他支持静态检查机制, 可以帮助程序员在编译时发现代码的错误

> ts 的特点

- 支持 js 的全部特性
- 支持代码静态检查
- 支持(枚举,泛型,命名空间,接口)等特性

## 安装

> 安装编译器

```
npm install typescript
```

## 数据类型

https://www.tslang.cn/docs/handbook/basic-types.html

- number 数值
- string 字符串
- boolean 布尔
- array 数组
- tuple 元组
- object 对象
- enum 枚举
- any 任意类型
- void
- never
- 联合类型

### any

不约束变量的数据类型

```typescript
let val: any = "str";
val = 123;
val = false;
```

### 基本数据类型 number string boolean

ts 中的变量定义时应该指定数据类型, 并且指定后不能赋值为其他的数据类型

```typescript
let username: string = "user1";
username = 123; // 报错
usernmae = true; // 报错

let age: number = 10;
age = "hello"; // 报错
age = false; // 报错
```

### 数组 array

```typescript
let numArr: number[];
numArr = [1, 2, 3];
numArr = ["a", 2, 3]; // 报错

let boolArr: Array<boolean> = [];
boolArr = [false, true];
boolArr = [false, 1]; // 报错

let mulArr: (string | number)[]; // 联合类型
mulArr = ["a", 1];
mulArr = ["a", 1, false]; // 报错
```

### 元组 tuple

> 元组其实就是数组的扩展类型
>
> 元组用于保存定长定数据类型的数据

```typescript
let arr: [string, number, boolean];
arr = [false, "a", 1]; // 报错
arr = ["a", 1, false]; // 正确: 必须指定的元素类型必须和定义时的对应
```

### 枚举 enum

所谓枚举, 就是指那些固定的一些值, 如一个星期只有 7 天, 一年只有 4 个季节, 一年只有 12 个月

- ts 底层实现 enum 的本质使用 数值来代替, 所以赋值一个数值类型的值给枚举是不会报错的

```typescript
enum Gender {
  Man,
  Women,
}

let gender: Gender;
gender = Gender.Man;
gender = Gender.Women;
gender = "男"; // 报错
gender = 0; // 不会报错
```

### void 无类型

- 在 ts 中一般用于无返回值的函数的类型限定
- 在 ts 中只有 `undefined` 和 `null` 可以赋值给 `void` 的变量(严格模式下不能赋值)

```typescript
function say(): void {
  console.log("test");
}
```

### never 不存在的类型

- never 表示永远不存在值的类型, 或者根本不可能有返回值的函数

```typescript
function throwError(): never {
  throw new Error("报错了...");
}
```

### object 类型

```typescript
let obj: object = {};

obj = { a: 1 };
obj = [];
obj = 1; // 报错
```

### 类型断言(强制类型转换)

如果我们拿到一个 any 类型的变量, 但是我们明确知道变量中保存的是字符串,此时我们就可以强制的让编译器将这个变量解析为一个字符串类型的变量, 断言之后就能使用字符串的函数了

```typescript
let str: any = "hello typescript";

// 方式一:
let len = (<string>str).length;

// 方式二(推荐):
let len = (str as string).length;
```

## 接口

### 什么是接口 interface

https://www.tslang.cn/docs/handbook/interfaces.html

接口也是一种类型, 可以约束变量或者方法,只能有哪些属性或者必须有哪些属性

```typescript
// 定义一个 PersonInterface 的接口, 被这个接口约束的变量,必须要有 name 属性和 age 属性,
// 并且, 这两个属性的类型必须要和接口中定义的一致
interface PersonInterface {
  name: string;
  age: number;
}

const p1 = {
  name: "tom",
  age: 10,
};

const p2 = {
  name: "tom",
  age: 10,
  gender: "man", // 报错, 比接口多一个 gender 属性
};

const p3 = {
  name: "tom", // 报错, 比接口少一个 age 属性
};
```

### 可选属性

默认情况下, 被接口限制的变量, 属性既不能多, 也不能少, 但是如果有`可选属性`就能让约束的变量`只实现一部分属性`

```
interface FullNameInterface {
  firstName: string;
  lastName: string;
  otherName?: string;
}

const n1: FullNameInterface = {
  firstName: "zhang",
  lastName: "shang",
};
```

### 索引签名 [propName]

默认情况下, 被接口限制的变量, 属性既不能多, 也不能少, 但是如果用`索引签名 `就能让约束的变量`多一部分自己独有的属性`

```typescript
interface FullName {
  firstName: string;
  lastName: string;
  [propName]: any; // 任意的 key 并且不限制 value 的类型
}

const names = {
  firstName: "wang",
  lastName: "Hai",
  otherName: "XiaoWang",
};
```

### 只读属性

默认情况, 被约束的变量只要实现了接口属性就能随意读取和修改, 但是有些属性可能只需要 `在定义的时候赋值一次` 然后就不允许修改了, 此时就需要使用只读属性

```typescript
interface FullNameInterface {
  readonly firstName: string;
  lastName: string;
}

let p1: FullNameInterface = {
  firstName: "zhang",
  lastName: "shang",
};

p1.firstName = "li"; // 报错: 姓不能被修改
p1.lastName = "si";
```

### 函数接口

用来约束函数的参数个数类型及函数的返回值

```typescript
// 实现这个接口的函数, 必须有2个参数, 并且类型必须是 number, 返回值的类型也必须是 number
interface sumInterface {
  (x: number, y: number): number;
}

const add: sumInterface = function (x, y) {
  return x + y;
};
```

### 混合类型接口

https://www.tslang.cn/docs/handbook/interfaces.html

### 接口继承

```typescript
interface LengthInterface {
  length: number;
}

interface WidthInterface {
  width: number;
}

interface HeightInterface {
  height: number;
}

interface RectInterface extends LengthInterface, WidthInterface, HeightInterface {
  color: string;
}

// 必须四个属性都有, 否则就报错
const rect: RectInterface = {
  length: 10,
  width: 20,
  height: 30,
  color: "red",
};
```

## 函数

### ts 定义函数

- ts 的函数和 js 的函数都有 3 种方式, 不同的是, 必须声明参数的类型和返回值的类型

```typescript
// 使用 function 关键字
function add(x: number, y: number): number {
  return x + y;
}

// 使用 赋值表达式
const add2 = function (x: number, y: number): number {
  return x + y;
};

// 使用箭头函数

const add3 = (x: number, y: number): number => x + y;

// const add4:Function = (x: number, y: number): number => x + y;
```

### 函数的参数

> 可选参数

- 可选参数后面只能有可选参数, 不能有必选参数

```typescript
const add = (x: number, y: number, z?: number): number => x + y + (z ? z : 0);
console.info(add(10, 20)); // 30
console.info(add(10, 20, 30)); // 60
```

> 剩余参数

```typescript
const showArgs = (x: number, ...args: Array<number>): void => {
  console.info(x);
  console.info(args);
};

showArgs(10, 20, 30, 40, 50);
// 10
// [20, 30, 40, 50]
```

> 默认参数

- 默认参数后面只能有默认参数, 不能有必传参数

```typescript
const log = (str: string = "hello world"): void => console.info(str);

log(); // hello world
```

## 泛型

### 为什么使用泛型

个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

在定义的时候不确定类型, 只有在执行的时候才确定类型

实际应用:

`实现一个填充数组函数的方法, 可以传入2个参数, 第一个参数代表填充的个数, 第二个参数代表要填充的值, 第二个参数的值可以是任意类型`

```typescript
// 填充数组
function fillArray<T>(len: number, data: T): Array<T> {
  let arr: Array<T> = [];
  for (let i = 0; i < len; i++) {
    arr.push(data);
  }
  return arr;
}

const strArr = fillArray(3, "abc");
console.info(strArr); // ["abc", "abc", "abc"]

const numArr = fillArray(3, 1);
console.info(numArr); // [1, 1, 1]
```

### 泛型约束

`实现一个填充数组函数的方法, 可以传入2个参数, 第一个参数代表填充的个数, 第二个参数代表要填充的值, 第二个参数的值的类型必须有 length 属性`

```typescript
interface LengthInterface {
  length: number;
}

function fillArray<T extends LengthInterface>(len: number, data: T): Array<T> {
  let arr: Array<T> = [];
  for (let i = 0; i < len; i++) {
    arr.push(data);
  }
  return arr;
}

const arr1 = fillArray(3, ["1"]); // 数组有 length 属性
console.info(arr1); // [ ['1'], ['1'], ['1'] ]

const arr2 = fillArray(3, "1"); // 字符串有 length 属性
console.info(arr2); // ["1", "1", "1"]

const arr3 = fillArray(3, { a: "1", length: 1 }); // 这个自定义对象有length
console.info(arr3); // [{a: "1", length: 1},{a: "1", length: 1}, {a: "1", length: 1}]
```

## 类

### ts 定义类

```typescript
class Person {
  // 和es6 class 的区别, 需要先定义, 然后才能在 constructor 中使用
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### 可选属性

```typescript
class Person {
  name: string;
  age: number;
  gender?: boolean; // 可选
  constructor(name: string, age: number, gender?: boolean) {
    this.name = name;
    this.age = age;
  }
}
```

### 参数属性

```typescript
class Person {
  // 简化写法
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### 修饰符

- public 默认的修饰符, 可以在类的内部,子类,外部访问
- protected 被修饰的属性只能在类的`内部和子类中`访问
- private 被修饰的属性只能在类的`内部`访问
- readonly 将修饰的属性为`只读`
- static 将修饰的属性修改为静态

### 属性存取器 getter 和 setter

```typescript
class Person {
  private _age: number = 0;
  set age(val: number) {
    if (val < 0) {
      throw new Error("人的年龄不能小于零");
    }
    this._age = val;
  }

  get age() {
    return this._age;
  }
}

const p = new Person();
console.info(p.age);
p.age = -5;
```

### 抽象类

抽象类和接口的相同点和不同点:

- 相同点
  - 不能直接实例化
  - 都是用于约束其他类
- 不同点
  - 抽象类用继承, 接口用实现的方式来约束子类
  - 抽象类可以定时具体的方法实现, 接口只能定义方法不能定义实现

```typescript
abstract class Person {
  abstract name: string;
  abstract age: number;
  abstract say(): void;
  eat(food: string): void {
    console.info(`人吃${food}`);
  }
}

class Student extends Person {
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    super();
    this.name = name;
    this.age = age;
  }

  // 实现抽象类的 say 方法
  say() {
    this.eat("蔬菜"); // 调用抽象类的方法
    console.info("人可以说话");
  }
}

const s1 = new Student("zs", 10);
s1.say();
// ---->
// 人吃蔬菜
// 人可以说话
```

### 泛型类

```typescript
class CacheManager<T> {
  private caches: T[] = [];
  add(val: T): T {
    this.caches.push(val);
    return val;
  }
  all(): T[] {
    return this.caches;
  }
}

const numCacheMgr = new CacheManager<number>();
numCacheMgr.add(1);
numCacheMgr.add(3);
// numCacheMgr.add("hello"); // 报错

const strCacheMgr = new CacheManager<string>();
strCacheMgr.add("hello");
strCacheMgr.add("world");
// strCacheMgr.add(true); // 报错
```

## 接口

### 类实现接口

```typescript
interface PersonInterface {
  name: string;
  age: number;
  eat(): void;
  say(str: string): void;
}

class Student implements PersonInterface {
  public name;
  public age;
  public constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public say(str: string): void {
    console.info(`${this.name}说:${str}`);
  }

  public eat(): void {
    console.info("人需要吃饭");
  }
}

const s1 = new Student("张三", 20);
s1.say("你好"); // 张三说:你好
```

### 接口继承类

```typescript
class {
  public name;
  public constructor(name: string) {
    this.name = name;
  }
  public eat(): void {
    console.info("人需要吃饭");
  }
}

// PersonInterface接口会继承Person类的所有属性和方法
// 注意: 虽然会继承方法, 但是不会继承方法的实现
interface PersonInterface extends Person {
  age: number;
  say(): void;
}

class Student implements PersonInterface {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  eat() {
    console.info("学生在学校吃饭");
  }

  say() {
    console.info(`我的名字是:${this.name}, 我的年龄是:${this.age}`);
  }
}

const s1 = new Student("张三", 15);
s1.say(); // 我的名字是:张三, 我的年龄是:15
s1.eat(); // 学生在学校吃饭
```

### 接口合并

定义两个同名的接口, 会自动合并, 如果去实现这个接口, 需要实现所有的属性和方法

```typescript
interface PersonInterface {
  gender: boolean;
}

interface PersonInterface {
  age: number;
}

// 必须同时实现所有的定义
class Student implements PersonInterface {
  gender: boolean = true;
  age: number = 18;
}
```

## 类型别名

### 类型别名

比如你的名字叫 `杨智`, 你的外号叫 `小智`,无论杨志和小志都是同一个人

```typescript
type str = string;
let username: str = "小智"; // let username:string = "小智";

type strNum = string | number;
let username: strNum = "tom"; // let username: (string | number) = "tom";
username = 123;
```

### 类型别名使用泛型

```typescript
type rect<T> = { x: T; y: T };
const r1: rect<string> = { x: "10px", y: "10px" };
const r2: rect<number> = { x: 30, y: 50 };
```

### 类型别名定义嵌套结构

```typescript
type route = {
  name: string;
  path: string;
  mate?: object;
  children?: Array<route>; // 引用自己, 必须是可选的, 否则死循环
};

const routes: Array<route> = [
  {
    name: "login",
    path: "/login",
    mate: { noLogin: true },
  },
  {
    name: "home",
    path: "/",
    children: [
      {
        name: "user_list",
        path: "/users",
      },
    ],
  },
];
```

## 装饰器

### 装饰器

> 什么是装饰器

- es7 的新语法, 可以附加到类, 方法, 参数上

- 装饰器的本质就是一个方法

> 如何使用装饰器?

- 修改 tsconfig.json

```typescript
{
  "experimentalDecorators": true,
}
```

- 基本使用

```typescript
function test(target) {
  // target: 被装饰的目标
  const p = new target("张三", 15);
  console.info("target", target);
  console.info("instance", p);
}

@test
class Person {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }
}
```

### 装饰器分类

- 普通装饰器

```typescript
function test(target) {
  // target: 被装饰的目标
  const p = new target("张三", 15);
  console.info("target", target);
  console.info("instance", p);
}

@test
class Person {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }
}
```

- 装饰器工厂(一个函数返回了一个函数, 并且作为装饰器使用)

```typescript
function test2() {
  console.info("1"); // 第一步: 先执行这个方法, 拿到真正的装饰器
  return (target) => {
    console.info("2"); // 第二步: 执行真正的装饰器操作
    // target: 被装饰的目标
    console.info(target);
  };
}

@test2()
class Person {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }
}
```

- 装饰器组合(普通装饰器结合装饰器工厂一起使用)

1. 第一步: `从上至下`执行 所有的 `装饰器工厂` , 拿到真正的 `装饰器`
2. 第二部: `从下至上` 执行所有的 `装饰器`

```typescript
function fn1() {
  console.info("fn1");
  return (target) => console.info("fn11");
}

function fn2() {
  console.info("fn2");
  return (target) => console.info("fn22");
}

function fn3(target) {
  console.info("fn3");
}

function fn4(target) {
  console.info("fn4");
}

@fn3
@fn2()
@fn1()
@fn4
class Person {
  constructor(public name: string, public age: number) {
    this.name = name;
    this.age = age;
  }
}

// console: fn2 fn1 fn4 fn11 fn22 fn3
```

### 类装饰器

- 类装饰器在类的说明之前绑定
- 类装饰器可以用来监视,修改,替换类的定义
- 在执行类装饰器函数的使用, 会把绑定的类作为唯一的参数传递给装饰器
- 如果在类装饰器返回一个新的类, 他会替换原有的类的定义

```typescript
function test(target) {
  target.prototype.nickname = "jerry";
  target.prototype.say = () => console.info("tom and jerry");
}

// 这个装饰器会修改这个类的定义, 动态的添加一个属性nickname和一个方法say
@test
class Person {}

const p = new Person();
console.info(p.nickname);
console.info(p.say());
```

```typescript
// <T extends { new(...args: any[]): {} }> 这个泛型必须是一个构造函数
function test<T extends { new (...args: any[]): {} }>(target: T) {
  return class extends target {
    name: string = "tom";
    age: number = 10;
  };
}

// 这个装饰器会替换原有类 Person 的定义
@test
class Person {
  name: string = "jerry";
}

const p = new Person();
console.info(p); // { name: 'tom', age: 10 }
```

### 方法装饰器

```typescript
function test(target: any, key: string, descriptor: PropertyDecorator) {
  console.info("被装饰的目标", target);
  console.info("属性名", key);
  console.info("属性描述符", descriptor);
}

class Person {
  @test
  sayHello(): void {
    // target: 实例对象
    // key: 方法名sayHello
    console.info("hello");
  }
  @test
  static sayWorld(): void {
    // target: 类
    // key: 方法名sayWorld
    console.info("world");
  }
}
```

### 属性装饰器

```typescript
// 装饰实例属性

// 装饰静态属性
```

### 参数装饰器

## 声明文件

### 什么是声明

在开发过程中不可避免的需要引入其他第三方 js 库, 但是默认情况下, ts 中直接引入这些库, ts 是不认识的, 就会导致程序报错, 没有代码提示 等问题, 此时就需要声明文件, 来告诉 ts 的编译器

```typescript
declare const $: (
  selector: string
) => {
  width(): number;
  height(): number;
  ajax(url: string, config: {}): void;
};

console.log($(".main").width());
console.log($(".main").height());
```

### 使用别人的声明

1. 查看导出方式(es6/commonjs/tsModule)
2. 使用对应的导入方式
