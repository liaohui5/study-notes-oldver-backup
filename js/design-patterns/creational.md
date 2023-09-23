## 工厂模式(工厂方法)

通过传入不同的参数来创建不同的类, 而不是直接使用 new 关键字, 好处是便于扩展

假如需求是这样的, 实现一个工具库, 可以将数据存入不同的介质中, 应该如何设计代码实现?

```javascript
// 如果不使用工厂模式, 用什么就 new 什么
class FileCache {
  get() {}
  set() {}
}
class MemeoryCache {
  get() {}
  set() {}
}
class RedisCache {
  get() {}
  set() {}
}

// 这样会导致代码耦合性非常高, 在哪用就要在哪里依赖, 好处是方便简单
const fileCache = new FileCache();
const memeoryCache = new MemeoryCache();
const redisCache = new RedisCache();
```

```javascript
// 使用工厂模式, 支持的类都通过 factory 方法来生成, 想要什么就传入对应的方法
class FileCache {
  get() {}
  set() {}
}
class MemeoryCache {
  get() {}
  set() {}
}
class RedisCache {
  get() {}
  set() {}
}

// 如果是通过方法实例化,只需要导入这个 cacheFactory, 而且如果要扩展一个新的类
// 可以直接增加 allowTypes 和对应的case和类, 可以方便扩展
function cacheFactory(type, config) {
  const allowTypes = ['file', 'memory', 'redis'];
  if (!allowTypes.includes(type)) {
    throw new TypeError('[cacheFactory]:unknown cache type');
  }
  let cacheManager = null;
  switch (type) {
    case 'file':
      cacheManager = new FileCache(config);
      break;
    case 'memory':
      cacheManager = new MemoryCache(config);
      break;
    case 'redis':
      cacheManager = new RedisCache(config);
      break;
  }
  return cacheManager;
}
```

## 单例模式

所谓单例就是这个类只能有一个实例对象, 比如数据库链接类, 比如一些全局的工具类

- 全局缓存工具类
- 数据库连接池
- 浏览器的 window 对象, nodejs 的 global 对象
- [用 js 创建提示信息遮罩弹窗]()

> 小知识: 在 JavaScript 面向对象中, 如果在构造函数中手动返回一个引用值, 那么 new 的结果就是引用值

### ES5

```javascript
// ES5 实现方式: 利用闭包
// 将唯一实例变量私有化, 也可以像 es6 一样将 _instance
// 设置到静态属性上, 两种方式都可以实现
var ConnectionManager = (function () {
  var _instance = null;
  function ConnectionManager(config) {
    if (!_instance) {
      _instance = this;
    }

    this.init(config);
    return _instance;
  }

  // 提供获取唯一实例的方法
  ConnectionManager.getInstance = function (config) {
    return new ConnectionManager(config);
  };

  // 其他操作
  ConnectionManager.prototype.init = function (config) {
    console.log('数据库链接成功', config);
  };

  return ConnectionManager;
})();

var host = '127.0.0.1';
var c1 = new ConnectionManager(host);
var c2 = new ConnectionManager(host);
var c3 = ConnectionManager.getInstance(host);
var c4 = ConnectionManager.getInstance(host);
console.log(c1 === c2); // output: true
console.log(c1 === c3); // output: true
console.log(c1 === c4); // output: true
console.log(c2 === c3); // output: true
console.log(c2 === c4); // output: true
```

### ES6

```javascript
class ConnectionManager {
  // 将唯一实例放到静态属性上
  static _instance = null;
  constructor(config) {
    if (!ConnectionManager._instance) {
      ConnectionManager._instance = this;
    }
    // 传入参数等其他操作
    this.init(config);
    return ConnectionManager._instance;
  }

  // 提供获取唯一实例的方法
  static getInstance(config) {
    return new ConnectionManager(config);
  }

  init(config) {
    console.info('数据库链接成功:', config);
  }
}

// 无论是使用 new 还是使用 getInstance 方法, 获取到的都是唯一实例
var host = '127.0.0.1';
var c1 = new ConnectionManager(host);
var c2 = new ConnectionManager(host);
var c3 = ConnectionManager.getInstance(host);
var c4 = ConnectionManager.getInstance(host);
console.log(c1 === c2); // output: true
console.log(c1 === c3); // output: true
console.log(c1 === c4); // output: true
console.log(c2 === c3); // output: true
console.log(c2 === c4); // output: true
```


## 原型模式

原型继承


