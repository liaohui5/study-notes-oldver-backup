### copy-webpack-plugin

- 在打包项目的时候, 有些文件是不需要 webpack 处理的, 只需要原封不动的复制过去就可以, 比如项目的说明文档
- [中文文档](https://www.webpackjs.com/plugins/copy-webpack-plugin/)

### 安装

```sh
npm i -D copy-webpack-plugin
```

### 使用

```js
plugins: [
  // 将需要的文件全部拷贝到打包后的指定位置
  new CopyWebpackPlugin([
    {
      from: "./docs",
      to: "docs",
    },
    {
      from: "./a.md",
      to: "./b.txt",
    },
  ]),
];
```
