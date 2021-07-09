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

| 命令        | 说明                              |
| :---------- | :-------------------------------- |
| ds \<char\> | 删除指定环绕字符                  |
| cs \<char\> | 修改指定环绕字符                  |
| S \<chars\> | 添加指定的环绕字符(visual 模式下) |

所谓 `环绕字符` 就是 `""` `()` `[]` `{}` 这样的成对出现包裹中间内容的字符

假如说目标文本是这样的: `"<h2>hell</h2>"`, 将光标移动到 `hello` 任意字符上(normal 模式下)

- `ds "`: 删除两边的 "
- `cs " '`: 将俩边的 " 修改为 '
- visual 模式下选中 `hello` 这个字符再执行: `S <h2>` 就可以添加 \<h2\>hello\<\/h2\>

### 设置

```json
{
  //                      VIM 插件配置
  //         _                              __ _
  //        (_)                            / _(_)
  //  __   ___ _ __ ___     ___ ___  _ __ | |_ _  __ _
  //  \ \ / / | '_ ` _ \   / __/ _ \| '_ \|  _| |/ _` |
  //   \ V /| | | | | | | | (_| (_) | | | | | | | (_| |
  //    \_/ |_|_| |_| |_|  \___\___/|_| |_|_| |_|\__, |
  //                                              __/ |
  //                                             |___/
  "vim.easymotion": true,
  "vim.sneak": true,
  "vim.easymotionDimBackground": true,
  "vim.autoindent": true,
  "vim.hlsearch": true,
  "vim.changeWordIncludesWhitespace": true,
  "vim.camelCaseMotion.enable": true,
  "vim.foldfix": true,
  "vim.useSystemClipboard": true,
  "vim.leader": "<space>",
  // 普通模式快捷键
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      // - :取消高亮
      "before": ["-"],
      "commands": [":nohl"]
    },
    {
      // <space>+s: save file
      "before": ["<leader>", "s"],
      "commands": [":w"]
    },
    {
      // <space>+w: save file
      "before": ["<leader>", "w"],
      "commands": [":w"]
    },
    {
      // <space>+x: save file and close current tab
      "before": ["<leader>", "x"],
      "commands": [":x"]
    },
    {
      // x: 删除字符,而不是剪切
      "before": ["x"],
      "after": ["\"", "_", "x"]
    },
    {
      // <leader> + n: 新建文件(需要插件advanced-new-file)
      "before": ["<leader>", "n"],
      "commands": ["extension.advancedNewFile"]
    },
    {
      // <leader> + d: 快速跳到定义, 也可以用于文件跳转(ctrl+MouseClick)
      "before": ["<space>", "d"],
      "commands": ["editor.action.revealDefinition"]
    },
    {
      // <leader> + f: 格式化整个文件并且保存
      "before": ["<leader>", "f"],
      "commands": ["editor.action.formatDocument", ":w"]
    },
    {
      // <leader> + h: 替换
      "before": ["<leader>", "h"],
      "commands": ["editor.action.startFindReplaceAction"]
    }
  ],
  // 选中模式快捷键
  "vim.visualModeKeyBindingsNonRecursive": [
    {
      // $ 移动到本行结尾(不包括换行符)
      "before": ["$"],
      "after": ["$", "h"]
    },
    {
      // x 删除而不是剪切
      "before": ["x"],
      "after": ["\"", "_", "x"]
    },
    {
      // 选中下一个
      "before": ["<leader>", "d"],
      "commands": ["editor.action.addSelectionToNextFindMatch"]
    },
    {
      // Tab: 向后缩进
      "before": ["tab"],
      "commands": ["tab"]
    },
    {
      // <leader> + Tab: 向前缩进
      "before": ["<leader>", "tab"],
      "commands": ["outdent"]
    },
    {
      // <leader> + u: 转大写
      "before": ["<leader>", "u"],
      "commands": ["editor.action.transformToUppercase"]
    },
    {
      // <leader> + d: 转小写
      "before": ["<leader>", "d"],
      "commands": ["editor.action.transformToLowercase"]
    },
    {
      // 仅粘贴操作(不会影响剪切板)
      "before": ["p"],
      "commands": ["editor.action.clipboardPasteAction", "extension.vim_escape"]
    }
  ]
}
```
