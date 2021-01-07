### 待遍历的数据

```json
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
function deepEach(data, cb) {
  if (data instanceof Array && typeof cb === "function") {
    let current;
    for (let i = 0; i < data.length; i++) {
      current = data[i];
      cb(current, i);
      if (current.children) {
        // 如果有 children 就继续执行 deepEach
        deepEach(current.children, cb);
      }
    }
  }
}

str = "";
deepEach(data, (item, index) => (str += item.label + "=>"));
document.write(str);
```

### 广度遍历(横向便利)

```js
let str = "";
let stack = [...data];
let index = 0;
let current;
// stack: 遍历的数组(栈)
// index: 当前遍历到的 index
// current: 当前遍历到的 item
while ((current = stack[index++])) {
  str += current.label + "=>";
  if (current.children) {
    stack = stack.concat(current.children);
  }
}
document.write(str);
```

## 将线性数据转为树形数据

```js
function getTree(data) {
  const cloneDatas = JSON.parse(JSON.stringify(data));
  return cloneDatas.filter((root) => {
    const children = cloneDatas.filter((child) => root.id === child.pid);
    if (children.length) {
      root.children = children;
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

```js
// 转换后的 menus
[
  {
    id: 1,
    desc: "用户管理",
    path: "",
    level: 0,
    pid: 0,
    children: [
      {
        id: 2,
        desc: "用户列表",
        path: "/users",
        level: 1,
        pid: 1,
      },
    ],
  },
  {
    id: 3,
    desc: "权限管理",
    path: null,
    level: 0,
    pid: 0,
    children: [
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
    ],
  },
];
```
