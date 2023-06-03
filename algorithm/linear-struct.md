## 数组 Array

在所有流行的编程语言中, 几乎都默认实现了数组这种数据结构,不同的是在弱类型语言中,数组的长度是可变的但是在一些强类型的语言中,数组的长度是不可变的

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

![stack](https://raw.githubusercontent.com/liaohui5/images/main/images/202305262051073.png)

```javascript
// 在js中,默认没有这个数据结构, 但是可以手动实现
class Stack {
  _items = []; // 应该用 symbol 做私有属性
  get size() {
    return this._items.length;
  }
  pop() {
    return this._items.pop();
  }
  push(...items) {
    this._items.push(...items);
    return this;
  }
  peek() {
    return this._items.at(0);
  }
  isEmpty() {
    return this.size === 0;
  }
  clear() {
    this._items = [];
    return this;
  }
  toString() {
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

function convert(decnum, base = 2) {
  let num = decnum;
  let stk = new Stack();
  let res = '';
  let radix = base < 2 ? (base > 16 ? 16 : base) : base;
  let hex_str = '0123456789ABCDEF';

  while (num !== 0) {
    stk.push(num % radix);
    num = Math.floor(num / radix);
  }

  while (!stk.isEmpty()) {
    const hex_index = stk.pop();
    // 利用后进先出的特性, 从后向前拼接字符串
    res += hex_str[hex_index];
  }

  return res;
}

// 验证是否是成对出现的有效括号
function validBracketPairs(str) {
  const len = str.length;
  if (len < 2) {
    return false;
  }
  const stack = new Stack();
  for (let i = 0; i < len; i++) {
    const char = str[i];
    switch (char) {
      case '(':
      case '{':
      case '[':
        stack.push(char);
        break;
      case ')':
        if ('(' !== stack.pop()) {
          return false;
        }
        break;
      case '}':
        if ('{' !== stack.pop()) {
          return false;
        }
        break;
      case ']':
        if ('[' !== stack.pop()) {
          return false;
        }
        break;
      default:
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

```javascript
// 最简单的队列
class Queue {
  _items = []; // 应该用 Symbol 做成私有属性
  get head() {
    return this._items.at(0);
  }
  get size() {
    return this._items.length;
  }
  enqueue(item) {
    // 入列
    this._items.push(item);
    return this;
  }
  dequeue() {
    // 出列
    return this._items.shift();
  }
  isEmpty() {
    return this.size === 0;
  }
  clear() {
    this._items = [];
    return this;
  }
  toString() {
    return '[' + this._items.toString() + ']';
  }
}

// 升序排序的优先级队列
class PriorityQueue extends Queue {
  enqueue(element, priority) {
    function createPriorityQueueItem(element, priority) {
      return {
        element,
        priority: Math.floor(priority),
      };
    }

    if (typeof priority !== 'number') {
      throw new TypeError('[enqueue]:priority must be a number');
    }

    const item = createPriorityQueueItem(element, priority);

    // 插入到最前
    if (this.isEmpty() || priority < this.head.priority) {
      this._items.unshift(item);
      return this;
    }
    // 插入到最后
    if (this._items.at(-1).priority <= priority) {
      this._items.push(item);
      return this;
    }

    // 在中间位置插入
    for (let i = 0; i < this._items.length; i++) {
      const current = this._items[i];
      if (current.priority > priority) {
        this._items.splice(i, 0, item);
        return this;
      }
    }
    return this;
  }
  dequeue(hasPriority = true) {
    const dequeueItem = this._items.shift();
    return hasPriority ? dequeueItem : dequeueItem.element;
  }
}
```

## 链表 LinkedList

- 一种特殊的线性结构数据

![linked-list](https://raw.githubusercontent.com/liaohui5/images/main/images/20230526204644.png)

```javascript
// ------------ //
// - 单向链表   //
// ------------ //
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }
  size() {
    return this.length;
  }
  isEmpty() {
    return this.length === 0;
  }
  createNode(element) {
    return new Node(element);
  }
  each(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError("[each]'callback' must be an function");
    }
    let i = 0;
    let current = this.head;
    while (i < this.length) {
      // callback return false 就停止遍历
      const result = callback(current, i);
      if (Object.is(result, false)) {
        break;
      }
      current = current.next;
      i++;
    }
  }
  append(element) {
    const node = this.createNode(element);
    if (this.isEmpty()) {
      this.head = node;
    } else {
      const maxIndex = this.length - 1;
      this.each((item, index) => {
        if (index === maxIndex) {
          item.next = node;
          return false;
        }
      });
    }
    this.length++;
    return this;
  }
  insert(position, element) {
    if (!Number.isSafeInteger(position)) {
      throw new TypeError('[insert]position must be an integer');
    }
    if (position < 0 || position >= this.length) {
      throw new RangeError('[insert]index out of range');
    }
    const node = this.createNode(element);
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      const prevNodeIndex = position - 1;
      this.each((item, index) => {
        if (index === prevNodeIndex) {
          node.next = item.next;
          item.next = node;
          return false;
        }
      });
    }
    this.length++;
    return this;
  }
  get(position) {
    if (!Number.isSafeInteger(position)) {
      throw new TypeError('[insert]position must be an integer');
    }
    let node = null;
    if (position < 0 || position >= this.length) {
      return node;
    }
    this.each((item, index) => {
      if (index === position) {
        node = item;
        return false;
      }
    });
    return node;
  }
  indexOf(element) {
    let i = -1;
    this.each((item, index) => {
      if (element === item.element) {
        i = index;
        return false;
      }
    });
    return i;
  }
  removeAt(position) {
    if (!Number.isSafeInteger(position)) {
      throw new TypeError("[removeAt]'position' must be an integer");
    }
    if (position < 0 || position >= this.length) {
      throw new RangeError("[removeAt]'index' out of range");
    }

    if (position === 0) {
      this.head = this.head.next;
    } else {
      const prevNodeIndex = position - 1;
      this.each((item, index) => {
        if (index === prevNodeIndex) {
          item.next = item.next.next;
          return false;
        }
      });
    }
    this.length--;
    return this;
  }
  update(position, element) {
    this.removeAt(position);
    this.insert(position, element);
    return this;
  }
  remove(element) {
    const position = this.indexOf(element);
    if (position !== -1) {
      this.removeAt(position);
    }
    return this;
  }
  toString() {
    // 为了方便调试查看
    let str = '';
    let separator = ' -> ';
    this.each((item) => {
      str += '[' + item.element.toString() + ']' + separator;
    });
    return str.slice(0, -separator.length);
  }
}

// ------------ //
// - 双向链表   //
// ------------ //
class DoublyNode extends Node {
  constructor(element) {
    super(element);
    this.prev = null;
  }
}
class DoublyLinkedList extends LinkedList {
  constructor() {
    super();
    this.tail = null;
  }
  toString() {
    // 为了方便调试查看
    let str = '';
    let separator = ' <=> ';
    this.each((item) => {
      str += '[' + item.element.toString() + ']' + separator;
    });
    return str.slice(0, -separator.length);
  }
  createNode(element) {
    return new DoublyNode(element);
  }
  append(element) {
    const node = this.createNode(element);
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
    return this;
  }
  insert(position, element) {
    if (!Number.isSafeInteger(position)) {
      throw new TypeError("[insert]'position' must be an integer");
    }
    if (position < 0 || position >= this.length) {
      throw new RangeError("[insert]'index' out of range");
    }
    const node = this.createNode(element);

    if (position === 0) {
      // 最前面插入元素
      node.next = this.head;
      this.head = node;
    } else if (position === this.length - 1) {
      // 最后面插入元素
      this.append(element);
    } else {
      // 在中间插入元素
      this.each((item, index) => {
        if (index === position) {
          const prevNode = item.prev;
          node.prev = prevNode;
          node.next = item;
          prevNode.next = node;
          item.prev = node;
          return false;
        }
      });
    }
    this.length++;
    return this;
  }
  removeAt(position) {
    if (!Number.isSafeInteger(position)) {
      throw new TypeError('[removeAt]position must be an integer');
    }
    if (position < 0 || position >= this.length) {
      throw new RangeError('[removeAt]index out of range');
    }
    if (position === 0) {
      this.head = this.head.next;
      this.head.prev = null;
      if (this.length === 1) {
        this.tail = null;
      }
    } else if (position === this.length - 1) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    } else {
      this.each((item, index) => {
        if (index === position) {
          const prevNode = item.prev;
          const nextNode = item.next;
          prevNode.next = nextNode;
          nextNode.prev = prevNode;
          return false;
        }
      });
    }
    this.length--;
    return this;
  }
}

const linkedList = new LinkedList();
const dblLinkedList = new DoublyLinkedList();
for (let i = 0; i < 6; i++) {
  const item = 'node-' + i;
  linkedList.append(item);
  dblLinkedList.append(item);
}

linkedList.append('append-item').insert(2, 'insert-item').update(2, 'insert-item(updated)').removeAt(4);
dblLinkedList.append('append-item').insert(2, 'insert-item').update(2, 'insert-item(updated)').removeAt(4);

console.info(linkedList.toString());
console.info(linkedList);

console.info(dblLinkedList.toString());
console.info(dblLinkedList);
```
