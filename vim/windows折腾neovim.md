## 安装

- 下载地址: ![https://github.com/neovim/neovim/releases](https://github.com/neovim/neovim/releases)
- 下载解压, 把 `bin` 目录添加到环境变量
- 打开命令行输入, `nvim` 或者 `nvim-qt` 如果能打开软件证明安装成功

> nvim 和 nvim-qt 的区别:

- nvim: 是终端启动
- nvim-qt: 是独立软件

## 安装 vim-plug

- 进入 `C:/Users/{user}/AppData/Local/`
- 创建 `nvim` 这个目录, 名字不能改
- 在 `nvim` 目录下创建 `init.vim` `ginit.vim` 两个文件
- 在 `nvim` 目录下创建 `autoload` 和 `plugins` 两个目录
- vim-plug [下载地址](https://github.com/junegunn/vim-plug)
- 到下载地址中把 `plug.vim` 这个文件下载下来放到 `autoload` 目录下即可

> init.vim 和 ginit.vim 的作用

- init.vim: 用来设置 nvim 的设置
- ginit.vim: 用来设置 nvim-qt 的设置

为什么要分开两个配置文件? 因为有些配置在终端中是没法使用的

> autoload 和 plugins 的作用

- autoload: 自动加载插件
- plugins: 用于存放 `vim-plug` 安装的一些其他插件


## 安装其他插件
- ginit.vim

```
call plug#begin('~/AppData/Local/nvim/plugins')

" 开屏插件
Plug 'mhinz/vim-startify'

call plug#end()
```



