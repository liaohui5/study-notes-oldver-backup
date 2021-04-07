## 配置

```json
{
  // 缩放比例
  "window.zoomLevel": 1,

  // 图标主题
  "workbench.iconTheme": "material-icon-theme",

  // 打开设置使用左右json
  "workbench.settings.editor": "json",
  "workbench.settings.useSplitJSON": true,

  // 自然语言搜索
  "workbench.settings.enableNaturalLanguageSearch": false,

  // 自动保存
  "files.autoSave": "onFocusChange",

  // 排除的文件夹不在explorer中显示
  "files.exclude": {
    "**/.idea": true
  },

  // 忽略搜索的目录
  "search.exclude": {
    "**/vendor": true,
    "**/node_modules": true
  },

  // 关闭代码小地图
  "editor.minimap.enabled": false,
  "editor.minimap.showSlider": "always",
  "editor.minimap.renderCharacters": false,

  // 编辑器字体
  "editor.fontSize": 15,
  "editor.fontLigatures": true,
  "editor.fontFamily": "Hack, 'Cascadia Code Mono ExtraLight', 'Jetbrains Mono', 'Fira Code',  Hack",

  // 光标宽度 && 行高
  "editor.cursorWidth": 1,
  "editor.lineHeight": 30,

  // 是否允许 hover
  "editor.hover.enabled": true,
  "editor.hover.sticky": false,
  "editor.hover.delay": 1000,

  // 控制光标是否应隐藏在概览标尺中
  "editor.hideCursorInOverviewRuler": true,

  // 粘贴时格式化
  "editor.formatOnPaste": true,

  // 忽略俩边的空格变化
  "diffEditor.ignoreTrimWhitespace": false,

  // 开启内联视图
  "diffEditor.renderSideBySide": true,

  // 编辑器代码提示
  "editor.acceptSuggestionOnEnter": "smart",
  "editor.quickSuggestionsDelay": 1,
  "editor.snippetSuggestions": "inline",
  "editor.suggest.shareSuggestSelections": true,

  // 命令行
  "terminal.integrated.shell.windows": "D:\\Git\\bin\\bash.exe",

  // vsicons 插件隐藏左边箭头
  "javascript.updateImportsOnFileMove.enabled": "always",

  // 匹配括号
  "editor.matchBrackets": "never",

  // 文件删除之前确认
  "explorer.confirmDelete": false,

  // 是否允许文件变量路径导航
  "breadcrumbs.enabled": false,
  "breadcrumbs.filePath": "off",

  // 同步 Git 存储库前请先进行确认
  "git.confirmSync": false,

  // 允许直接提交 git -am
  "git.enableSmartCommit": true,

  // git: 自动拉取代码
  "git.autofetch": true,

  // 启用后，将不会显示扩展建议的通知
  "extensions.ignoreRecommendations": true,

  // 在启动时不打开编辑器
  "workbench.startupEditor": "none",

  // 从文件路径打开文件
  "open-file-from-path.matchFileName": true,

  // 资源管理器内拖放移动文件时是否进行确认
  "explorer.confirmDragAndDrop": false,

  // 匹配当前光标所在位置单词高亮
  "editor.occurrencesHighlight": false,

  // 编辑器查找
  "editor.find.autoFindInSelection": "multiline",
  "editor.formatOnSave": false,
  "editor.formatOnType": true,

  // 更新模式: 启动的时候检查
  "update.mode": "start",

  // 主题配色
  "workbench.colorTheme": "rimless-monokai",

  // gitLens 插件配置
  "gitlens.currentLine.enabled": false,
  "gitlens.codeLens.enabled": false,

  // eslint 格式化
  "eslint.format.enable": true,
  "eslint.nodePath": "C:\\Program Files\\nodejs",
  "eslint.lintTask.enable": true,
  "eslint.quiet": true,
  "eslint.probe": ["javascript", "javascriptreact", "typescript", "typescriptreact", "html", "vue", "jsx"],
  "eslint.alwaysShowStatus": true,
  "eslint.debug": true,

  // todo-tree 插件
  "todo-tree.highlights.enabled": true,
  "todo-tree.tree.showScanModeButton": false,
  "todo-tree.general.tags": [
    "BUG",
    "HACK",
    "FIXME",
    "TODO",
    "XXX",
    "[ ]",
    "[x]"
  ],
  "todo-tree.regex.regex": "(//|#|<!--|;|/\\*|^|^\\s*(-|\\d+.))\\s*($TAGS)",
  "todo-tree.highlights.defaultHighlight": {
    "icon": "alert",
    "type": "text",
    "foreground": "red",
    "background": "black",
    "opacity": 0,
    "iconColour": "blue"
  },

  // 代码提示的类型
  "editor.quickSuggestions": {
    "other": true,
    "comments": false,
    "strings": false
  },

  // leetcode 插件配置
  "leetcode.endpoint": "leetcode-cn",
  "leetcode.workspaceFolder": "C:\\Users\\liaohui5\\.leetcode",
  "leetcode.hint.configWebviewMarkdown": false,

  // prettier 格式化默认设置
  "prettier.printWidth": 120,
  "prettier.vueIndentScriptAndStyle": true,
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },


  // 图标插件: 隐藏左边的箭头
  "material-icon-theme.hidesExplorerArrows": true,
  "explorer.compactFolders": false,

  // 缩进插件
  "bracket-pair-colorizer-2.colorMode": "Independent",

  // ---- VIM 插件配置 ----
  "vim.easymotion": true,
  "vim.easymotionDimBackground": true,
  "vim.autoindent": false,
  "vim.statusBarColorControl": false,
  "vim.hlsearch": true,
  "vim.foldfix": true,
  "vim.changeWordIncludesWhitespace": true,
  "vim.camelCaseMotion.enable": true,
  "vim.useSystemClipboard": true,
  "vim.leader": "<space>",
  "vim.normalModeKeyBindingsNonRecursive": [
    // - 取消高亮
    {
      "before": ["-"],
      "commands": [":nohl"]
    },
    // <space>+s => :w
    {
      "before": ["<leader>", "s"],
      "commands": [":w"]
    },
    // <space>+x => :x
    {
      "before": ["<leader>", "x"],
      "commands": [":x"]
    },
    // s 删除而不是剪切
    {
      "before": ["s"],
      "after": ["\"", "_", "s"]
    },
    // x 删除而不是剪切
    {
      "before": ["x"],
      "after": ["\"", "_", "x"]
    },
  ],
  "vim.visualModeKeyBindingsNonRecursive": [
    // $ 移动到本行结尾(不包括换行符)
    {
      "before": ["$"],
      "after": ["$", "h"]
    },
    // s 删除而不是剪切
    {
      "before": ["s"],
      "after": ["\"", "_", "s"]
    },
    // x 删除而不是剪切
    {
      "before": ["x"],
      "after": ["\"", "_", "x"]
    },
    {
      // 仅粘贴操作(不会影响剪切板)
      "before": ["p"],
      "commands": ["editor.action.clipboardPasteAction", "extension.vim_escape"]
    },
  ],
}
```

## 快捷键绑定

```json
[
  {
    // 切换 vim 插件禁用状态
    "key": "ctrl+alt+0",
    "command": "toggleVim"
  },
  {
    // 取消: 切换侧边栏显示
    "key": "ctrl+alt+k",
    "command": "-code-runner.runCustomCommand"
  },
  {
    // 取消: 切换侧边栏显示
    "key": "ctrl+b",
    "command": "-workbench.action.toggleSidebarVisibility"
  },
  {
    // 切换侧边栏显示
    "key": "ctrl+alt+k",
    "command": "workbench.action.toggleSidebarVisibility"
  },
  {
    "key": "alt+p",
    "command": "-keybindings.editor.toggleSortByPrecedence",
    "when": "inKeybindings"
  },
  {
    // 预览本文件变量/方法等简要信息
    "key": "alt+p",
    "command": "workbench.action.gotoSymbol"
  },
  {
    "key": "ctrl+shift+o",
    "command": "-workbench.action.gotoSymbol"
  },
  {
    "key": "alt+f",
    "command": "editor.action.fixAll"
  },
  {
    // 七牛云文件上传插件
    "key": "alt+f7",
    "command": "extension.qiniu",
    "when": "editorTextFocus"
  },
  {
    // 七牛云文件上传插件
    "key": "ctrl+alt+v",
    "command": "-extension.qiniu",
    "when": "editorTextFocus"
  },
  {
    // eslint 自动清除警告
    "key": "alt+f9",
    "command": "eslint.executeAutofix"
  },
  {
    // advancedNewFile新建文件
    "key": "ctrl+alt+n",
    "command": "extension.advancedNewFile"
  },
  {
    // 强制切换显示/隐藏编辑器提示
    "key": "ctrl+1",
    "command": "editor.action.triggerSuggest"
  }
]
```
