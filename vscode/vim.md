### 为什么在 IDE 中使用 vim

鱼和熊掌: `vim: 快捷键强大+文本操作效率高` + `ide: 好看+不用各种复杂的配置`

### 安装 vim 插件

- [vim](https://github.com/VSCodeVim/Vim.git)
- [Vim Search and Replace](https://github.com/nilehmann/vscode-vim-search-and-replace)
- [vim 基础入门](https://coolshell.cn/articles/5426.html)
- [vim 基础使用](https://www.jianshu.com/p/f44647e82327)

### vim 搜索替换

可以使用 `vim` 插件自带的, 但是感觉 `vim` 美中不足的就是 `vscode` 的状态栏是在太小了,
可以使用 `Vim Search and Replace ` 这个插件来代替 `vim` vscode 的状态栏太小的问题

### easymotion 快速移动

- `s+[搜索关键字]`: 搜索移动
- `<leader>j`: 向下移动行
- `<leader>k`: 向上移动行
- `leader键` 默认是 `\`, 也就是说如果想向上移动就 `\\k`, 但是我习惯修改为 `<Space>`

### camelCaseMotion 大小写单词移动

- `<leader>w`: 向后移动一个单词(下一个单词的第一个字符) `helloWorld` 在 `h` 处按下就移动到 `W` 位置
- `<leader>e`: 向后移动一个单词(当前单词的最末尾字符) `helloWorld` 在 `h` 出按下就移动到 `o` 位置
- `<leader>b`: 向前移动一个单词(移动到当前单词的第一个字符) `helloWorld` 在 `d` 处按下就移动到 `W` 位置

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
  //                      VIM 插件配置
  //         _                              __ _
  //        (_)                            / _(_)
  //  __   ___ _ __ ___     ___ ___  _ __ | |_ _  __ _
  //  \ \ / / | '_ ` _ \   / __/ _ \| '_ \|  _| |/ _` |
  //   \ V /| | | | | | | | (_| (_) | | | | | | | (_| |
  //    \_/ |_|_| |_| |_|  \___\___/|_| |_|_| |_|\__, |
  //                                              __/ |
  //                                             |___/
  // 开启 easymotion 插件: https://github.com/easymotion/vim-easymotion
  "vim.easymotion": true,

  // 开启 CamelCaseMotion 插件: https://github.com/bkad/CamelCaseMotion
  "vim.camelCaseMotion.enable": true,
  "vim.easymotionDimBackground": true,
  "vim.autoindent": false,

  // 高亮被复制的内容
  "vim.highlightedyank.enable": true,

  // 高亮被复制的内容(高亮时的背景颜色)
  "vim.highlightedyank.color": "rgba(0, 0, 0, 0.5)",

  // 在切换 VIM 模式时,不要设置状态栏的颜色
  "vim.statusBarColorControl": false,

  // 高亮搜索内容
  "vim.hlsearch": true,

  // 搜索的时候忽略大小写
  "vim.ignorecase": false,

  // 更改单词包括前后的空格
  "vim.changeWordIncludesWhitespace": true,

  "vim.foldfix": true,

  // 使用系统粘贴板
  "vim.useSystemClipboard": true,

  // leader 键映射
  "vim.leader": "<space>",

  // insert 模式光标样式
  "vim.cursorStylePerMode.insert": "line",

  // noraml 模式光标样式
  "vim.cursorStylePerMode.normal": "block",

  // visual 模式光标样式
  "vim.cursorStylePerMode.visual": "line",
  "vim.cursorStylePerMode.visualline": "line",
  "vim.cursorStylePerMode.visualblock": "line",
  "vim.visualModeKeyBindingsNonRecursive": [
    {
      // $ 移动到本行结尾(不包括换行符)
      "before": ["$"],
      "after": ["$", "h"]
    },
    {
      // s 删除而不是剪切
      "before": ["s"],
      "after": ["\"", "_", "s"]
    },
    {
      // x 删除而不是剪切
      "before": ["x"],
      "after": ["\"", "_", "x"]
    },
    {
      // Tab: 向后缩进
      "before": ["tab"],
      "commands": ["tab"]
    },
    {
      // shift + Tab: 向前缩进
      "before": ["<S-tab>"],
      "commands": ["outdent"]
    },
    {
      // ctrl + \: 切换注释状态
      "before": ["ctrl", "\\"],
      "commands": ["editor.action.commentLine"]
    },
    {
      // 选中下一个
      "before": ["<leader>", "d"],
      "commands": ["editor.action.addSelectionToNextFindMatch"]
    },
    {
      // 仅粘贴操作(不会影响剪切板)
      "before": ["p"],
      "commands": ["editor.action.clipboardPasteAction", "extension.vim_escape"]
    },
    {
      // 将选中的内容 console.log 输出(需要插件: javascript console utils)
      "before": ["<leader>", "l"],
      "commands": ["extension.insertLogStatement"]
    }
  ],
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
      // <space>+x: save file and close current tab
      "before": ["<leader>", "x"],
      "commands": [":x"]
    },
    {
      // x: delete selection chars
      "before": ["x"],
      "after": ["\"", "_", "x"]
    },
    {
      // Ctrl+h: 显示帮助文档
      "before": ["<C-h>"],
      "commands": ["editor.action.showHover"]
    },
    {
      // <leader> + d: 快速跳到定义, 也可以用于文件跳转(ctrl+MouseClick)
      "before": ["g", "d"],
      "commands": ["editor.action.revealDefinition"]
    },
    {
      // <leader> + f: 格式化整个文件并且保存
      "before": ["<leader>", "f", "f"],
      "commands": ["editor.action.formatDocument", ":w"]
    },
    {
      // <leader> + p: 显示命令行
      "before": ["<leader>", "p"],
      "commands": ["workbench.action.showCommands"]
    },
    {
      // s: 用 easymotion 全局搜索自定字符
      "before": ["s"],
      "after": ["<leader>", "<leader>", "s"]
    },
    {
      // <leader>j: 用 easymotion 向后指定行
      "before": ["<leader>", "j"],
      "after": ["<leader>", "<leader>", "j"]
    },
    {
      // <leader>k: 用 easymotion 向前指定行
      "before": ["<leader>", "k"],
      "after": ["<leader>", "<leader>", "k"]
    },
    {
      // 显示标签页选择面板
      "before": ["<leader>", "l"],
      "commands": ["workbench.action.quickOpenPreviousRecentlyUsedEditor"]
    },
    {
      // 显示快速修复问题菜单(相当于点击小灯泡)
      "before": ["<leader>", "m"],
      "commands": ["editor.action.quickFix"]
    },
    {
      // 快速定位到上一个报错位置
      "before": ["["],
      "commands": ["editor.action.marker.prev"]
    },
    {
      // 快速定位到下一个报错位置
      "before": ["]"],
      "commands": ["editor.action.marker.next"]
    },
    {
      // <leader> + n: 在当前目录新建文件(需要插件: fileutils)
      "before": ["<leader>", "f", "n"],
      "commands": ["fileutils.newFile"]
    },
    {
      // <leader> + N: 在根目录新建文件(需要插件: fileutils)
      "before": ["<leader>", "f", "N"],
      "commands": ["fileutils.newFileAtRoot"]
    },
    {
      // <leader> + f + r: 文件重命名(需要插件: fileutils)
      "before": ["<leader>", "f", "r"],
      "commands": ["fileutils.renameFile"]
    },
    {
      // <leader> + f + d: 删除文件(需要插件: fileutils)
      "before": ["<leader>", "f", "d"],
      "commands": ["fileutils.removeFile"]
    },
    {
      // <leader> + f + c: 复制文件(需要插件: fileutils)
      "before": ["<leader>", "f", "c"],
      "commands": ["fileutils.duplicateFile"]
    },
    {
      // <leader> + f + n: 复制文件名(需要插件: fileutils)
      "before": ["<leader>", "f", "e"],
      "commands": ["fileutils.copyFileName"]
    },
    {
      // <leader> + f + f: 创建文件夹(需要插件: fileutils)
      "before": ["<leader>", "F", "f"],
      "commands": ["fileutils.newFolder"]
    },
    {
      // <leader> + f + F: 创建文件夹(需要插件: fileutils)
      "before": ["<leader>", "F", "F"],
      "commands": ["fileutils.newFolderAtRoot"]
    },
    {
      // ctrl + r/ <leader> + r: 替换(需要插件: Vim Search and Replace)
      "before": ["<C-r>"],
      "commands": ["vim-search-and-replace.start"]
    },
    {
      // vim 搜索替换
      "before": ["<leader>", "r"],
      "commands": ["vim-search-and-replace.start"]
    },
  ],
```
