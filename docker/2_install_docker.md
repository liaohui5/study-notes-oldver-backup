### 查看系统内核版本

```shell
uname -a

# 输出如下信息:
Linux localhost 3.10.0-1127.el7.x86_64 #1 SMP Tue Mar 31 23:36:51 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux

# 3.10.0-1127.el7.x86_64 系统内核大于 3.0 才可以支持最新版的 docker-ce
```

### 安装 Docker-ce

- [官方文档](https://docs.docker.com/engine/install/centos/)

```shell
# 1. 删除旧版本 docker
sudo yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine

# 2. 安装一些必要的工具
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 3. 添加软件源信息

sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 4. 更新软件包索引
sudo yum makecache fast

# 5. 安装 docker-ce
sudo yum -y install docker-ce

# 6. 开启 docker 服务
sudo service docker start

# 7. 查看版本信息 && hello-world
sudo docker version
sudo docker run hello-world
```

### 卸载 Docker

```shell
# 删除docker
sudo yum remove docker-ce docker-ce-cli containerd.io

# 删除docker的其他文件
sudo rm -rf /var/lib/docker
```

### 配置阿里云镜像加速

```shell
# 1. 新建目录
sudo mkdir -p /etc/docker

# 2. 配置加速地址(这个地址登录: https://cr.console.aliyun.com/cn-zhangjiakou/instances/mirrors 去获取)
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxxx.mirror.aliyuncs.com"]
}
EOF

# 3. 重启守护进程 && 重启 docker
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 可能出现的问题

> 需要设置开启自启动

```shell
# 设置开机自启动
systemctl enable docker.service


# 关闭开机自启动
systemctl disable docker.service
```

> sudo docker run 却显示没有权限

```shell
sudo docker run hello-world

# 输出如下:
docker: Error response from daemon: OCI runtime create failed: container_linux.go:349: starting container process caused "process_linux.go:449: container init caused \"write /proc/self/attr/keycreate: permission denied\"": unknown.
ERRO[0000] error waiting for container: context canceled

# 出现问题的原因: selinux 的权限限制
# 解决办法: 关闭 selinux 然后重启系统
sudo  vim /etc/selinux/config

# 修改以下内容:(禁用 selinux) 然后重启
SELINUX=disabled
```
