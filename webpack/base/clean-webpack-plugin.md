### clean-webpack-plugin

- 每次打包之前清空上一次的打包的文件
- [clean-webpack-plugin github](https://github.com/johnagan/clean-webpack-plugin)

### 安装

```sh
npm i -D clean-webpack-plugin@3
```

### 使用

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// ...
plugins: [
  // ...
  new CleanWebpackPlugin(),
  // ...
];
```
