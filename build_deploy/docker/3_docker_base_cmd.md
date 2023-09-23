## 文档

- [ 官方文档所有命令参考](https://docs.docker.com/engine/reference/run/)

## 帮助命令

```shell
# 查看 docker 信息
sudo docker info

# 查看 docker 版本信息
sudo docker version

# 查看命令的帮助:  docker 命令 --help 或者 -h
sudo docker search -h

# 输出如下
Flag shorthand -h has been deprecated, please use --help

Usage:    docker search [OPTIONS] TERM  # 命令格式

Search the Docker Hub for images      # 命令描述

Options:                              # 命令可选参数
  -f, --filter filter   Filter output based on conditions provided
      --format string   Pretty-print search using a Go template
      --limit int       Max number of search results (default 25)
      --no-trunc        Don't truncate output
```

## image 镜像命令

> docker images 查看所有本地镜像

```shell
[liaohui@localhost ~]$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              bf756fb1ae65        6 months ago      13.3kB
# 仓库               版本标签             镜像id              镜像创建时间       镜像大小
```

> docker image 搜索镜像
>
> 建议官方网站搜索: https://hub.docker.com/search?q=mysql&type=image

```shell
sudo docker search mysql

# 输出如下
NAME                              DESCRIPTION                                   STARS
mysql                             MySQL is a widely used, open-source…          9718
mariadb                           MariaDB is a community-developed…             3542

# 名称                             # 描述                                     # 收藏数
```

> docker pull 下载镜像, 默认下载最新版本

```shell
sudo docker pull mysql

Using default tag: latest  # 默认使用最新版本
latest: Pulling from library/mysql
8559a31e96f4: Verifying Checksum
d51ce1c2e575: Download complete
c2344adc4858: Download complete
fcf3ceff18fc: Download complete
16da0c38dc5b: Download complete
b905d1797e97: Verifying Checksum
4b50d1c6b05c: Download complete
c75914a65ca2: Download complete
....

# 下载指定版本(版本一定得是在 https://hub.docker.com 网站中有的版本)
sudo docker pull mysql:5.5

# 输出
5.5: Pulling from library/mysql
743f2d6c1f65: Pull complete
3f0c413ee255: Pull complete
aef1ef8f1aac: Pull complete
f9ee573e34cb: Pull complete
3f237e01f153: Pull complete
03da1e065b16: Pull complete
04087a801070: Pull complete
7efd5395ab31: Pull complete
1b5cc03aaac8: Pull complete
2b7adaec9998: Pull complete
385b8f96a9ba: Pull complete
Digest: sha256:12da85ab88aedfdf39455872fb044f607c32fdc233cd59f1d26769fbf439b045
Status: Downloaded newer image for mysql:5.5
docker.io/library/mysql:5.5
```

![image-20200711003246383](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131633635.png)

> docker rmi 删除镜像

```shell
sudo docker rmi -f mysql                 # 通过镜像名称删除镜像
sudo docker rmi -f d404d78aa797          # 通过镜像ID删除镜像
sudo docker rmi -f $(docker images -aq)  # 通过命令参数的形式删除所有镜像

# 参数
-f --force 强制删除

# 全部删除
[root@Aliyun ~]# sudo docker rmi -f $(docker images -aq)
Untagged: mysql:5.5
Untagged: mysql@sha256:12da85ab88aedfdf39455872fb044f607c32fdc233cd59f1d26769fbf439b045
Deleted: sha256:d404d78aa797c87c255e5ae2beb5d8d0e4d095f930b1f20dc208eaa957477b74
Deleted: sha256:8ae7b3986b745c9cea4ea3789277dbf8543d6caed82c23d1ec19637813376df5
Deleted: sha256:6aaf52074d0d6ec3263af5f53b921a91ba3ddbeb2fece1a82ebe1bc5086c3814
Deleted: sha256:cf0a74866630c5d7ed05927cf981ac93b63ba83407872c9c0fbe0486d5f9806e
Deleted: sha256:e06cee897f9eb6bb5769f93cf6cd0285bb773d7e2bad6dfd5592a8682a6e6740
Deleted: sha256:4354e03e5a414adc57def51226d72fa2d117875a6c9665561a7c0fc85d23c46f
Deleted: sha256:647b973285178c7d4bf022c31baac404e0947d37be8e8e85731de8f7ca7e70e6
Deleted: sha256:c75ab456a585af40ca2ec8488164230deb81a1739d868604cb7b6661c24e37b5
Deleted: sha256:50a75eb6a0b2254fe5d96f999cc2087e72d515c93509a816bbd9ffb707a3b1b0
Deleted: sha256:1ae6616333a66450738a72a75c03bdf0236e0425ba0336ac5cdbe470ab6f4a3e
Deleted: sha256:68e318bd9263aedd19d9d73b051a262fa57e2a16f9c81c8b39163601020cd405
Deleted: sha256:6270adb5794c6987109e54af00ab456977c5d5cc6f1bc52c1ce58d32ec0f15f4
```

## container 容器命令

> docker run 运行容器

```shell
sudo docker run [参数] image

# 参数说明
--name="name"     # 容器名字, mysql55, mysql57 用于区分容器
-d                # 后台运行
-it               # 使用交互方式运行, 进入容器
-P                # (大写)随机指定端口
-p                # (小写)设置端口映射
                  # 1) 主机端口:容器端口
                  # 2) 容器端口

# 进入一个centos镜像
sudo docker run -it centos /bin/bash
```

> docker ps 查看运行的容器

```sh
sudo docker ps
-a       # 列出所有运行过的容器
-n=3     # 列出最新运行过的3个容器
-q       # 查看容器ID container-id
```

> docker remove 删除容器

```shell
sudo docker remove container           # 移除名字叫 container 的容器
sudo docker remove -f $(docker ps -aq) # 移除所有容器
```

> 启动和停止容器

```shell
sudo docker start container        # 启动容器
sudo docker restart container      # 重启启容器
sudo docker stop container         # 停止容器
sudo docker kill container         # 强行杀死容器进程
```

## 其他命令

> docker logs 查看日志

```shell
# 写个 shell 脚本, 让容器一直产生日志  centos 是容器名
sudo docker run centos -it /bin/bash -c "while true; do echo hello; sleep 1; done"

sudo docker logs -tf centos

# 参数
-tf          # 显示日志(全部)
--tail  10   # 查看最新的10日志
```

> docker top 查看容器的进程命令

```sh
sudo docker top centos # 查看centos 的进程信息, 输出和 linux 的 top 命令一致
```

> docker exec 进入正在运行的容器

```shell
sudo docker exec -it centos /bin/bash  # 进入名称为centos这个容器中, 打开一个新的终端
sudo docker attach centos       # 打开新的终端并进入centos这个容器中, 容器正在执行的终端
```

> docker inspect 查看镜像元信息

```shell
sudo docker inspect centos # 查看 centos 这个镜像的元信息
```

> docker cp 从容器中复制文件

```shell
# 1. 进入容器
```

## 总结图示

![image-20200711014627325](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131633670.png)

## 安装图形化管理工具

就功能类似 navicat 去管理 mysql 的数据

```shell
sudo docker run -d \
-p 9999:9999 \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
--privileged=true \
portainer/portainer
```
