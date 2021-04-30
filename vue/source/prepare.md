## 需要了解的知识

- [rollup](https://www.rollupjs.com/guide/introduction)
- [flow.js](https://flow.org/en/docs/getting-started/)

## 下载项目

```bash
# 克隆项目到本地的 vuejs-source-code 目录
git clone https://github.com/vuejs/vue.git vuejs-source-code

# 进入目录
cd vuejs-source-code

# 查看版本(默认是dev)
git tag

# 切换到 2.6.9
git checkout v2.6.9

# 创建一个新的分支, 用于写自己的注释
git checkout -b vuesrc
```

## 运行项目

1. 安装依赖

这里推荐使用 yarn 来安装, 用 npm 可能会失败

```bash
yarn
```

2. 修改运行配置 package.json

主要是添加 `--sourcemap` 方便查看源码

```json
{
  "scripts": {
    "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
  }
}
```

## 删除 git hooks, 提交修改

不删除这两个文件是无法提交代码的

1. 找到 `.git/hooks` 目录(.git 隐藏目录)
2. 删除 `pre-commit.*` 和 `commit-msg.*`

```bash
cd .git/hooks

rm -f pre-commit.*
rm -f commit-msg.*

# 回到项目目录
cd ~/codes/vue-source-code

# 提交代码
git commit -m "init"
```

## 运行

1. 运行

```
npm run dev
```

2. 在项目目录下新建 `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue Source Code</title>
    <script src="./dist/vue.js"></script>
  </head>
  <body>
    <div id="app">{{msg}}</div>
    <script>
      debugger;
      new Vue({
        el: "#app",
        data: () => ({
          msg: "hello vue",
        }),
      });
    </script>
  </body>
</html>
```

2. 打开浏览器, 调试代码, 找到入口文件

![find-entry-file](../img/find-entry-file.gif)
