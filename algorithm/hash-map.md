> 散列表（Hash Table）

也称哈希表，是一种基于哈希函数实现的数据结构，用于存储和查找键值对。

哈希表的基本思想是将每个键值对映射到一个唯一的哈希值，然后将哈希值作为索引存储在一个数组中。当需要查找某个键对应的值时，只需要将该键作为输入参数，通过哈希函数计算出对应的哈希值，然后在数组中查找该哈希值对应的值即可。

> hash 函数

哈希函数是一种将任意长度的输入（也称为关键字或键）映射为固定长度的输出（也称为哈希值或摘要）的函数。哈希函数将输入数据的复杂性抽象成一个简单的哈希值，用于快速查找数据或验证数据的完整性。

哈希函数需要满足以下条件：

1. 对于任意输入，哈希函数的输出应该是唯一的。
2. 哈希函数的输出应该具有较好的随机性，使得每个哈希值的概率相等。
3. 哈希函数的计算速度应该尽可能快。

哈希函数在计算机科学中有着广泛的应用，例如在密码学中用于实现数字签名、消息认证和加密等操作，在哈希表中用于实现快速查找数据，在文件校验和中用于验证文件的完整性等。

常见的哈希函数有取余法、乘法散列法、MD5、SHA 等。在选择哈希函数时，需要根据具体的应用场景和需求来选择适合的哈希函数，以实现较好的性能和安全性。

```typescript
class HashTable {
  public size: number = 0;
  public table: object[] = [];
  constructor(size = 31) {
    this.size = size; // 散列表长度
    this.table = new Array(size); // 存储元素的数组
  }

  // hash 函数
  hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size; // 取余数得到索引
  }

  // 添加键值对
  set(key: string, value: any): void {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = {}; // 为新索引创建一个空对象
    }
    this.table[index][key] = value;
  }

  // 获取键对应的值
  get(key: string): any {
    const index = this.hash(key);
    if (!this.table[index]) {
      return;
    }
    return this.table[index][key];
  }

  // 删除键值对
  delete(key: string): any {
    const index = this.hash(key);
    if (!this.table[index]) {
      return;
    }
    const deletedValue = this.table[index][key];
    delete this.table[index][key];
    return deletedValue;
  }

  // 判断是否包含某个键
  has(key: string): boolean {
    const index = this.hash(key);
    if (!this.table[index]) {
      return false;
    }
    return this.table[index].hasOwnProperty(key);
  }

  // 清空哈希表
  clear(): void {
    this.table = new Array(this.size);
  }
}
```
