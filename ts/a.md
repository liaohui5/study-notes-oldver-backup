## 接口


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
declare const $: (selector: string) => {
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
