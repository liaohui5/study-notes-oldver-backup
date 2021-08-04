### 待遍历的数据

```js
var data = [
  {
    label: "肉类",
    children: [
      {
        label: "猪肉",
        children: [
          {
            label: "五花肉",
          },
          {
            label: "里脊肉",
          },
        ],
      },
      {
        label: "鸡肉",
        children: [
          {
            label: "鸡腿",
          },
          {
            label: "鸡翅",
          },
        ],
      },
    ],
  },
  {
    label: "蔬菜",
    children: [
      {
        label: "叶菜类",
        children: [
          {
            label: "大白菜",
          },
          {
            label: "小白菜",
          },
        ],
      },
      {
        label: "根茎类",
        children: [
          {
            label: "萝卜",
          },
          {
            label: "土豆",
          },
        ],
      },
    ],
  },
];
```

### 深度遍历(纵向遍历)

```js
// 递归遍历: 最常见的办法, 性能并不好
function forEachTree(data, callback, subItemsKey = "children") {
  if (data instanceof Array && typeof cb === "function") {
    var item;
    for (var i = 0; i < data.length; i++) {
      item = data[i];
      if (item[subItemsKey]) {
        // 如果有 children 就继续执行 deepEach
        forEachTree(item[subItemsKey], callback);
      } else {
        callback(item);
      }
    }
  }
}

var str = "";
forEachTree(data, (item, index) => {
  str += item.label + "=>";
});
document.write(str);
```

### 广度遍历(横向便利)

```js
// 遍历树形结构数据(性能比递归好)
function forEachTree(tree, callback, subItemsKey = "children") {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }

  var stack = [].concat(tree);
  var item;
  while (stack.length) {
    item = stack.pop();
    if (item[subItemsKey]) {
      stack = stack.concat(item[subItemsKey]);
    } else {
      callback(item);
    }
  }
}

var str = "";
forEachTree(data, (item, index) => {
  str += item.label + "=>";
});
document.write(str);
```

## 将平铺的线性数据转为树形数据(深度克隆 + 递归 -> 性能并不好)

```js
// 生成树形数据: 深度克隆 + 递归(性能并不好)
function getTree(
  data,
  childKey = "id",
  parentKey = "pid",
  subItemsKey = "children"
) {
  const cloneDatas = JSON.parse(JSON.stringify(data));
  return cloneDatas.filter((root) => {
    const children = cloneDatas.filter(
      (child) => root[childKey] === child[parentKey]
    );
    if (children.length) {
      root[subItemsKey] = children;
    }
    return root.pid === 0;
  });
}

var menus = [
  {
    id: 1,
    desc: "用户管理",
    path: "",
    level: 0,
    pid: 0,
  },
  {
    id: 2,
    desc: "用户列表",
    path: "/users",
    level: 1,
    pid: 1,
  },
  {
    id: 3,
    desc: "权限管理",
    path: null,
    level: 0,
    pid: 0,
  },
  {
    id: 4,
    desc: "角色管理",
    path: "/roles",
    level: 1,
    pid: 3,
  },
  {
    id: 5,
    desc: "权限管理",
    path: "/permissions",
    level: 1,
    pid: 3,
  },
];

menus = getTree(menus);
console.log(menus);
```

## 将平铺的线性数据转为树形数据(映射 + 引用)

```js
// 生成树形数据: 映射 + 引用(推荐, 性能比递归好)

function getTree(
  data,
  rootId = 0,
  idKey = "id",
  parentKey = "pid",
  childrenKey = "children"
) {
  if (!Array.isArray(data)) {
    throw new TypeError("data must be an Array instance");
  }

  var uidMap = {};
  var res = [];

  var id, pid, item, treeItem;
  for (var i = 0, l = data.length; i < l; i++) {
    item = data[i];
    id = item[idKey];
    pid = item[parentKey];

    // 映射中是否有当前ID的数据: 如果没有就添加映射, 如果有, 合并之前的映射
    if (!uidMap[id]) {
      uidMap[id] = item;
    } else {
      uidMap[id] = { ...item, ...uidMap[id] };
    }

    treeItem = uidMap[id];

    if (pid === rootId) {
      // 1级分类: 用户管理(id=1) 权限管理(id=3)
      res.push(treeItem);
      continue;
    }

    // 比如第5次循环: i=4 -> uidMap[menus[4].pid] -> uidMap[3]
    // 如果映射中没有父类(而且pid也不是rootId), 就初始化为空对象
    if (!uidMap[pid]) {
      uidMap[pid] = {};
    }

    // 比如第5次循环: i=4 -> uidMap[menus[4].pid] -> uidMap[3].children
    // 如果映射中有父类, 但是没有 children 这个属性, 就初始化为空 数组
    if (!uidMap[pid][childrenKey]) {
      uidMap[pid][childrenKey] = [];
    }

    // 处理二级数据
    uidMap[pid][childrenKey].push(treeItem);
  }

  return res;
}

var menus = [
  {
    id: 1,
    desc: "用户管理",
    path: "",
    level: 0,
    pid: 0,
  },
  {
    id: 2,
    desc: "用户列表",
    path: "/users",
    level: 1,
    pid: 1,
  },
  {
    id: 3,
    desc: "权限管理",
    path: null,
    level: 0,
    pid: 0,
  },
  {
    id: 4,
    desc: "角色管理",
    path: "/roles",
    level: 1,
    pid: 3,
  },
  {
    id: 5,
    desc: "权限管理",
    path: "/permissions",
    level: 1,
    pid: 3,
  },
  {
    id: 6,
    desc: "测试管理",
    path: "/test",
    level: 2,
    pid: 5,
  },
];

var tree = getTree(menus);
console.info(tree);
```

- 转换后的结果

```json
[
  {
    "id": 1,
    "desc": "用户管理",
    "path": "",
    "level": 0,
    "pid": 0,
    "children": [
      { "id": 2, "desc": "用户列表", "path": "/users", "level": 1, "pid": 1 }
    ]
  },
  {
    "id": 3,
    "desc": "权限管理",
    "path": null,
    "level": 0,
    "pid": 0,
    "children": [
      { "id": 4, "desc": "角色管理", "path": "/roles", "level": 1, "pid": 3 },
      {
        "id": 5,
        "desc": "权限管理",
        "path": "/permissions",
        "level": 1,
        "pid": 3,
        "children": [
          { "id": 6, "desc": "测试管理", "path": "/test", "level": 2, "pid": 5 }
        ]
      }
    ]
  }
]
```
