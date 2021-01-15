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
  "vsicons.presets.hideExplorerArrows": true,
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

  // 启用后，将不会显示扩展建议的通知
  "extensions.ignoreRecommendations": true,

  // 在启动时不打开编辑器
  "workbench.startupEditor": "none",

  // 从文件路径打开文件
  "open-file-from-path.matchFileName": true,

  // 不显示新版本信息
  "vsicons.dontShowNewVersionMessage": true,

  // 资源管理器内拖放移动文件时是否进行确认
  "explorer.confirmDragAndDrop": false,

  // 匹配当前光标所在位置单词高亮
  "editor.occurrencesHighlight": false,

  // eslint 格式化
  "eslint.format.enable": true,
  "eslint.nodePath": "C:\\Program Files\\nodejs",
  "eslint.lintTask.enable": true,
  "eslint.quiet": true,
  "eslint.probe": ["javascript", "javascriptreact", "typescript", "typescriptreact", "html", "vue", "jsx"],
  "editor.find.autoFindInSelection": "multiline",
  "editor.formatOnSave": false,
  "editor.formatOnType": true,
  "eslint.alwaysShowStatus": true,
  "eslint.debug": true,

  // 允许直接提交 git -am
  "git.enableSmartCommit": true,

  // todo-tree 插件
  "todo-tree.highlights.enabled": true,
  "todo-tree.tree.showScanModeButton": false,
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
  "workbench.colorTheme": "rimless-monokai",
  "extensions.showRecommendationsOnlyOnDemand": true,
  "update.mode": "start",
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // prettier 格式化默认设置
  "prettier.printWidth": 120,
  "prettier.vueIndentScriptAndStyle": true,
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

  // vim配置
  "vim.easymotion": true,
  "vim.easymotionDimBackground": true,
  "vim.autoindent": false,
  "vim.statusBarColorControl": false,
  "vim.hlsearch": true,
  "vim.changeWordIncludesWhitespace": true,
  "vim.camelCaseMotion.enable": true,
  "vim.useSystemClipboard": true,
  "git.autofetch": true,
  "material-icon-theme.hidesExplorerArrows": true,
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "bracket-pair-colorizer-2.colorMode": "Independent",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "liveServer.settings.donotShowInfoMsg": true,
  "explorer.compactFolders": false
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
