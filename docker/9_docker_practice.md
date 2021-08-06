## 打包部署 Node.js 项目

- Dockerfile

```docker
# 基础node.js镜像版本
FROM node:lts-alpine

# 工作目录
WORKDIR /usr/www/webapp

# 执行命令: 安装依赖
RUN npm install

# 将本地项目复制到镜像中
COPY . .

# 暴露3000端口
EXPOSE 3000

# 启动命令
CMD ["node", "app.js"]
```

- 打包部署命令

```sh
# 根据当前目录下的 Dockerfile 打包
docker build -t liaohui5/myweb:latest .

# 查看 images
docker images

# 运行
docker run --name myweb -p 80:3000 -d --restart=always liaohui5/myweb:latest

# 查看运行所有的容器
docker ps

# 停止容器
docker container stop myweb

# 删除运行的容器
docker constainer rm  myweb

# 查看所有容器
docker ps
```

- 如何访问测试?

> 查看虚拟机 ip(如: `192.168.199.191` ), 宿主机直接在浏览器中访问 ip 即可

## 安装 redis-server

- [默认配置文件下载](https://download.redis.io/redis-stable/redis.conf)
- [配置文件选项解释](https://www.cnblogs.com/DreamDrive/p/5587219.html)
- 注意需要默认的配置文件 $PWD/redis.conf

```bash
docker run -d \
-p 6379:6379 \
--privileged=true \
--restart=always \
-v $PWD/redis.conf:/etc/redis/redis.conf \
-v $PWD/redis.conf/redis_data:/data \
--name rds redis redis-server /etc/redis/redis.conf \
--appendonly yes
```

## 安装 mysql-server(5.7)

- -e 指定环境变量, MYSQL_ROOT_PASSWORD, root 账号密码
- --character-set-server=utf8mb4 设置默认字符集

```bash
docker run -d \
-p 3306:3306 \
--privileged=true \
--restart=always \
-v $PWD/mysql_data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=root \
--name mysql mysql/mysql-server \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_general_ci
```
