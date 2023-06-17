## Map 映射

映射(也叫字典)是一种非线性结构的数据, key 和 value 一一对应的数据结构

在编程语言中一般都会内置这种类似的数据结构, 但是不同的编程语言功能略有差异

在 js 中对象就是一种字典的数据结构, 在 PHP / lua 中被称为关联数组

```javascript
// 注意: 此处的 Map 不是指 JavaScript 的 Map API 而是一种泛指的概念
const dir = {
  key1: 'value1',
};

// --- lua ---
// local dir = {
//   ["keg1"] = value1
// }
// --- php ---
// $dir = [
//   'key1' => 'value1'
// ]
```

## HashMap

## HashTable

```javascript
class HashTable {
  constructor(size = 31) {
    this.size = size; // 散列表长度
    this.table = new Array(size); // 存储元素的数组
  }

  // 散列函数（这里简单地把每个字符的 ASCII 码相加）
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.size; // 取余数得到索引
  }

  // 添加键值对
  set(key, value) {
    const index = this.hash(key);
    if (!this.table[index]) {
      this.table[index] = {}; // 为新索引创建一个空对象
    }
    this.table[index][key] = value;
  }

  // 获取键对应的值
  get(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      return;
    }
    return this.table[index][key];
  }

  // 删除键值对
  delete(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      return;
    }
    const deletedValue = this.table[index][key];
    delete this.table[index][key];
    return deletedValue;
  }

  // 判断是否包含某个键
  has(key) {
    const index = this.hash(key);
    if (!this.table[index]) {
      return false;
    }
    return this.table[index].hasOwnProperty(key);
  }

  // 清空哈希表
  clear() {
    this.table = new Array(this.size);
  }
}
```
