### EditorConfig

> 注意: 不同编辑器需要下载对应的插件

- [官方文档](https://editorconfig.org/)
- [github 选项参考](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)
- [vscode 语法支持插件](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [vscode 一键生成配置文件插件](https://marketplace.visualstudio.com/items?itemName=nepaul.editorconfiggenerator)

```ini
# 控制 .editorconfig 是否生效的字段
root = true

# 缩进风格：空格
indent_style = space

# 缩进大小2
indent_size = 2

# 换行符lf
end_of_line = lf

# 字符集utf-8
charset = utf-8

# 是否删除行尾的空格
trim_trailing_whitespace = true

# 是否在文件的最后插入一个空行
insert_final_newline = true

# 一行最大字符数 off 关闭
max_line_length = off

# 单独控制 不同类型文件的 格式化规则
[*.php]
indent_size = 4

[*.md]
insert_final_newline = false
```

## prettier

> 参考

- [官网文档](https://prettier.io)

> 配置文件

- `.prettierrc` 格式是 json 格式, 不能写注释

```json
{
  "semi": true
}
```

- `prettier.config.js` 格式是 js 格式, 可以写注释和逻辑

```js
module.exports = {
  singleQuote: true,
};
```

> 配置规则

- [官网参考文档](https://prettier.io/docs/en/options.html)
- [中文参考文章](https://www.cnblogs.com/linjunfu/p/10880381.html)

> 编辑器支持

- [官网参考文档](https://prettier.io/docs/en/editors.html)

* vscode 插件: `Prettier - Code formatter`

## ESLint

### 检查代码规范

- [中文文档](http://eslint.cn/)

### 安装

- eslint 是一个工具
- eslint-loader 则是将 eslint 继承到 webpack 的一个 loader

```sh
npm i eslint eslint-loader -D
```

### 按照提示生成配置文件

### 检查代码规范

- [中文文档](http://eslint.cn/)
- [配置规则查询](http://eslint.cn/docs/rules/)

### 安装

- eslint 是一个工具
- eslint-loader 则是将 eslint 继承到 webpack 的一个 loader

```sh
npm i eslint eslint-loader -D
```

### 按照提示生成配置文件

```sh
eslint --init
```

> 选择如何使用 eslint

- `只检查语法` : To check syntax only
- `检查语法找出问题` : To check syntax and find problems
- `检查语法找出问题并强制约束代码风格` : To check syntax, find problems, and enforce code style

![notes_imgs_20200326041747](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705745.png)

> 使用什么规范模块化

- `es6 模块化` : JavaScript modules (import/export)
- `commonJS模块化` : CommonJS (require/exports)
- `None of these` : 不使用模块化

![notes_imgs_20200326043436](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705536.png)

> 使用什么框架?

- react
- vue.js
- 不使用框架

![notes_imgs_20200326043652](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705868.png)

> 项目是否使用 typescript

![notes_imgs_20200326043753](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705966.png)

> 选择代码运行的环境

- browser: 浏览器环境
- node: 服务端 nodejs 环境

![notes_imgs_20200326043836](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705198.png)

> 如何约束代码风格

- `使用知名的代码规范(推荐)` Use a popular style guide

![notes_imgs_20200326044015](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705197.png)

![notes_imgs_20200326044810](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705627.png)

> 使用什么格式的配置文件保存 eslint 的配置

![notes_imgs_20200326044225](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705210.png)

### 编辑器校验代码风格

全部选择后, 会安装一些必要的包, 安装完之后, 需要配置编辑器

- 设置 webstorm

![notes_imgs_20200326045245](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705895.png)

- 设置 vscode

![notes_imgs_20200326045620](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131705954.png)
