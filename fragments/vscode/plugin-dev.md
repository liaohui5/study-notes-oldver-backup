## 相关文档(建议阅读)

- [快速开始](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/get-started/your-first-extension)

## 安装相关工具

```bash
npm i yo generator-code vsce
```

- [yoman](https://yeoman.io/) 快速生成插件模板
- [vsce](https://github.com/microsoft/vscode-vsce) 发布插件到插件市场

## 开发

开发相关操作,请查看文档,毕竟插件功能不一样,不可能去开发一个插件然后记录笔记

## 调试(主题插件)

1. 在插件目录下新建 `.vscode` 目录
2. 在 `.vscode` 目录下创建 `launuch.json`, 内容如下:
3. 按 `f5` 启动调试

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "extensionHost",
      "request": "launch",
      "name": "Launch Extension",
      "runtimeExecutable": "${execPath}",
      "args": ["--extensionDevelopmentPath=${workspaceFolder}"],
      "outFiles": ["${workspaceFolder}/out/**/*.js"]
    }
  ]
}
```

## 发布

- 注册一个[微软 azure 账号](https://dev.azure.com/), 然后登录
- [按照文档的发布流程发布插件](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) 墙裂推荐
- 也可以直接登录 [https://marketplace.visualstudio.com/](https://marketplace.visualstudio.com/) 然后点击 Publish extensions 链接去发布

![preview](https://raw.githubusercontent.com/liaohui5/images/main/images/202207120317873.png)
