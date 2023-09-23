栈是一种受限的线性数据结构


- 可以添加/修改/删除/遍历的一组有序的数据
- 不能随意操作元素, 必须按照顺序操作
- 后进先出: Last In First Out

![stack](https://raw.githubusercontent.com/liaohui5/images/main/images/202305262051073.png)

## 具体实现

### 接口

```typescript
interface StackInterface<T> {
  static from<U>(items: Iterable<U>): StackInterface<U>; // 从其他可迭代数据中获取数据生成栈
  size(): number;                                        // 栈的长度
  isEmpty(): boolean;                                    // 栈是否为空
  pop(): T | void;                                       // 出栈道
  push(): void;                                          // 入栈道
  peek(): T | void;                                      // 查看栈中的最后一个元素
  clear(): void;                                         // 清除栈
  toString(): void;                                      // 字符串序列化
}
```

### 实现

```typescript
/**
 * 栈是一种受限的线性数据结构,相较于数组来说只能后进先出
 */
export default class Stack<T> implements StackInterface<T> {
  private items: T[] = [];

  /**
   * 从其他可迭代数据中解构元素构建栈
   * @param items
   * @returns Stack<T>
   */
  public static from<U>(items: Iterable<U>): Stack<U> {
    const stack = new Stack<U>();
    for (const item of items) {
      stack.push(item);
    }
    return stack;
  }

  /**
   * 获取栈的总长度
   * @returns number
   */
  public size(): number {
    return this.items.length;
  }

  /**
   * 栈是否为空
   * @returns boolean
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * 出栈
   * @returns T | undefined
   */
  public pop(): T | void {
    return this.items.pop();
  }

  /**
   * 入栈
   * @param item
   */
  public push(item: T): void {
    this.items.push(item);
  }

  /**
   * 查看栈顶元素(但是不会执行出栈操作)
   * @returns T | undefined
   */
  public peek(): T | void {
    return this.items[this.items.length - 1];
  }

  /**
   * 清栈
   */
  public clear(): void {
    this.items = [];
  }

  /**
   * 字符串序列化
   * @returns string
   */
  public toString(): string {
    return "[" + this.items.toString() + "]";
  }
}
```


## 实际应用

```typescript
// 将10进制数转二进制字符串
// 转换规则如下:
// 1. 对2取余,获取余数
// 2. 对原来的数据 / 2 向下取整,直到数字为0
// 3. 重复1,2步骤,然后从后往前拼接余数
// 如下步骤: 将10进制的10转二进制
// 10 % 2 => 0, 10 / 2 => 5
// 5  % 2 => 1, 5  / 2 => 2
// 2  % 2 => 0, 2  / 2 => 1
// 1  % 2 => 1, 1  / 2 => 0
// 10进制的10转二进制就是 1010
function convert(num: number, base = 2) {
  let stk = new Stack<number>();
  let res = '';
  let radix = base < 2 ? (base > 16 ? 16 : base) : base;
  let hexStr = '0123456789ABCDEF';

  while (num !== 0) {
    stk.push(num % radix);
    num = Math.floor(num / radix);
  }

  while (!stk.isEmpty()) {
    // 利用后进先出的特性, 从后向前拼接字符串
    const index = stk.pop()!;
    res += hexStr[index];
  }

  return res;
}
```
