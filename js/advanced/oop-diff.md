> 需求

- 实现一个简易的计算器效果
- 计算 (250 + 10) \* 4 / 2 的结果

## 面向过程代码实现

```js
function jia(a, b) {
  return a + b;
}

function jian(a, b) {
  return a - b;
}

function chen(a, b) {
  return a * b;
}

function chu(a, b) {
  if (a === 0) {
    throw new Error("logic error");
  }
  if (b == 0) {
    return 0;
  }
  return a / b;
}
let result = jia(250, 10);
result = chen(result, 4);
result = chu(result, 2);
console.log(result);
```

## 面向对象代码实现

```js
class Calc {
  constructor() {
    this.result = 0;
  }
  jia(num) {
    this.result += this.a;
    return this;
  }
  jian(num) {
    this.result -= this.a;
    return this;
  }
  chen(num) {
    this.result *= this.a;
    return this;
  }
  chu(num) {
    this.result /= this.a;
    return this;
  }
  getResult() {
    return this.result;
  }
}
let calc = new Calc();
let result = calc.jia(250).jia(10).chen(4).chu(2).getResult();
console.log(result);
```

## 分析总结

> 面向过程的优缺点

- 优点: 易于理解和阅读
- 缺点: 复用程度低, 代码零散

> 面向对象的优缺点

- 优点: 易于理解和阅读
- 缺点: 代码复用度高, 灵活性高, 易于扩展

## 补充(面向对象的 es5 代码)

```js
function Calc() {
    this.result = 0;
}
Calc.prototype.jia(num) {
    this.result += num;
    return this;
}
Calc.prototype.jian(num) {
    this.result -= num;
    return this;
}
Calc.prototype.chen(num) {
    this.result *= num;
    return this;
}
Calc.prototype.chu(num) {
    this.result /= num;
    return this;
}
let calc = new Calc();
let result = calc.jia(250).jia(10).chen(4).chu(2).getResult();
console.log(result);
```
