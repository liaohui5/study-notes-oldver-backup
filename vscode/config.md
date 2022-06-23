## 配置

### 编辑器配置项

```json
{
  // 缩放比例
  "window.zoomLevel": 0.5,

  // 面包屑导航
  "breadcrumbs.enabled": false,

  // 关闭代码小地图
  "editor.minimap.enabled": false,

  // 编辑器字体
  "editor.fontSize": 15,
  "editor.fontLigatures": true,
  "editor.fontFamily": "Hack,'Operator Mono', Hack, Monaco",

  // 光标宽度 && 行高
  "editor.cursorWidth": 1,
  "editor.lineHeight": 1.6,

  // 是否允许 hover
  "editor.hover.enabled": true,
  "editor.hover.sticky": true,
  "editor.hover.delay": 100,

  // 100 毫秒后显示代码提示
  "editor.quickSuggestionsDelay": 100,

  // 多个窗口可以共享代码提示
  "editor.suggest.shareSuggestSelections": true,

  // 代码提示的类型
  "editor.quickSuggestions": {
    "other": "on",      // 其他(snippets + suggest)
    "comments": "off",  // 注释内容
    "strings": "on"     // 代码中的字符串
  },

  // 匹配括号
  "editor.matchBrackets": "never",

  // 匹配当前光标所在位置单词高亮
  "editor.occurrencesHighlight": false,

  // 同步 Git 存储库前请先进行确认
  "git.confirmSync": false,

  // 允许直接提交 git -am
  "git.enableSmartCommit": true,

  // git: 自动拉取代码
  "git.autofetch": true,

  // 自动保存文件
  "files.autoSave": "onFocusChange",

  // 文件删除之前确认
  "explorer.confirmDelete": false,

  // 资源管理器内拖放移动文件时是否进行确认
  "explorer.confirmDragAndDrop": false,

  // 如果 true 文件夹中只有一个文件时,显示 "dir/file"
  "explorer.compactFolders": false,

  // 忽略插件提示
  "extensions.ignoreRecommendations": true,

  // 更新模式: 启动的时候检查
  "update.mode": "start",

  // 在侧边栏修改文件名时,代码自动跟新路径
  "javascript.updateImportsOnFileMove.enabled": "always",

  /////////////////////////////////////////
  // workbench
  /////////////////////////////////////////
  // 颜色主题/图标主题
  "workbench.iconTheme": "material-icon-theme",
  "workbench.colorTheme": "rimless-monokai",

  // 打开设置使用左右json
  "workbench.settings.editor": "json",
  "workbench.settings.useSplitJSON": true,

  // 在启动时不打开编辑器
  "workbench.startupEditor": "none",
}
```

### 插件配置项

```json
  /////////////////////////////////////////
  // extensions
  /////////////////////////////////////////
  // 图标插件(vsicons/material-icon-theme): 隐藏左边的箭头
  "vsicons.presets.hideExplorerArrows": true,
  "material-icon-theme.hidesExplorerArrows": true,

  // volar插件不显示 references
  "volar.codeLens.references": false,

  // markdown github styling
  "markdown-preview-github-styles.colorTheme": "light",

  // 自定义宏(在快捷键中可以用: vscode快捷键 + vim快捷键)
  "macros": {
    "copyExplorerFileWithoutRename":[
      "filesExplorer.copy",
      "filesExplorer.paste",
    ]
  },

  // eslint 格式化
  "eslint.format.enable": true,
  "eslint.lintTask.enable": true,
  "eslint.quiet": true,
  "eslint.probe": ["javascript", "javascriptreact", "typescript", "typescriptreact", "html", "vue", "jsx"],
  "eslint.alwaysShowStatus": true,
  "eslint.debug": true,

  // todo-tree 插件
  "todo-tree.highlights.enabled": true,
  "todo-tree.general.tags": ["BUG", "HACK", "FIXME", "TODO", "XXX", "[ ]", "[x]"],
  "todo-tree.regex.regex": "(//|#|<!--|;|/\\*|^|^\\s*(-|\\d+.))\\s*($TAGS)",
  "todo-tree.highlights.defaultHighlight": {
    "icon": "alert",
    "type": "text",
    "foreground": "#f00",
    "background": "#000",
    "opacity": 0,
    "iconColour": "#00f"
  },

  // prettier 格式化默认设置
  "prettier.printWidth": 150,
  "prettier.vueIndentScriptAndStyle": true,
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "breadcrumbs.showFunctions": true,
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
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // leetcode 插件配置
  "leetcode.endpoint": "leetcode-cn",
  "leetcode.hint.configWebviewMarkdown": false,
  "leetcode.defaultLanguage": "javascript",
  "leetcode.workspaceFolder": "/Users/liaohui5/Desktop/leetcode",
  "leetcode.hint.commandShortcut": false,
  "leetcode.hint.commentDescription": false,
```

## 快捷键绑定

```json
// Place your key bindings in this file to override the defaults
[
  {
    // 切换 vim 插件禁用状态
    "key": "ctrl+alt+0",
    "command": "toggleVim"
  },
  {
    // 切换侧边栏显示
    "key": "ctrl+t",
    "command": "workbench.action.toggleSidebarVisibility"
  },
  {
    // 预览本文件变量/方法等简要信息
    "key": "alt+p",
    "command": "workbench.action.gotoSymbol"
  },
  {
    // ctrl+\ 注释
    "key": "ctrl+\\",
    "command": "editor.action.commentLine",
    "when": "editorTextFocus && vim.active && vim.mode !== 'Insert'"
  },
  {
    // alt+\ 显示代码提示
    "key": "alt+\\",
    "command": "editor.action.triggerSuggest",
    "when": "editorTextFocus && vim.active && vim.mode !== 'Insert'"
  },
  {
    // 搜索文件快速打开
    "key": "ctrl+p",
    "command": "workbench.action.quickOpen",
    "when": "textInputFocus || explorerViewletFocus"
  },
  {
    // 代码提示显示时: 选中上一个代码提示
    "key": "ctrl+p",
    "command": "selectPrevSuggestion",
    "when": "suggestWidgetVisible && suggestWidgetMultipleSuggestions"
  },
  {
    // 代码提示显示时: 选中下一个代码提示
    "key": "ctrl+n",
    "command": "selectNextSuggestion",
    "when": "suggestWidgetVisible && suggestWidgetMultipleSuggestions"
  },
  {
    // 在显示搜索文件输入框时: 选中上一个
    "key": "ctrl+p",
    "command": "workbench.action.quickOpenSelectPrevious",
    "when": "inQuickOpen"
  },
  {
    // 在显示搜索文件输入框时: 选中下一个
    "key": "ctrl+n",
    "command": "workbench.action.quickOpenSelectNext",
    "when": "inQuickOpen"
  },
  {
    // 在编辑器/任意输入框没有焦点的时: 获取焦点
    "key": "[space]",
    "command": "workbench.action.focusFirstEditorGroup",
    "when": "!editorTextFocus && !textInputFocus && !editorFocus && !inputFocus"
  },
  {
    // 编辑器报错时: 快速修复
    "key": "alt+[Backspace]",
    "command": "editor.action.quickFix",
    "when": "editorHasCodeActionsProvider && editorTextFocus && !editorReadonly"
  },

  ////////////////////////////////////////////////////////
  // 光标在侧边栏的时候: 配合 vim 使用
  ////////////////////////////////////////////////////////
  {
    // a: 新建文件
    "key": "a",
    "command": "explorer.newFile",
    "when": "explorerViewletFocus && !explorerResourceReadonly && !inputFocus"
  },
  {
    // r: 修改文件名
    "key": "r",
    "command": "renameFile",
    "when": "explorerViewletFocus && filesExplorerFocus && !explorerResourceReadonly && !inputFocus"
  },
  {
    // d: 删除文件
    "key": "d",
    "command": "moveFileToTrash",
    "when": "explorerViewletFocus && filesExplorerFocus && !explorerResourceReadonly && !inputFocus"
  },
  {
    // enter: 打开文件
    "key": "enter",
    "command": "explorer.openAndPassFocus",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsFolder && !inputFocus"
  },
  {
    // s: 在侧边打开文件, 会新开一个窗口
    "key": "s",
    "command": "explorer.openToSide",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsFolder && !inputFocus"
  },
  {
    // p: 预览文件(不会直接获取光标)
    "key": "p",
    "command": "filesExplorer.openFilePreserveFocus",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsFolder && !inputFocus"
  },
  {
    // c: 复制文件并且重命名(需要插件: File Utils)
    "key": "c",
    "command": "fileutils.duplicateFile",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsFolder && !inputFocus"
  },
  {
    // y: 直接复制文件使用默认的复制文件名(需要插件: macro-commander)
    "key": "y",
    "command": "macros.copyExplorerFileWithoutRename",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsFolder && !inputFocus"
  },


  ////////////////////////////////////////////////////////
  // 取消默认
  ////////////////////////////////////////////////////////
  {
    // 取消默认: ctrl+b
    "key": "ctrl+b",
    "command": "-workbench.action.toggleSidebarVisibility"
  },
  {
    // 取消默认: alt+p
    "key": "alt+p",
    "command": "-keybindings.editor.toggleSortByPrecedence",
    "when": "inKeybindings"
  },
  {
    // 取消默认: ctrl+shift+o
    "key": "ctrl+shift+o",
    "command": "-workbench.action.gotoSymbol"
  },
  {
    // 取消默认: ctrl+p
    "key": "ctrl+p",
    "command": "-workbench.action.quickOpenSelectPrevious",
    "when": "inQuickOpen"
  },
  {
    "key": "cmd+down",
    "command": "-explorer.openAndPassFocus",
    "when": "explorerViewletVisible && filesExplorerFocus && !explorerResourceIsFolder && !inputFocus"
  },
  {
    "key": "cmd+.",
    "command": "-editor.action.quickFix",
    "when": "editorHasCodeActionsProvider && editorTextFocus && !editorReadonly"
  },
]
```
