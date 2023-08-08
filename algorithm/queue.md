队列是一种操作受限的线性数据结构

- 一组有序的数据,操作受限的数据结构
- 先进先出

![queue](https://raw.githubusercontent.com/liaohui5/images/main/images/20230526204855.png)

## 接口

```typescript
// 队列接口
interface QueueInterface<T> {
  items: T[];                                     // 队列所有元素
  head: () => T | undefined;                      // 队列第一个
  size: () => number;                             // 队列总长度
  isEmpty: () => boolean;                         // 队列是否为空
  toString: () => string;                         // toString
  clear: () => void;                              // 清空队列
  enqueue: (value: T, priority?: number) => void; // 入列
  dequeue: () => T | void;                        // 出列
}

// 升序排序的优先级队列
// 优先级的队列与普通队列不同的地方在于:
// 元素不是根据执行的先后顺序排列, 而是根据优先级顺序来进行排列操作
interface PriorityQueueElement<T> {
  value: T;
  priority: number;
}
```

## 用抽象类来抽取公共方法

```typescript
/**
 * 用抽象类来实现一些逻辑高度重合的方法
 */
export default abstract class QueueAbstract<T> implements QueueInterface<T> {
  public items: T[] = [];

  /**
   * 查看队列的第一个元素(并不执行出列操作)
   * @returns T | undefined
   */
  public head() {
    return this.items.length > 0 ? this.items[0] : undefined;
  }

  /**
   * 队列的长度(元素的个数)
   * @returns number
   */
  public size(): number {
    return this.items.length;
  }

  /**
   * 队列是否为空
   * @returns boolean
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * 清空队列
   */
  public clear() {
    this.items = [];
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
    return this.items.shift();
  }

  /**
   *
   * @param args
   */
  abstract enqueue(value: T, priority?: number): void;
}
```

## 普通队列

```typescript
import QueueAbstract from "./QueueAbstract";

/**
 * 最简单的队列
 */
export default class Queue<T> extends QueueAbstract<T> {
  /**
   * 从其他可迭代数据从提取元素生成队列
   * @param items 队列元素
   * @returns
   */
  public static from<U>(items: Array<U> | Set<U>): Queue<U> {
    const queue = new Queue<U>();
    for (const item of items) {
      queue.enqueue(item);
    }
    return queue;
  }

  /**
   * 入列
   * @returns Queue<T>
   */
  public enqueue(item: T) {
    this.items.push(item);
    return this;
  }
}
```

## 优先级队列

```typescript
import QueueAbstract from "./QueueAbstract";

/**
 * 带有优先级的队列
 */
export default class PriorityQueue<T> extends QueueAbstract<PriorityQueueElement<T>> {
  /**
   * 创建带有优先级的队列元素
   * @param value T
   * @param priority
   * @returns PriorityQueueElement<T>
   */
  private createPriorityQueueElement(value: T, priority: number): PriorityQueueElement<T> {
    return {
      value,
      priority,
    };
  }

  /**
   * 入列: 按照元素的优先级入列
   * @param value
   * @param priority
   * @returns
   */
  /* @ts-ignore */
  public enqueue(value: T, priority: number): void {
    const element = this.createPriorityQueueElement(value, priority);

    // 插入到最前
    if (this.isEmpty() || priority < (this.head() as PriorityQueueElement<T>).priority) {
      this.items.unshift(element);
      return;
    }

    // 插入到最后
    const len = this.size();
    const tailItem = this.items[len - 1];
    if (tailItem.priority <= priority) {
      this.items.push(element);
      return;
    }

    // 在中间位置插入
    for (let i = 0; i < len; i++) {
      const current = this.items[i];
      if (current.priority > priority) {
        this.items.splice(i, 0, element);
        break;
      }
    }
  }

  /**
   * 查看第一个元素(值)
   * @returns
   */
  /* @ts-ignore */
  public head(): T | void {
    const element = super.head();
    if (element) {
      return element.value;
    }
  }

  /**
   * 出列
   * @returns
   */
  /* @ts-ignore */
  public dequeue(): T | void {
    const element = super.dequeue();
    if (element) {
      return element.value;
    }
  }
}
```

## 异步任务队列

TODO: 实现异步任务队列

