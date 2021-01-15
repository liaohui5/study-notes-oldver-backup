### 为什么在 IDE 中使用 vim

鱼和熊掌: `vim: 快捷键强大+文本操作效率高` + `ide: 好看+不用各种复杂的配置`

### 安装 vim 插件

- [vim](https://github.com/VSCodeVim/Vim.git)
- [Vim Search and Replace](https://github.com/nilehmann/vscode-vim-search-and-replace)
- [vim 基础入门](https://coolshell.cn/articles/5426.html)
- [vim 基础使用](https://www.jianshu.com/p/f44647e82327)

### vim 搜索替换

可以使用 `vim` 插件自带的, 但是感觉 `vim` 美中不足的就是 `vscode` 的状态栏是在太小了, 可以使用 `Vim Search and Replace ` 这个插件来代替 `vim` vscode 的状态栏太小的问题

### easymotion 快速移动

- `<leader><leader>s+[搜索关键字]`: 搜索移动
- `<leader><leader>j`: 向下移动行
- `<leader><leader>k`: 向上移动行
- `<leader><leader>w` 或 `<leader><leader>e`: 向下移动单词
- `<leader><leader>b`: 向上移动单词
- `leader键` 默认是 `\`, 也就是说如果想向上移动就 `\\k`

### vim-surround 快速修改环绕字符

| 命令        | 说明               |
| :---------- | :----------------- |
| ds \<char\> | 删除指定环绕字符   |
| cs \<char\> | 修改指定环绕字符   |
| S \<chars\>  | 添加指定的环绕字符(visual模式下) |

所谓 `环绕字符` 就是 `""` `()` `[]` `{}` 这样的成对出现包裹中间内容的字符

假如说目标文本是这样的: `"<h2>hell</h2>"`, 将光标移动到 `hello` 任意字符上(normal 模式下)

- `ds "`: 删除两边的 "
- `cs " '`: 将俩边的 " 修改为 '
- visual模式下选中 `hello` 这个字符再执行: `S <h2>` 就可以添加 \<h2\>hello\<\/h2\>

### 设置

```json
// vim配置
"vim.easymotion": true, // 快速移动插件
"vim.hlsearch": true, // 高亮搜索
"vim.camelCaseMotion.enable": true,
"vim.useSystemClipboard": true, // 使用系统剪切板(可配合ditto使用)
```
