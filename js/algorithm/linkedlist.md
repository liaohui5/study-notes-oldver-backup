- 一种特殊的线性结构数据(并不是通过一块连续的内存来实现的, 而是通过保存内存地址来模拟连续内存的方式实现的)

链表是一种非常常见的数据结构, 比如: JS 中的继承链就是一个典型的链表

![linked-list](https://raw.githubusercontent.com/liaohui5/images/main/images/20230526204644.png)

## 实现

### 接口

```typescript
// 链接节点接口
interface LinkedNode<T> {
  value: T;
  next: LinkedNode<T> | null;
}

// 双向链表节点接口
interface DoublyLinkedNode<T> extends LinkedNode<T> {
  prev: null | DoublyLinkedNode<T>;
  next: null | DoublyLinkedNode<T>;
}

// 链表接口
interface LinkedListInterface<T, P> {
  head: P | null;
  tail: P | null;
  length: number;
  size: () => number;
  isEmpty: () => boolean;
  insert: (position: number, value: T) => void;
  removeAt: (position: number) => void;
  toString: () => string;
  append: (value: T) => void;
  prepend: (value: T) => void;
  getNode: (position: number) => P | null;
  setNode: (position: number, value: T) => boolean;
  forEach: (handler: (item: P, position: number) => false | void) => void;
  indexOf: (value: T) => number;
  remove: (value: T) => void;
  clear: () => void;
}
```

### 抽象类公共方法

```typescript
/**
  * 用抽象类实现一些公共的方法
  */
export default abstract class LinkedListAbstract<T, P extends LinkedNode<T> | DoublyLinkedNode<T>> implements LinkedListInterface<T, P> {
  public head: null | P = null;
  public tail: null | P = null;
  public length: number = 0;

  // 派生类必须实现这些方法
  abstract createNode(value: T): P;
  abstract insert: (position: number, value: T) => void;
  abstract removeAt(position: number): void;
  abstract toString(): string;

  /**
   * 获取链表的长度(节点个数)
   * @returns number
   */
  public size(): number {
    return this.length;
  }

  /**
   * 链表中是否有节点
   * @returns boolean
   */
  public isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * 遍历链表中所有的节点, 并且将遍历的节点传入回调方法
   * @param handler CallableFunction
   * @returns void
   */
  public forEach(handler: (item: P, position: number) => false | void): void {
    let index: number = 0;
    let length: number = this.length;
    if (length === 0) {
      return;
    }

    // 为什么不判断 current && current.next 作为 while 的条件?
    // 这样判断的坏处是, 如果是环形链表, 就会无限死循环
    let current: P = this.head!;
    while (index < length) {
      const isContinue = handler(current, index);
      if (Object.is(isContinue, false)) {
        break;
      }
      /* @ts-ignore */
      current = current.next;
      index++;
    }
  }

  /**
   * 根据链表节点的位置获取节点
   * @param position number
   * @returns P | null
   */
  public getNode(position: number): P | null {
    if (position < 0 || position >= this.length) {
      return null;
    }
    let node: P | null = null;
    this.forEach((item, index) => {
      if (index === position) {
        node = item;
        return false;
      }
    });
    return node;
  }

  /**
   * 更新指定位置的节点的 value
   * @param position number
   * @param value T
   */
  public setNode(position: number, value: T): boolean {
    const node = this.getNode(position);
    if (node) {
      node.value = value;
      return true;
    }
    return false;
  }

  /**
   * 根据链表节点的 value 获取节点的位置, 没有找到返回-1
   * @param value T
   * @returns number
   */
  public indexOf(value: T): number {
    let i = -1;
    this.forEach((item, index) => {
      if (value === item.value) {
        i = index;
        return false;
      }
    });
    return i;
  }

  /**
   * 根据链表节点的 value 来查找节点,然后移除
   * @param value T
   */
  public remove(value: T): void {
    const position = this.indexOf(value);
    position !== -1 && this.removeAt(position);
  }

  /**
   * 清空链表
   */
  public clear(): void {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * 在链表最前面插入链表节点
   * @param value T
   */
  public prepend(value: T): void {
    this.insert(0, value);
  }

  /**
   * 在链表的最后面追加链表节点
   * @param value T
   */
  public append(value: T): void {
    if (this.isEmpty()) {
      this.insert(0, value);
    } else {
      this.insert(this.length, value);
    }
  }
}
```

### 单向链表

```typescript
import LinkedListAbstract from "./LinkedListAbstract";

/**
 * 单向链表
 */
export default class LinkedList<T> extends LinkedListAbstract<T, LinkedNode<T>> {
  /**
   * 创建链表节点
   * @param value T
   * @returns P
   */
  public createNode(value: T): LinkedNode<T> {
    return {
      value,
      next: null,
    };
  }

  /**
   * 插入链表节点
   * @param position number
   * @param value T
   */
  /* @ts-ignore */
  public insert(position: number, value: T): void {
    const node = this.createNode(value);

    if (this.isEmpty()) {
      // 如果链表为空,直接在最前面插入节点
      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }

    const maxPosition = this.length;
    if (position === 0) {
      // 链表不为空, 插入位置为 0, 在最前方插入节点
      node.next = this.head;
      this.head = node;
    } else if (position === maxPosition) {
      // 链表也不为空, 插入位置为最后一个节点的位置+1, 在最后面追加元素
      const tailNode = this.tail!;
      tailNode.next = node;
      this.tail = node;
    } else if (position > 0 && position < maxPosition) {
      // 链表也不为空, 插入位置不在最前/最后, 在中间插入元素
      const prevNodeIndex: number = position - 1;
      const prevNode = this.getNode(prevNodeIndex)!;
      node.next = prevNode.next;
      prevNode.next = node;
    } else {
      throw new RangeError("[insert]'position' out of range");
    }
    this.length++;
  }

  /**
   * 移除指定位置的链表节点
   * @param position number
   */
  public removeAt(position: number): void {
    if (this.isEmpty()) {
      return;
    }
    const maxPosition = this.length - 1;
    if (position === 0) {
      // 移除最前面的链表节点
      this.head = this.head!.next;
    } else if (position === maxPosition) {
      // 移除最后面的链表节点
      const tailPrevNode = this.getNode(maxPosition - 1)!;
      tailPrevNode.next = null;
      this.tail = tailPrevNode;
    } else if (position > 0 && position < maxPosition) {
      // 移除中间的链表节点
      const prevNode = this.getNode(position - 1)!;
      prevNode.next = prevNode.next!.next;
    } else {
      throw new RangeError("[removeAt]'position' out of range");
    }
    this.length--;
  }

  /**
   * 链表字符串序列化
   * @returns string
   */
  public toString(): string {
    let str = "";
    let separator = " -> ";
    this.forEach((item) => {
      str += "[" + String(item.value) + "]" + separator;
    });
    return str.slice(0, -separator.length);
  }
}
```

### 双向链表

```typescript
import LinkedListAbstract from "./LinkedListAbstract";

/**
 * 双向链表
 */
export default class DoublyLinkedList<T> extends LinkedListAbstract<T, DoublyLinkedNode<T>> {
  /**
   * 创建链表节点
   * @param value T
   * @returns P
   */
  public createNode(value: T): DoublyLinkedNode<T> {
    return {
      value,
      next: null,
      prev: null,
    };
  }

  /**
   * 插入链表节点
   * @param position number
   * @param value T
   */
  /* @ts-ignore */
  public insert(position: number, value: T): void {
    const node = this.createNode(value);

    // 如果链表为空,那么就不用管position的值,直接在最前面插入
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
      this.length++;
      return;
    }

    const maxPosition = this.length;
    if (position === 0) {
      // 链表不为空, 插入位置为 0, 在最前方插入
      const headNode = this.head!;
      headNode.prev = node;
      node.next = headNode;
      this.head = node;
    } else if (position === maxPosition) {
      // 链表也不为空, 插入位置为最后一个节点的位置+1, 在最后面追加元素
      const tailNode = this.tail!;
      tailNode.next = node;
      node.prev = tailNode;
      this.tail = node;
    } else if (position > 0 && position < maxPosition) {
      // 链表也不为空, 插入位置不在最前/最后, 在中间插入元素
      const targetNode = this.getNode(position)!;
      node.prev = targetNode.prev;
      node.next = targetNode;
      targetNode.prev = node;
    } else {
      throw new RangeError("[insert]'position' out of range");
    }
    this.length++;
  }

  /**
   * 移除指定位置的链表节点
   * @param position number
   */
  public removeAt(position: number): void {
    if (this.isEmpty()) {
      return;
    }

    const maxPosition = this.length - 1;
    if (position === 0) {
      // 移除最前面的链表节点
      this.head = this.head!.next;
    } else if (position === maxPosition) {
      // 移除最后面的链表节点
      const tailPrevNode = this.tail!.prev!;
      tailPrevNode.next = null;
      this.tail = tailPrevNode;
    } else if (position > 0 && position < maxPosition) {
      // 移除中间的链表节点
      const targetNode = this.getNode(position)!;
      targetNode.prev!.next = targetNode.next;
      targetNode.next!.prev = targetNode.prev;
    } else {
      throw new RangeError("[removeAt]'position' out of range");
    }
    this.length--;
  }

  /**
   * 链表字符串序列化
   * @returns string
   */
  public toString(): string {
    let str = "";
    let separator = " <=> ";
    this.forEach((item) => {
      str += "[" + String(item.value) + "]" + separator;
    });
    return str.slice(0, -separator.length);
  }
}
```

### 环形链表

```typescript
import DoublyLinkedList from "./DoublyLinkedList";
import LinkedList from "./LinkedList";

/**
 * 单向环形链表
 */
export class CirularLinkedList<T> extends LinkedList<T> {
  /**
   * 让最后一个链表节点的 next 指向第一个节点
   */
  private setTailNext() {
    if (this.tail && this.length > 1) {
      this.tail!.next = this.head;
    }
  }

  /**
   * 调用父类的 insert 方法后, 修改 tail 节点的 next 指向
   */
  public insert(position: number, value: T): void {
    super.insert(position, value);
    this.setTailNext();
  }

  /**
   * 调用父类的 removeAt 方法后, 修改 tail 节点的 next 指向
   */
  public removeAt(position: number): void {
    super.removeAt(position);
    this.setTailNext();
  }
}

/**
 * 双向环形链表
 */
export class DoublyCirularLinkedList<T> extends DoublyLinkedList<T> {
  /**
   * 让最后一个链表节点的 next 指向第一个节点
   */
  private setTailNext() {
    if (this.tail && this.length > 1) {
      this.tail!.next = this.head;
    }
  }

  /**
   * 让第一个链表节点的 prev 指向最后一个节点
   */
  private setHeadPrev() {
    if (this.head && this.length > 1) {
      this.head!.prev = this.tail;
    }
  }

  /**
   * 调用父类的 insert 方法后, 修改 tail 节点的 next 指向, head 节点的 prev 指向
   */
  public insert(position: number, value: T): void {
    super.insert(position, value);
    this.setTailNext();
    this.setHeadPrev();
  }

  /**
   * 调用父类的 removeAt 方法后, 修改 tail 节点的 next 指向, head 节点的 prev 指向
   */
  public removeAt(position: number): void {
    super.removeAt(position);
    this.setTailNext();
    this.setHeadPrev();
  }
}
```


## 应用

### 用链表实现栈

```typescript
import LinkedList from "./LinkedList";

/**
 * 栈是一种受限的线性数据结构,相较于数组来说只能后进先出
 * 这个与 Stack 目录中不同的是, 这个是基于链表实现
 */
export default class Stack<T> {
  private items: LinkedList<T> = new LinkedList<T>();

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
    if (this.items.isEmpty()) {
      return;
    }
    const tailNode = this.items.tail!;
    this.items.removeAt(this.items.length - 1);
    return tailNode.value;
  }

  /**
   * 入栈
   * @param item
   * @returns Stack<T>
   */
  public push(item: T): Stack<T> {
    this.items.append(item);
    return this;
  }

  /**
   * 查看栈顶元素(但是不会执行出栈操作)
   * @returns T | undefined
   */
  public peek(): T | void {
    if (this.isEmpty()) {
      return;
    }
    return this.items.tail!.value;
  }

  /**
   * 清栈
   * @returns Stack<T>
   */
  public clear(): Stack<T> {
    this.items.clear();
    return this;
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

### 用链表实现队列

```typescript
import LinkedList from "./LinkedList";

/**
 * 用抽象类来实现一些逻辑高度重合的方法
 */
export default class Queue<T> {
  public items: LinkedList<T> = new LinkedList<T>();

  /**
   * 查看队列的第一个元素(并不执行出列操作)
   * @returns T | undefined
   */
  public head() {
    if (this.items.isEmpty()) {
      return;
    }
    return this.items.getNode(0)!.value;
  }

  /**
   * 队列的长度(元素的个数)
   * @returns number
   */
  public size(): number {
    return this.items.size();
  }

  /**
   * 队列是否为空
   * @returns boolean
   */
  public isEmpty(): boolean {
    return this.items.size() === 0;
  }

  /**
   * 清空队列
   */
  public clear() {
    this.items.clear();
  }

  /**
   * 字符串序列化队列
   * @returns string
   */
  public toString() {
    return "[" + this.items.toString() + "]";
  }

  /**
   * 默认实现,可以覆盖(出列)
   * @returns
   */
  public dequeue() {
    if (this.items.isEmpty()) {
      return;
    }
    const headNode = this.items.head!;
    this.items.removeAt(0);
    return headNode.value;
  }

  /**
   * 入列
   * @param value T
   */
  public enqueue(value: T): void {
    this.items.append(value);
  }

  /**
   * 从其他可迭代数据中提取元素生成队列
   * @param items 队列元素
   * @returns
   */
  public static from<U>(items: Iterable<U>): Queue<U> {
    const queue = new Queue<U>();
    for (const item of items) {
      queue.enqueue(item);
    }
    return queue;
  }
}
```
