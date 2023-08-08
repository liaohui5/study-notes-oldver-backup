## Nginx 是什么

Nginx 是一个高性能的 web 服务器软件, 类似的还有 [candy](https://caddyserver.com/) [Apache](https://httpd.apache.org/) 等

## 能做什么? 为什么要学习他?

1. 可以部署前端打包后的今天资源, 提供访问
2. 学习其他的两个也是可以的

## 安装

```bash
# 可以用包管理工具一键安装
yum install -y nginx

# or 
apt-get install nginx
```

## 配置

- [官方文档](http://nginx.org/en/docs/)
- [在线文档(中文)](https://docshome.gitbook.io/nginx-docs/)
- [在线生成配置](https://nginx.p2hp.com/config/?global.app.lang=zhCN)
- [配置文件解析](https://www.cnblogs.com/54chensongxia/p/12938929.html)

如果是 `apt-get install nginx` 命令安装的, 那么配置文件在 `/etc/nginx/nginx.conf` 目录下, 如果是源码编译安装的可能不此目录


## 基本配置

> 配置 http 访问(www.demo1.com)

在 nginx 的配置文件 `nginx.conf` 中, 默认会有 `include` 语句,

如: `include/conf.d/*.conf` `include/enable-sites/*.conf` 在 debian 上默认是这样的(可能略有不同)

这代码的意思就是引入 `nginx.conf` 同级目录下的 `conf.d 和 enable-sites` 目录下的所有 `.conf` 的文件, 

那么只需要在 `enable-sites` 或者 `conf.d` 目录下新建 `xxx.conf` 就会自动生效了

```
server {
    listen       80;             # 监听端口
    server_name  www.demo1.com;  # 域名
    root /usr/share/www/demo1;   # 网站根目录

    location / {
        index  index.html index.htm; # 首页
    }
}
```

> 配置 https 访问(www.demo2.com)


```
server {
  listen 443 ssl default_server;   # 监听端口

  # default_server: 用于指定默认的 server 块, 当客户端请求的 ip 地址 在 Nginx 中没有匹配到任何 server 块时候, 使用这个 server 块
  # ssl: 用于启用 SSL/TLS 加密连接

  # 使用了 ssl 指令后, 需要指定 ssl 证书的文件路径, 证书文件可以用 certbot 来生成
  ssl_certificate      /path/to/cert.pem;
  ssl_certificate_key  /path/to/key.pem;

  server_name  www.demo2.com;      # 域名
  root /usr/share/www/demo2;       # 网站根目录

  location / {
    index  index.html index.htm; # 首页
  }
}
```


## 反向代理

```
server {
  listen 8081;                       # 监听端口
  server_name www.opendomain.com;    # 公开的域名(让别人用这个域名来访问)

  location / {
    proxy_pass http://your.target.com;         # 代理的目标服务器
    proxy_set_header HOST $host;               # 设置请求头信息 HOST
    proxy_set_header X-Real-IP $remote_addr;   # 设置请求头信息访问者 IP
  }
}
```

> 什么是反向代理, 什么是正向代理?

+ 正向代理: 用户 -> 代理服务器 -> 访问谷歌: 用于保护客户端

+ 反向代理: 用户 -> 代理服务器 -> 真正的服务器: 用于保护服务端


## certbot 使用

certbot 可以用来生成 ssl 证书(免费的), ssl 证书就是配置 https 需要的证书

```shell
# 安装 certbot 和 生成 nginx ssl 插件
sudo apt-get -y install certbot
sudo apt-get -y install python3-certbot-nginx

# 注意需要 nginx 是运行状态才能正确生成成功
sudo certbot -w /usr/local/www/example  -d www.example.com --email "example@gmail.com" --nginx --renew-by-default
```

> 参数:

- `-w`: 网站根目录路径(如: /usr/local/www/example)
- `-d`: 域名(如: www.example.com example.com)
- `--email`: 邮箱,会在证书快过期时提示你(如: example@gmail.com)
- `--renew-by-default`: 证书快到期,自动续期,有的不支持,不知道为什么


> 注意点:

生成的 `pem` 文件在 `/etc/letsencrypt/archive` 目录中,

命令行提示的 `/etc/letsencrypt/live` 目录中的不是文件, 而是文件的软链接

```shell
# 这个路径中的 example.com 是执行命令时的 域名
ls -al /etc/letsencrypt/example.com 
```




