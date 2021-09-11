## 介绍

[docker-compose 官方文档](https://docs.docker.com/compose/)

docker-compose 简单来说: 就是一个多容器定义和运行的编排工具, 主要需要学习以下内容:

1. 还是需要一个 `Dockerfile` 保证能在任何环境下运行
2. docker-compose 配置文件 `docker-compose.yaml`
3. 启动/停止命令



## 安装

```bash
# 下载
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 给予可执行的权限
sudo chmod +x /usr/local/bin/docker-compose

# 查看是否安装好
docker-compose
```


![image-20210909222609322](https://raw.githubusercontent.com/liaohui5/images/main/images/202109092226030.png)



## 快速体验

https://docs.docker.com/compose/gettingstarted/

### 官网运行的 docker-compose 实例

1. 创建应用 `app.py`
2. 使用 `Dockerfile` 将应用打包为镜像
3. 使用 `docker-compose.yaml` 定义服务, 比如 `web` `redis`
4. 使用 `docker-compose up` 命令启动项目

![image-20210909225611416](https://raw.githubusercontent.com/liaohui5/images/main/images/202109092256139.png)



### 以上项目的启动(docker-composer up)流程

```bash
# 1. 创建网络 "test_default"
# Creating network "test_default" with the default driver

# 2. 执行 docker-compose.yaml 中定义的服务容器
# Building web
# Sending build context to Docker daemon  5.632kB
# Step 1/10 : FROM python:3.7-alpine
# 3.7-alpine: Pulling from library/python
# a0d0a0d46f8b: Pull complete 
# ... 总共 10 个步骤

# 3. 启动服务
```


### 查看运行结果

![image-20210909231454230](https://raw.githubusercontent.com/liaohui5/images/main/images/202109092314093.png)



### 项目启动后, 查看 images/containers 的变化

在 `第2步` docker-compose 启动的时候, 会检查配置文件中需要用到的镜像, 如果有本地没有就会自己去下载

![image-20210909232124100](https://raw.githubusercontent.com/liaohui5/images/main/images/202109092321329.png)



### 停止项目

```bash
# 在 docker-compose.yaml 同级目录下执行:
docker-compose down
```



## docker-compose 配置编写规则

docker-compose 配置的编写规则简单来说: 就是 `docker-cmopose.yaml` 的编写规则,

既然要写 `yaml` 代码, 那就必须先了解 `yaml` 的语法规则

- [yaml 语法入门](https://www.runoob.com/w3cnote/yaml-intro.html)
- [docker-compose 中文文档](https://dockerdocs.cn/compose/)
- [docker-compose 官方文档](https://docs.docker.com/compose/)



### 核心规则

+ [官方文档](https://docs.docker.com/compose/compose-file/)
+ [中文文档](https://dockerdocs.cn/compose/compose-file/)

常用的规则有以下几个: 

```yaml
version: "3" # 表示当前使用的 docker-compose 的版本
services:    # 服务列表
	- web
	- redis
network:    # 网络列表
	- webnet
	- redisnet
volumns:     # 容器卷列表
	- mysql
	- redis
```

















