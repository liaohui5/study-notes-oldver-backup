集合就是一个特殊的数组, 其中的元素没有顺序也不能重复

在所有的编程语言中, 几乎都包含有 `集合` 在 ES6 中有内置的 `Set/WeakSet`

```typescript
interface CollectionInterface<T> {
  // 注: 为了方便此处使用对象来保存所有数据, 那么 items 的 key 就必须是字符串,但是在
  // es6, Set 可以用对象/函数数字(非字符串类型)的值来做 key, 如果要实现 es6 的效果
  // 也非常简单在存储是同时保存 k 和 value 即可 items: Array<{ k: string; v: T }>;
  // https://www.yuque.com/liaohui5/es6/rmy3d5
  items: object;
  add: (value: T) => Collection<T>;
  has: (value: T) => boolean;
  delete: (value: T) => boolean;
  clear: () => void;
  values: () => Array<T>;
  union: (otherCollection: Collection<T>) => Collection<T>; // 并集
  intersection: (otherCollection: Collection<T>) => Collection<T>; // 交集
  difference: (otherCollection: Collection<T>) => Collection<T>; // 差集
  subset: (otherCollection: Collection<T>) => boolean; // 子集
}

class Collection<T> implements CollectionInterface<T> {
  public items = {};
  public add(value: T) {
    if (!this.has(value)) {
      this.items[String(value)] = value;
    }
    return this;
  }
  public has(value: any) {
    return this.items.hasOwnProperty(String(value));
  }
  public delete(value: any) {
    if (!this.has(value)) {
      return false;
    }
    delete this.items[String(value)];
    return true;
  }
  public clear() {
    this.items = {};
  }
  public values(): T[] {
    return Object.values(this.items);
  }
  public union(otherCollection: Collection<T>): Collection<T> {
    const unions = new Collection<T>();
    const values = this.values();
    const others = otherCollection.values();
    for (let i = 0, len = values.length; i < len; i++) {
      unions.add(values[i]);
    }

    for (let i = 0, len = others.length; i < len; i++) {
      unions.add(others[i]); // 因为 add 方法会去重, 所以可以直接 add
    }

    return unions;
  }
  public intersection(otherCollection: Collection<T>): Collection<T> {
    const intersection = new Collection<T>();
    const values = this.values();
    for (let i = 0, len = values.length; i < len; i++) {
      const item = values[i];
      if (otherCollection.has(item)) {
        intersection.add(item);
      }
    }
    return intersection;
  }
  public difference(otherCollection: Collection<T>): Collection<T> {
    const diffs = new Collection<T>();
    const values = this.values();
    for (let i = 0, len = values.length; i < len; i++) {
      const item = values[i];
      if (!otherCollection.has(item)) {
        diffs.add(item);
      }
    }
    return diffs;
  }
  public subset(otherCollection: Collection<T>): boolean {
    return this.values().every((item) => otherCollection.has(item));
  }
}
```
