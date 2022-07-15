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

## 浏览器 vimium C 插件配置(手动复制)

```
# 项目源码: https://github.com/gdh1995/vimium-c
# 扩展商店: https://chrome.google.com/webstore/detail/vimium-c-all-by-keyboard/hfjbmagddngcpeloejdejnfgbamkjaeg
# 所有命令: https://github.com/gdh1995/vimium-c/blob/master/i18n/zh/help_dialog.json

# 移除所有的默认快捷键
unmapAll

# 显示所有快捷键信息
map ? showHelp

# 展示关闭快捷键
map <c-/> enterInsertMode

# 选择链接和按钮(可点击元素)
run <v-lh> LinkHints.activate$s mask=
map f LinkHints.activate

# 选择链接和按钮并在新标签页中打开
run Fo lh OpenInNewTab

# 复制链接地址/文本
run Fu lh CopyLinkUrl
run Ft lh CopyLinkText

# 下载可下载的链接地址 & 下载/打开图片
run Di lh DownloadImage
run Dl lh DownloadLink
run Do lh OpenImage

# 选择文本框 & 只选择文本框tab切换
run Fi lh Edit
map FI focusInput

# 移动focus/hover到网页内容
run Ff lh Focus
run Fh lh Hover
run Fl lh Leave

# 在新标签页中打开链接（不转到）
# run Ft lh OpenInNewTab
# run Fo lh OpenVomnibar

# 搜索链接的文字 & bing/google 搜索
run Fs lh SearchLinkText

# vim进入选中模式, 可以选择内容
run Fv lh Select

# M*: 创建标记(如: Ma)
run m Marks.activate$s#swap mask=
run M m Create

# `* 跳到标记位置(如: `a)
run ` m

# 显示搜索框 & 并在新标签页中打开搜索结果
map o Vomnibar.activateInNewTab

# 显示搜索框(回车搜索关键字在当前页打开搜索结果)
map Oo Vomnibar.activate

# 显示搜索框编辑当前url
run FE f action="edit-url"
run Fe f action="edit-url-in-new-tab"

# 显示搜索框搜索书签 & 并在新标签页中打开
map OB Vomnibar.activateBookmarks
map Ob Vomnibar.activateBookmarksInNewTab
map b Vomnibar.activateBookmarksInNewTab

# 在所有的标签页中搜索
map t Vomnibar.activateTabs
map Ot Vomnibar.activateTabs
map Ol Vomnibar.activateTabs

# 收藏当前标签页到书签
map Lb addBookmark

# 复制选中文字 & 复制当前标签页的网址
map y autoCopy
map Ly copyCurrentUrl type="frame"

# 打开/搜索已经赋值的内容/url & 复制当前标签页
map p autoOpen
map Lp duplicateTab

# 搜索文字
map / enterFindMode postOnEsc

# 下一个搜索到的内容
map n performFind

# 上一个搜索到的内容
map N performBackwardsFind

# 进入文字自由选择模式
map v enterVisualMode

# 进入文字选择模式（对齐到行）
map V enterVisualLineMode

# 第一个tab/最后一个tab
map T[ firstTab
map T] lastTab

# 前进后退一步
map Lh goBack
map Gh goBack
map Gl goForward
map Ll goForward

# 上一页/下一页
map Ga goPrevious
map Gd goNext

# 回到网站首页
map Lg goToRoot

# 移动当前标签页
map > moveTabRight
map < moveTabLeft

# 在当前标签页打开复制的网址
# openCopiedUrlInCurrentTab|openCopiedUrlInNewTab
map P openCopiedUrlInCurrentTab
run <c-v> P keyword="v.math-copy"
map <c-s-v> openCopiedUrlInNewTab copied="urls"

# 上/下一个标签页
map Tp previousTab
map Tn nextTab
map <c-p> previousTab
map <c-n> nextTab

# 刷新(重新加载)当前标签页
map r reloadTab
map Lr reloadTab
map Tr reloadTab

# 打开搜索框并且显示出所有的标签页
map Tl Vomnibar.activateTabSelection preferTabs="new"

# 关闭标签页
map x removeTab goto="previous,near" highlighted
#map Xl closeTabsOnLeft $count=-1
#map Xr closeTabsOnRight $count=1

# 关闭当前标签页的左边的所有标签页
map Xl closeTabsOnLeft

# 关闭当前标签页的右边的所有标签页
map Xr closeTabsOnRight

# 关闭除了当前标签页的其他所有标签页
map Xo closeOtherTabs

# 再次打开最近关闭的标签页
map u restoreTab
map Tu restoreTab

# 向上/下滚动半页
map <c-u> scrollPageUp
map <c-d> scrollPageDown

# 上下左右滚动(一行)
map h scrollLeft
map l scrollRight
map k scrollUp
map j scrollDown

# 滚动到最顶部/最底部
map <c-k> scrollToTop
map <c-j> scrollToBottom
map <c-h> scrollToLeft
map <c-l> scrollToRight

# 从当前文本框移走键盘焦点或恢复
map <c-e> switchFocus

# 固定/取消 & 静音/取消 & 源码/取消
map Tf togglePinTab
map Tm toggleMuteTab
map Tc toggleViewSource

# 返回上一个访问的标签页
map <c-t> visitPreviousTab acrossWindows

# shift+f12 打开配置
map <s-f12> focusOrLaunch url="vimium://options"
```

## 浏览器 Vimium C 插件配置(文件导入)

```json
{
  "name": "Vimium C",
  "@time": "2022/7/2 23:36:47",
  "time": 1656776207835,
  "environment": {
    "extension": "1.98.3",
    "platform": "mac",
    "chromium": "103"
  },
  "clipSub": [
    "p=^git@([^/:]+):=https://$1/=",
    "s@^https://(?:www\\.)?google\\.com(?:\\.[^/]+)?/url\\?(?:[^&#]+&)*?url=([^&#]+)@$1@,matched,decodecomp",
    "r@^https://github\\.com/[^\\s\\/?#]+/[^\\s\\/?#]+(?=/)@@,matched",
    "si@^https?://link\\.zhihu\\.com/\\?target=@@,decodecomp",
    "g@^https://www\\.zhihu\\.com/question/\\d+(?=/answer/?$)@@,matched",
    "p@^https://item\\.m\\.jd\\.com/product/(\\d+)\\.html\\b@https://item.jd.com/$1.html@",
    ""
  ],
  "exclusionListenHash": false,
  "exclusionRules": [],
  "grabBackFocus": true,
  "hideHud": true,
  "keyMappings": [
    "#!no-check",
    "# 项目源码: https://github.com/gdh1995/vimium-c",
    "# 扩展商店: https://chrome.google.com/webstore/detail/vimium-c-all-by-keyboard/hfjbmagddngcpeloejdejnfgbamkjaeg",
    "# 所有命令: https://github.com/gdh1995/vimium-c/blob/master/i18n/zh/help_dialog.json",
    "",
    "# 移除所有的默认快捷键",
    "unmapAll",
    "",
    "# 显示所有快捷键信息",
    "map ? showHelp",
    "",
    "# 展示关闭快捷键",
    "map <c-/> enterInsertMode",
    "",
    "# 选择链接和按钮(可点击元素)",
    "run <v-lh> LinkHints.activate$s mask=",
    "map f LinkHints.activate",
    "",
    "# 选择链接和按钮并在新标签页中打开",
    "run Fo lh OpenInNewTab",
    "",
    "# 复制链接地址/文本",
    "run Fu lh CopyLinkUrl",
    "run Ft lh CopyLinkText",
    "",
    "# 下载可下载的链接地址 & 下载/打开图片",
    "run Di lh DownloadImage",
    "run Dl lh DownloadLink",
    "run Do lh OpenImage",
    "",
    "# 选择文本框 & 只选择文本框tab切换",
    "run Fi lh Edit",
    "map FI focusInput",
    "",
    "# 移动focus/hover到网页内容",
    "run Ff lh Focus",
    "run Fh lh Hover",
    "run Fl lh Leave",
    "",
    "# 在新标签页中打开链接（不转到）",
    "# run Ft lh OpenInNewTab",
    "# run Fo lh OpenVomnibar",
    "",
    "# 搜索链接的文字 & bing/google 搜索",
    "run Fs lh SearchLinkText",
    "",
    "# vim进入选中模式, 可以选择内容",
    "run Fv lh Select",
    "",
    "# M*: 创建标记(如: Ma)",
    "run m Marks.activate$s#swap mask=",
    "run M m Create",
    "",
    "# `* 跳到标记位置(如: `a)",
    "run ` m",
    "",
    "# 显示搜索框 & 并在新标签页中打开搜索结果",
    "map o Vomnibar.activateInNewTab",
    "",
    "# 显示搜索框(回车搜索关键字在当前页打开搜索结果)",
    "map Oo Vomnibar.activate",
    "",
    "# 显示搜索框编辑当前url",
    "run FE f action=\"edit-url\"",
    "run Fe f action=\"edit-url-in-new-tab\"",
    "",
    "# 显示搜索框搜索书签 & 并在新标签页中打开",
    "map OB Vomnibar.activateBookmarks",
    "map Ob Vomnibar.activateBookmarksInNewTab",
    "map b Vomnibar.activateBookmarksInNewTab",
    "",
    "# 在所有的标签页中搜索",
    "map t Vomnibar.activateTabs",
    "map Ot Vomnibar.activateTabs",
    "map Ol Vomnibar.activateTabs",
    "",
    "# 收藏当前标签页到书签",
    "map Lb addBookmark",
    "",
    "# 复制选中文字 & 复制当前标签页的网址",
    "map y autoCopy",
    "map Ly copyCurrentUrl type=\"frame\"",
    "",
    "# 打开/搜索已经赋值的内容/url & 复制当前标签页",
    "map p autoOpen",
    "map Lp duplicateTab",
    "",
    "# 搜索文字",
    "map / enterFindMode postOnEsc",
    "",
    "# 下一个搜索到的内容",
    "map n performFind",
    "",
    "# 上一个搜索到的内容",
    "map N performBackwardsFind",
    "",
    "# 进入文字自由选择模式",
    "map v enterVisualMode",
    "",
    "# 进入文字选择模式（对齐到行）",
    "map V enterVisualLineMode",
    "",
    "# 第一个tab/最后一个tab",
    "map T[ firstTab",
    "map T] lastTab",
    "",
    "# 前进后退一步",
    "map Lh goBack",
    "map Gh goBack",
    "map Gl goForward",
    "map Ll goForward",
    "",
    "# 上一页/下一页",
    "map Ga goPrevious",
    "map Gd goNext",
    "",
    "# 回到网站首页",
    "map Lg goToRoot",
    "",
    "# 移动当前标签页",
    "map > moveTabRight",
    "map < moveTabLeft",
    "",
    "# 在当前标签页打开复制的网址",
    "# openCopiedUrlInCurrentTab|openCopiedUrlInNewTab",
    "map P openCopiedUrlInCurrentTab",
    "run <c-v> P keyword=\"v.math-copy\"",
    "map <c-s-v> openCopiedUrlInNewTab copied=\"urls\"",
    "",
    "# 上/下一个标签页",
    "map Tp previousTab",
    "map Tn nextTab",
    "map <c-p> previousTab",
    "map <c-n> nextTab",
    "",
    "# 刷新(重新加载)当前标签页",
    "map r reloadTab",
    "map Lr reloadTab",
    "map Tr reloadTab",
    "",
    "# 打开搜索框并且显示出所有的标签页",
    "map Tl Vomnibar.activateTabSelection preferTabs=\"new\"",
    "",
    "# 关闭标签页",
    "map x removeTab goto=\"previous,near\" highlighted",
    "#map Xl closeTabsOnLeft $count=-1",
    "#map Xr closeTabsOnRight $count=1",
    "",
    "# 关闭当前标签页的左边的所有标签页",
    "map Xl closeTabsOnLeft",
    "",
    "# 关闭当前标签页的右边的所有标签页",
    "map Xr closeTabsOnRight",
    "",
    "# 关闭除了当前标签页的其他所有标签页",
    "map Xo closeOtherTabs",
    "",
    "# 再次打开最近关闭的标签页",
    "map u restoreTab",
    "map Tu restoreTab",
    "",
    "# 向上/下滚动半页",
    "map <c-u> scrollPageUp",
    "map <c-d> scrollPageDown",
    "",
    "# 上下左右滚动(一行)",
    "map h scrollLeft",
    "map l scrollRight",
    "map k scrollUp",
    "map j scrollDown",
    "",
    "# 滚动到最顶部/最底部",
    "map <c-k> scrollToTop",
    "map <c-j> scrollToBottom",
    "map <c-h> scrollToLeft",
    "map <c-l> scrollToRight",
    "",
    "# 从当前文本框移走键盘焦点或恢复",
    "map <c-e> switchFocus",
    "",
    "# 固定/取消 & 静音/取消 & 源码/取消",
    "map Tf togglePinTab",
    "map Tm toggleMuteTab",
    "map Tc toggleViewSource",
    "",
    "# 返回上一个访问的标签页",
    "map <c-t> visitPreviousTab acrossWindows",
    "",
    "# shift+f12 打开配置",
    "map <s-f12> focusOrLaunch url=\"vimium://options\"",
    ""
  ],
  "keyupTime": 100,
  "linkHintCharacters": "sadjklewcmpgh1234",
  "localeEncoding": "",
  "nextPatterns": "下一封,下页,下一页,下一章,后一页,下一张,.btn-next,[data-slp-action=nextSlide]:not(div),next,more,newer,>,›,→,»,≫,>>",
  "previousPatterns": "上一封,上页,上一页,上一章,前一页,上一张,.btn-prev,[data-slp-action=prevSlide]:not(div),prev,previous,back,older,<,‹,←,«,≪,<<",
  "regexFindMode": true,
  "searchEngines": [
    "bd|baidu|百度: https://www.baidu.com/s?ie=utf-8&wd=$s 百度搜索",
    "bing|必应: https://cn.bing.com/search?q=$s bing搜索",
    "baidu.image|baidu.img|bd.image|bd.img: http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=$s  百度图片",
    "gg|google: https://www.google.com/search?ie=utf-8&q=$s",
    "gg.img|gg.image|google.img|google.image: https://www.google.com/search?newwindow=1&tbm=isch&q=$s  谷歌图片",
    "bili|bilibili: http://www.bilibili.com/search?keyword=$s  bilibili 搜索",
    "gg.fyc|谷歌翻译(->中文): https://translate.google.com/?ie=utf-8#auto/zh-CN/$s 谷歌翻译",
    "gg.fye|谷歌翻译(->英语): https://translate.google.com/?ie=utf-8#auto/en/$s Google Translate",
    "gh|github: https://github.com/search?q=$s GitHub",
    "ge|gitee: https://search.gitee.com/?type=repository&q=$s blank=https://gitee.com/ Gitee",
    "doc|docs: http://devdocs.io/#q=$s DevDocs",
    "mdn|mdn-cn: https://developer.mozilla.org/zh-CN/search?q=$s MDN Docs",
    "mdn-e|mdn-en: https://developer.mozilla.org/en-US/search?q=$s Mozilla DN",
    "mdn.a: https://developer.mozilla.org/en-US/docs/Web/API/$S{$1/$2} MDN Web APIs",
    "mdn.e: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/$S{$1} MDN Element",
    "mdn.g: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/$S{$1/$2} MDN JavaScript",
    "caniuse|CanIUse: http://caniuse.com/#search=$S Can I Use",
    "jd|京东: https://search.jd.com/Search?enc=utf-8&keyword=%s 京东搜索",
    ""
  ],
  "searchUrl": "https://cn.bing.com/search?q=$s 必应",
  "vimSync": true,
  "waitForEnter": false
}
```

## vifm 终端文件管理器

```bash
brew install vifm
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202207152253794.png)

### 配置文件

```vimscript
" vim: filetype=vifm :
" Sample configuration file for vifm on OSX (last updated: 31 August, 2021)
" You can edit this file by hand.
" The " character at the beginning of a line comments out the line.
" Blank lines are ignored.
" The basic format for each item is shown with an example.

" ------------------------------------------------------------------------------

" Command used to edit files in various contexts.  The default is vim.
" If you would like to use another vi clone such as Elvis or Vile
" you will need to change this setting.

set vicmd=nvim
" set vicmd=elvis\ -G\ termcap
" set vicmd=vile

" This makes vifm perform file operations on its own instead of relying on
" standard utilities like `cp`.  While using `cp` and alike is a more universal
" solution, it's also much slower when processing large amounts of files and
" doesn't support progress measuring.

set syscalls

" Trash Directory
" The default is to move files that are deleted with dd or :d to
" the trash directory.  If you change this you will not be able to move
" files by deleting them and then using p to put the file in the new location.
" I recommend not changing this until you are familiar with vifm.
" This probably shouldn't be an option.

set trash

" This is how many directories to store in the directory history.

set history=100

" Automatically resolve symbolic links on l or Enter.

set nofollowlinks

" Natural sort of (version) numbers within text.

set sortnumbers

" Maximum number of changes that can be undone.

set undolevels=100

" Use Vim's format of help file (has highlighting and "hyperlinks").
" If you would rather use a plain text help file set novimhelp.

set vimhelp

" If you would like to run an executable file when you
" press Enter, l or Right Arrow, set this.

set norunexec

" List of color schemes to try (picks the first one supported by the terminal)

colorscheme Default-256 Default

" Format for displaying time in file list. For example:
" TIME_STAMP_FORMAT=%m/%d-%H:%M
" See man date or man strftime for details.

set timefmt=%m/%d\ %H:%M

" Show list of matches on tab completion in command-line mode

set wildmenu

" Display completions in a form of popup with descriptions of the matches

set wildstyle=popup

" Display suggestions in normal, visual and view modes for keys, marks and
" registers (at most 5 files).  In other view, when available.

set suggestoptions=normal,visual,view,otherpane,keys,marks,registers

" Ignore case in search patterns unless it contains at least one uppercase
" letter

set ignorecase
set smartcase

" Don't highlight search results automatically

set nohlsearch

" Use increment searching (search while typing)
set incsearch

" Try to leave some space from cursor to upper/lower border in lists

set scrolloff=4

" Don't do too many requests to slow file systems

set slowfs=curlftpfs

" Set custom status line look

set statusline="  Hint: %z%= %A %10u:%-7g %15s %20d  "

" ------------------------------------------------------------------------------

" :mark mark /full/directory/path [filename]

mark b ~/bin/
mark h ~/
mark c ~/Desktop/codes

" ------------------------------------------------------------------------------

" :com[mand][!] command_name action
" The following macros can be used in a command
" %a is replaced with the user arguments.
" %c the current file under the cursor.
" %C the current file under the cursor in the other directory.
" %f the current selected file, or files.
" %F the current selected file, or files in the other directory.
" %b same as %f %F.
" %d the current directory name.
" %D the other window directory name.
" %m run the command in a menu window

command! df df -h %m 2> /dev/null
command! diff nvim -d %f %F
command! zip zip -r %c.zip %f
command! run !! ./%f
command! make !!make %a
command! mkcd :mkdir %a | cd %a
command! reload :write | restart full

" ------------------------------------------------------------------------------

" The file type is for the default programs to be used with
" a file extension.
" :filetype pattern1,pattern2 defaultprogram,program2
" :fileviewer pattern1,pattern2 consoleviewer
" The other programs for the file type can be accessed with the :file command
" The command macros like %f, %F, %d, %D may be used in the commands.
" Spaces in an app name will have to be escaped e.g. QuickTime\ Player.app
" The %a macro is ignored.  To use a % you must put %%.

" For automated FUSE mounts, you must register an extension with :file[x]type
" in one of following formats:
"
" :filetype extensions FUSE_MOUNT|some_mount_command using %SOURCE_FILE and %DESTINATION_DIR variables
" %SOURCE_FILE and %DESTINATION_DIR are filled in by vifm at runtime.
" A sample line might look like this:
" :filetype *.zip,*.jar,*.war,*.ear FUSE_MOUNT|fuse-zip %SOURCE_FILE %DESTINATION_DIR
"
" :filetype extensions FUSE_MOUNT2|some_mount_command using %PARAM and %DESTINATION_DIR variables
" %PARAM and %DESTINATION_DIR are filled in by vifm at runtime.
" A sample line might look like this:
" :filetype *.ssh FUSE_MOUNT2|sshfs %PARAM %DESTINATION_DIR
" %PARAM value is filled from the first line of file (whole line).
" Example first line for SshMount filetype: root@127.0.0.1:/
"
" You can also add %CLEAR if you want to clear screen before running FUSE
" program.

" Pdf
filetype {*.pdf},<application/pdf>
       \ {Open in Preview}
       \ open -a Preview.app,
fileviewer {*.pdf},<application/pdf> pdftotext -nopgbrk %c -

" PostScript
filetype {*.ps,*.eps,*.ps.gz},<application/postscript> open -a Preview.app

" Djvu
filetype {*.djvu},<image/vnd.djvu> open -a MacDjView.app

" Audio
filetype {*.wav,*.mp3,*.flac,*.m4a,*.wma,*.ape,*.ac3,*.og[agx],*.spx,*.opus},
        \<audio/*>
       \ {Play using MPlayerX}
       \ open -a MPlayerX.app,
       \ {Open in iTunes}
       \ open -a iTunes.app,
       \ {Open in QuickTime Player}
       \ open -a QuickTime\ Player.app,
fileviewer *.mp3 mp3info
fileviewer *.flac soxi

" Video
filetype {*.avi,*.mp4,*.wmv,*.dat,*.3gp,*.ogv,*.mkv,*.mpg,*.mpeg,*.vob,
         \*.fl[icv],*.m2v,*.mov,*.webm,*.ts,*.mts,*.m4v,*.r[am],*.qt,*.divx,
         \*.as[fx]},
        \<video/*>
       \ {Open in VLC}
       \ open -a VLC.app,
       \ {Open in QuickTime Player}
       \ open -a QuickTime\ Player.app,
       \ {Open in MPlayerX}
       \ open -a MPlayerX.app,
fileviewer {*.avi,*.mp4,*.wmv,*.dat,*.3gp,*.ogv,*.mkv,*.mpg,*.mpeg,*.vob,
           \*.fl[icv],*.m2v,*.mov,*.webm,*.ts,*.mts,*.m4v,*.r[am],*.qt,*.divx,
           \*.as[fx]},
          \<video/*>
         \ ffprobe -pretty %c 2>&1

" Web
"filetype {*.html,*.htm},<text/html>
"       \ {Open in Safari}
"       \ open -a Safari.app,
"       \ {Open in Firefox}
"       \ open -a Firefox.app,
"       \ {Open in Chrome}
"       \ open -a Google\ Chrome.app,
"       \ {Open in nvim}
"       \ nvim,
filetype {*.html,*.htm},<text/html>
       \ {Open in nvim}
       \ nvim,
fileviewer {*.html,*.htm},<text/html> w3m -dump -T text/html

" Object
filetype {*.o},<application/x-object> nm %f | less

" Man page
filetype {*.[1-8]},<text/troff> man ./%c
fileviewer {*.[1-8]},<text/troff> man ./%c | col -b

" Image
filetype {*.bmp,*.jpg,*.jpeg,*.png,*.gif,*.xpm},<image/*>
       \ open -a Preview.app,
fileviewer {*.bmp,*.jpg,*.jpeg,*.png,*.gif,*.xpm},<image/*>
         \ identify %f

" MD5
filetype *.md5
       \ {Check MD5 hash sum}
       \ md5sum -c %f %S,

" SHA1
filetype *.sha1
       \ {Check SHA1 hash sum}
       \ sha1sum -c %f %S,

" SHA256
filetype *.sha256
       \ {Check SHA256 hash sum}
       \ sha256sum -c %f %S,

" SHA512
filetype *.sha512
       \ {Check SHA512 hash sum}
       \ sha512sum -c %f %S,

" Torrent
filetype {*.torrent},<application/x-bittorrent> open -a Transmission.app
fileviewer {*.torrent},<application/x-bittorrent> dumptorrent -v %c

" Extract zip files
filetype {*.zip},<application/zip,application/java-archive> unzip %f
fileviewer {*.zip,*.jar,*.war,*.ear},
          \<application/zip,application/java-archive>
          \ zip -sf %c

" Extract tar archives
filetype {*.tar,*.tar.bz2,*.tbz2,*.tgz,*.tar.gz,*.tar.xz,*.txz,*.tar.zst,*.tzst},
        \<application/x-tar>
       \ tar -xf %f
fileviewer {*.tar,*.tar.bz2,*.tbz2,*.tgz,*.tar.gz,*.tar.xz,*.txz,*.tar.zst,*.tzst},
          \<application/x-tar>
         \ tar -tf %f

" Extract .bz2 archives
filetype *.bz2 bzip2 -d %f

" Extract .gz files
filetype *.gz gunzip %f

" Mount .dmg archives
filetype *.dmg open

" Mount disk .img
filetype *.img open

" Open .pkg binaries
filetype *.pkg open

" Office files
filetype {*.odt,*.doc,*.docx,*.xls,*.xlsx,*.odp,*.pptx,*.ppt},
         \<application/vnd.openxmlformats-officedocument.*,
          \application/msword,
          \application/vnd.ms-excel>
       \ open -a LibreOffice.app
fileviewer {*.doc},<application/msword> antiword -
fileviewer {*.docx},
          \<application/
           \vnd.openxmlformats-officedocument.wordprocessingml.document>
         \ docx2txt.pl %f -

" Syntax highlighting in preview
"
" Explicitly set highlight type for some extensions
"
" 256-color terminal
" fileviewer *.[ch],*.[ch]pp highlight -O xterm256 -s dante --syntax c %c
" fileviewer Makefile,Makefile.* highlight -O xterm256 -s dante --syntax make %c
"
" 16-color terminal
" fileviewer *.c,*.h highlight -O ansi -s dante %c
"
" Or leave it for automatic detection
"
" fileviewer *[^/] pygmentize -O style=monokai -f console256 -g

" Displaying pictures in terminal
"
" fileviewer *.jpg,*.png shellpic %c

" Open all other files with default system programs (you can also remove all
" :file[x]type commands above to ensure they don't interfere with system-wide
" settings).  By default all unknown files are opened with 'vi[x]cmd'
" uncommenting one of lines below will result in ignoring 'vi[x]cmd' option
" for unknown file types.
" For OS X:
" filetype * open

" ------------------------------------------------------------------------------

" What should be saved automatically between vifm sessions.  Drop "savedirs"
" value if you don't want vifm to remember last visited directories for you.
set vifminfo=dhistory,savedirs,chistory,state,tui,shistory,
    \phistory,fhistory,dirstack,registers,bookmarks,bmarks

" ------------------------------------------------------------------------------

" Examples of configuring both panels

" Customize view columns a bit (enable ellipsis for truncated file names)
"
" set viewcolumns=-{name}..,6{}.

" Filter-out build and temporary files
"
" filter! {*.lo,*.o,*.d,*.class,*.pyc,*.pyo,.*~}

" ------------------------------------------------------------------------------

" Sample mappings

" Start shell in current directory
nnoremap s :shell<cr>

" Display sorting dialog
nnoremap S :sort<cr>

" Toggle visibility of preview window
nnoremap w :view<cr>
vnoremap w :view<cr>gv

" Open file in new MacVim tab
nnoremap o :!nvim --remote-tab-silent %f<cr>
" Open file in new MacVim window
nnoremap O :!nvim %f<cr>

" Open file in the background using its default program
nnoremap gb :!open -g %f<cr>

" Yank current directory path into the clipboard
nnoremap yd :!printf %d | pbcopy<cr>

" Yank current file path into the clipboard
nnoremap yf :!printf %c:p | pbcopy<cr>

" View preview in Quick Look
nnoremap <space> :!qlmanage -p %f > /dev/null 2>&1<cr>

" Mappings for faster renaming
nnoremap I cw<c-a>
nnoremap cc cw<c-u>
nnoremap A cw

" Open editor to edit vifmrc and apply settings after returning to vifm
nnoremap ,c :write | edit $MYVIFMRC | restart full<cr>
" Open MacVim to edit vifmrc
nnoremap ,C :!mvim --remote-tab-silent $MYVIFMRC &<cr>

" Toggle wrap setting on ,w key
nnoremap ,w :set wrap!<cr>

" Example of standard two-panel file managers mappings
nnoremap <f3> :!less %f<cr>
nnoremap <f4> :edit<cr>
nnoremap <f5> :copy<cr>
nnoremap <f6> :move<cr>
nnoremap <f7> :mkdir<space>
nnoremap <f8> :delete<cr>

" Midnight commander alike mappings
" Open current directory in the other pane
nnoremap <a-i> :sync<cr>
" Open directory under cursor in the other pane
nnoremap <a-o> :sync %c<cr>
" Swap panes
nnoremap <c-u> <c-w>x

" ------------------------------------------------------------------------------

" Various customization examples

" Use ag (the silver searcher) instead of grep
"
" set grepprg='ag --line-numbers %i %a %s'

" Add additional place to look for executables
"
" let $PATH = $HOME.'/bin/fuse:'.$PATH

" Block particular shortcut
"
" nnoremap <left> <nop>

" Export IPC name of current instance as environment variable and use it to
" communicate with the instance later.
"
" It can be used in some shell script that gets run from inside vifm, for
" example, like this:
"     vifm --server-name "$VIFM_SERVER_NAME" --remote +"cd '$PWD'"
"
" let $VIFM_SERVER_NAME = v:servername
```

### 快捷键

```bash
# vifm 左边栏目打开目录 右边栏目打开目录
vifm . ./src

# e:在当前窗口预览文件内容
e

# q:退出预览
q

# 将右边栏目变成预览栏目
w

# 上一级目录
h

# 进入当前目录 | 打开当前文件
l

# 向上移动 向下移动
j          k

# 删除文件
dd

## 复制文件
yy

# 粘贴文件
p

# 打开终端
s

# neovim 打开文件
o

# 进入多选模式
V

# 重命名文件
cw

# 切换显示隐藏文件
za
```
