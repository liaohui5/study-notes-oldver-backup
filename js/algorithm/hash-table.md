> 散列表（Hash Table）
散列表也称哈希表，是一种基于哈希函数实现的数据结构，用于存储和查找键值对。

哈希表的基本思想是将每个键值对映射到一个唯一的哈希值，然后将哈希值作为索引存储在一个数组中。当需要查找某个键对应的值时，只需要将该键作为输入参数，通过哈希函数计算出对应的哈希值，然后在数组中查找该哈希值对应的值即可。

> hash 函数

哈希函数是一种将任意长度的输入（也称为关键字或键）映射为固定长度的输出（也称为哈希值或摘要）的函数。哈希函数将输入数据的复杂性抽象成一个简单的哈希值，用于快速查找数据或验证数据的完整性。

哈希函数需要满足以下条件：

1. 对于任意输入，哈希函数的输出应该是唯一的。
2. 哈希函数的输出应该具有较好的随机性，使得每个哈希值的概率相等。
3. 哈希函数的计算速度应该尽可能快。

哈希函数在计算机科学中有着广泛的应用，例如在密码学中用于实现数字签名、消息认证和加密等操作，在哈希表中用于实现快速查找数据，在文件校验和中用于验证文件的完整性等。

常见的哈希函数有取余法、乘法散列法、MD5、SHA 等。在选择哈希函数时，需要根据具体的应用场景和需求来选择适合的哈希函数，以实现较好的性能和安全性。



## 接口
```typescript
interface HashTableInterface<T> {
  size: number;
  table: Array<HashTableNode<T>>;
  // hash: (key: string) => number;
  set: (key: string, value: T) => void;
  get: (key: string) => T | void;
  has: (key: string) => boolean;
  delete: (key: string) => T | void;
  clear: () => void;
}

interface HashTableNode<T> {
  [key: string]: T,
}
```

## 实现

```typescript
const defaultHashTaleSize = 32;

/**
 * HashTable - 散列表(也叫哈希表)
 */
export default class HashTable<T> implements HashTableInterface<T> {
  public size: number = 0;
  public table: Array<HashTableNode<T>> = [];
  constructor(size = defaultHashTaleSize) {
    this.size = size;
    this.table = Array(size).fill(Object.create(null) as HashTableNode<T>);
  }

  /**
   * simple hash function
   * @param {string} key
   * @returns {number}
   */
  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size; // 取余数得到索引
  }

  /**
   * 设置 key-value 对
   * @param {string} key
   * @param {T} value
   */
  public set(key: string, value: T): void {
    const keyHash = this.hash(key);
    this.table[keyHash][key] = value;
  }

  /**
   * 根据 key 获取对应的 value
   * @param key
   * @returns {T | void}
   */
  public get(key: string): T | void {
    const keyHash = this.hash(key);
    if (!this.table[keyHash]) {
      return;
    }
    return this.table[keyHash][key];
  }

  /**
   * 删除键值对,返回删除的值
   * @param {string} key
   * @returns {T | void}
   */
  public delete(key: string): T | void {
    const keyHash = this.hash(key);
    if (!this.table[keyHash]) {
      return;
    }
    const deletedValue = this.table[keyHash][key];
    delete this.table[keyHash][key];
    return deletedValue;
  }

  /**
   * 是否包含某个 key
   * @param {string} key
   * @returns {boolean}
   */
  public has(key: string): boolean {
    const keyHash = this.hash(key);
    if (!this.table[keyHash]) {
      return false;
    }
    const node = this.table[keyHash];
    return Boolean(node && node[key]);
  }

  /**
   * 清空哈希表
   */
  public clear(): void {
    this.table = new Array(this.size);
  }
}

```
