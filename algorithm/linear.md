> 线性结构和非线性结构

```javascript
线性结构是指数据元素之间存在一种一对一的线性关系，即每个元素都只有一个直接前驱和一个直接后继。线性结构包括顺序表、链表、栈和队列等。

非线性结构是指数据元素之间存在一种复杂的关系，即每个元素可能有多个直接前驱和直接后继，或者没有直接前驱和直接后继。非线性结构包括树、图和集合等。

具体来说，顺序表、链表、栈和队列都是线性结构。其中，顺序表是一种连续的、基于数组实现的线性结构，链表是一种通过指针链接实现的线性结构，栈和队列都是基于顺序表或链表实现的特殊线性结构。

而树、图和集合都是非线性结构。树是一种层次结构，每个节点都有零个或多个子节点，其中根节点没有父节点，叶子节点没有子节点。图是一种由节点和边组成的复杂结构，其中节点可以有任意数量的相邻节点，边用于连接相邻节点。集合是一种无序的元素集合，其中每个元素都是唯一的。

总的来说，线性结构和非线性结构是数据结构中的两个基本概念，它们的实现方式和使用场景略有不同。线性结构适用于需要按照一定顺序存储和访问数据的场景，而非线性结构适用于需要表示复杂关系的场景。
```

## 数组 Array

在所有流行的编程语言中, 几乎都默认实现了数组这种数据结构(可能叫法不同, python 叫列表, lua 叫 元组)

不同的是在弱类型语言中,数组的长度是可变的但是在一些强类型的语言中,数组的长度是不可变的

- 可以添加/修改/删除/遍历的一组有序的数据

![Array](https://raw.githubusercontent.com/liaohui5/images/main/images/202305262049541.png)

```javascript
// JS 内置的数组
const arr = [1, 3, 5, 7, 9];
```

## 栈 Stack

- 可以添加/修改/删除/遍历的一组有序的数据
- 不能随意操作元素, 必须按照顺序操作
- 后进先出: Last In First Out

在 JS 中 `函数调用栈` (调试时)就是一个经典的栈

![stack](https://raw.githubusercontent.com/liaohui5/images/main/images/202305262051073.png)

```typescript
// 在 JS 中默认没有 Stack 这个数据结构, 但是可以根据数组的特点手动实现
class Stack<T> {
  private items: T[] = [];

  // 获取栈的总长度
  public size(): number {
    return this.items.length;
  }

  // 栈是否为空
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  // 出栈
  public pop(): T | null {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop()!;
  }

  // 入栈
  public push(item: T): Stack<T> {
    this.items.push(item);
    return this;
  }

  // 查看栈顶元素
  public peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.size()];
  }

  // 清栈
  public clear(): Stack<T> {
    this.items = [];
    return this;
  }

  // toString 方便调试
  public toString(): string {
    return '[' + this.items.toString() + ']';
  }
}

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

// 验证是否是成对出现的有效括号
// 像这样就是成对的: (()) ([])
// 想这样就不是成对的: ([)]
function isValidPairs(str: string): boolean {
  const len = str.length;
  if (len % 2 !== 0) {
    return false;
  }
  const stack = new Stack<string>();
  const pairsMap = {
    ')': (str: string): boolean => str === '(',
    ']': (str: string): boolean => str === '[',
    '}': (str: string): boolean => str === '[',
  };
  for (let i = 0; i < len; i++) {
    const char = str[i];
    switch (char) {
      case '(':
      case '{':
      case '[':
        stack.push(char);
        break;
      case ')':
      case '}':
      case ']':
        const handler = pairsMap[char];
        if (!handler(stack.pop()!)) {
          return false;
        }
        break;
    }
  }
  return stack.isEmpty();
}
```

## 队列 Queue

- 一组有序的数据,操作受限的数据结构
- 先进先出

![queue](https://raw.githubusercontent.com/liaohui5/images/main/images/20230526204855.png)

```typescript
// 基于数组来实现队列(也可以基于链表来实现队列)
/* prettier-ignore */
interface QueueInterface<T> {
  items: Array<T>;                     // 队列所有元素
  head: () => T | void;                // 队列第一个
  size: () => number;                  // 队列总长度
  isEmpty: () => boolean;              // 队列是否为空
  toString: () => string;              // toString
  clear: () => void;                   // 清空队列
  enqueue: (...args: any) => T | void; // 入列
  dequeue: () => T | void;             // 出列
}

// 用抽象类来实现一些逻辑高度重合的方法
abstract class QueueAbstract<T> implements QueueInterface<T> {
  public items: Array<T> = [];
  public head() {
    return this.items.length > 0 ? this.items[0] : undefined;
  }
  public size() {
    return this.items.length;
  }
  public isEmpty() {
    return this.size() === 0;
  }
  public clear() {
    this.items = [];
  }
  public toString() {
    return '[' + this.items.toString() + ']';
  }
  // 子类必须实现这些抽象方法
  abstract enqueue(value: T, priority?: number): void;
  abstract dequeue(): T | void;
}

// 最简单的队列
class Queue<T> extends QueueAbstract<T> {
  enqueue(item: T) {
    this.items.push(item);
    return this;
  }
  dequeue() {
    return this.items.shift();
  }
}

// 升序排序的优先级队列
interface PriorityQueueElement<T> {
  value: T;
  priority: number;
}
class PriorityQueue<T> extends QueueAbstract<PriorityQueueElement<T>> {
  // 创建带有优先级的队列元素
  private createPriorityQueueElement(value: T, priority: number): PriorityQueueElement<T> {
    return {
      value,
      priority,
    };
  }

  // 入列: 按照 priority 入列
  /* @ts-ignore */
  public enqueue(value: T, priority: number): void {
    const item = this.createPriorityQueueElement(value, priority);

    // 插入到最前
    if (this.isEmpty() || priority < this.head()!.priority) {
      this.items.unshift(item);
      return;
    }

    // 插入到最后
    const len = this.size();
    const tailItem = this.items[len - 1];
    if (tailItem.priority <= priority) {
      this.items.push(item);
      return;
    }

    // 在中间位置插入
    for (let i = 0; i < len; i++) {
      const current = this.items[i];
      if (current.priority > priority) {
        this.items.splice(i, 0, item);
        break;
      }
    }
  }

  // 出列
  public dequeue() {
    return this.items.shift();
  }
}
```

## 链表 LinkedList

- 一种特殊的线性结构数据(并不是通过一块连续的内存来实现的, 而是通过保存内存地址来模拟连续内存的方式实现的)

比如: JS 中的 `prototype` 继承链就是一个典型的链表

![linked-list](https://raw.githubusercontent.com/liaohui5/images/main/images/20230526204644.png)

```typescript
// ------------ //
// - 单向链表   //
// ------------ //
interface LinkedNode {
  value: any;
  next: LinkedNode | null;
}

interface LinkedListInterface<T extends LinkedNode> {
  head: T | null;
  tail: T | null;
  length: number;
  size: () => number;
  isEmpty: () => boolean;
  each: (handler: (item: T, position: number) => false | void) => void;
  isPosition: (position: number) => boolean;
  append: (value: any) => void;
  indexOf: (value: any) => number;
  getNode: (position: number) => T | null;
  removeAt: (position: number) => void;
  remove: (value: any) => void;
  insert: (position: number, value: any) => void;
  update: (position: number, value: any) => void;
  toString: () => string;
}

abstract class LinkedListAbstract<T extends LinkedNode> implements LinkedListInterface<T> {
  public head: T | null = null;
  public tail: T | null = null;
  public length: number = 0;
  abstract createNode(...args: any): T;
  abstract append(value: any): void;
  abstract insert(position: number, value: any): void;
  abstract toString(): string;
  abstract removeAt(position: number): void;

  // 是否是一个正确的 position
  public isPosition(position: number): boolean {
    if (!Number.isSafeInteger(position)) {
      throw new TypeError("[removeAt]'position' must be an integer");
    }
    if (position < 0 || position >= this.length) {
      throw new TypeError("[removeAt]'position' out of range");
    }
    return true;
  }

  // 获取链表的长度
  public size() {
    return this.length;
  }

  // 链表中是否有元素
  public isEmpty() {
    return this.length === 0;
  }

  // 遍历链表
  public each(handler: (item: T, position: number) => false | void): void {
    let i = 0;
    let current: LinkedNode = this.head!;
    while (i < this.length) {
      // callback return false 就停止遍历
      /* @ts-ignore */
      const isContinue = handler(current, i);
      if (Object.is(isContinue, false)) {
        break;
      }
      if (current.next) {
        current = current.next;
      }
      i++;
    }
  }

  // 根据值获取位置
  public getNode(position: number): T | null {
    if (!this.isPosition(position)) {
      return null;
    }
    let node: T | null = null;
    this.each((item, index) => {
      if (index === position) {
        node = item;
        return false;
      }
    });
    return node;
  }

  // 根据 node 的 value 获取 position
  public indexOf(value: any): number {
    let i = -1;
    this.each((item, index) => {
      if (value === item.value) {
        i = index;
        return false;
      }
    });
    return i;
  }

  // 更新指定位置的
  public update(position: number, value: any) {
    this.removeAt(position);
    this.insert(position, value);
  }

  // 移除元素
  public remove(value: any): void {
    const position = this.indexOf(value);
    position !== -1 && this.removeAt(position);
  }
}

// ------------ //
// - 单向链表 - //
// ------------ //
class LinkedList extends LinkedListAbstract<LinkedNode> {
  // 创建链表节点
  public createNode(value: any): LinkedNode {
    return {
      value,
      next: null,
    };
  }

  // 追加元素
  public append(value: any) {
    const node = this.createNode(value);
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      const maxIndex = this.length - 1;
      this.each((item, index) => {
        if (index === maxIndex) {
          item.next = node;
          this.tail = node;
          return false;
        }
      });
    }
    this.length++;
  }

  // 插入元素
  public insert(position: number, value: any): void {
    if (!this.isPosition(position)) {
      return;
    }
    const node = this.createNode(value);
    if (position === 0) {
      node.next = this.head;
      this.head = node;
      return;
    } else {
      const prevNodeIndex = position - 1;
      this.each((item: LinkedNode, index: number) => {
        if (index === prevNodeIndex) {
          node.next = item.next;
          item.next = node;
          return false;
        }
      });
    }
    this.length++;
  }

  // 移除元素
  public removeAt(position: number) {
    if (this.isPosition(position)) {
      return;
    }

    if (position === 0) {
      this.head = this.head!.next;
    } else {
      const prevNodeIndex = position - 1;
      this.each((item, index) => {
        if (index === prevNodeIndex) {
          item.next = item.next!.next;
          return false;
        }
      });
    }
    this.length--;
  }

  // 将这个对象转换为字符串: 为了方便调试查看
  public toString(): string {
    let str = '';
    let separator = ' -> ';
    this.each((item) => {
      str += '[' + item.value.toString() + ']' + separator;
    });
    return str.slice(0, -separator.length);
  }
}

// ------------ //
// - 双向链表 - //
// ------------ //
interface DoublyLinkedNode extends LinkedNode {
  prev: null | DoublyLinkedNode;
  next: null | DoublyLinkedNode;
}
class DoublyLinkedList extends LinkedListAbstract<DoublyLinkedNode> {
  public tail: DoublyLinkedNode | null = null;
  public head: DoublyLinkedNode | null = null;

  public toString() {
    // 为了方便调试查看
    let str = '';
    let separator = ' <=> ';
    this.each((item) => {
      str += '[' + item.value.toString() + ']' + separator;
    });
    return str.slice(0, -separator.length);
  }

  public createNode(value: any): DoublyLinkedNode {
    return {
      value,
      prev: null,
      next: null,
    };
  }

  public append(value: any) {
    const node = this.createNode(value);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      const maxIndex = this.length - 1;
      this.each((item, index) => {
        if (maxIndex === index) {
          item.next = node;
          node.prev = item;
          return false;
        }
      });
    }
    this.tail = node;
    this.length++;
  }

  public insert(position: number, value: any) {
    if (this.isPosition(position)) {
      return;
    }
    const node = this.createNode(value);

    if (position === 0) {
      // 最前面插入元素
      node.next = this.head;
      this.head = node;
    } else if (position === this.length - 1) {
      // 最后面插入元素
      this.append(value);
    } else {
      // 在中间插入元素
      this.each((item, index) => {
        if (index === position) {
          const prevNode = item.prev!;
          node.prev = prevNode;
          node.next = item;
          prevNode.next = node;
          item.prev = node;
          return false;
        }
      });
    }
    this.length++;
  }

  public removeAt(position: number) {
    if (this.isPosition(position)) {
      return;
    }
    if (position === 0) {
      this.head = this.head!.next;
      this.head!.prev = null;
      if (this.length === 1) {
        this.tail = null;
      }
    } else if (position === this.length - 1) {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    } else {
      this.each((item, index) => {
        if (index === position) {
          const prevNode = item.prev;
          const nextNode = item.next;
          prevNode!.next = nextNode;
          nextNode!.prev = prevNode;
          return false;
        }
      });
    }
    this.length--;
  }
}

// ------------ //
// - 环形链表 - //
// ------------ //
// 环形链表也可以是单向的链表, 也可以是双向的链表
class CirularLinkedList extends LinkedList {
  // class CirularLinkedList extends DoublyLinkedList {
  public constructor() {
    super();
  }
  private setTailNext() {
    this.tail!.next = this.head;
    this.setHeadPrev();
  }
  private setHeadPrev() {
    // 单向链表 Node 是没有 prev 属性的, 所以需要判断
    if (this.head!.hasOwnProperty('prev')) {
      /* @ts-ignore */
      this.head.prev = this.tail;
    }
  }
  public append(value: any) {
    super.append(value);
    this.setTailNext();
    return this;
  }
  public insert(position: number, value: any) {
    super.insert(position, value);
    this.setTailNext();
    return this;
  }
  public removeAt(position: number) {
    super.removeAt(position);
    this.setTailNext();
    return this;
  }
}

const arr = 'Hello'.split('');
const cll = new CirularLinkedList();
for (const item of arr) {
  cll.append(item);
}
console.info(cll);
```
