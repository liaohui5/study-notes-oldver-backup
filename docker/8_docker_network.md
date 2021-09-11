## 查看当前主机的网络信息

```bash
ip addr
```

![docker-network](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091307087.png)

## docker 是如何处理容器访问的?

### 1. 运行一个 docker 容器并且查看 ip 地址信息

```bash
# 启动一个容器
docker run -d -P --name ng1 nginx

# 查看启动的容器的ip地址信息
docker inspect ng1 --format='{{.NetworkSettings.IPAddress}}'
```

![docker-container-network](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091331864.png)

### 2. 再次查看宿主机的 ip 地址信息看看变化

```bash
ip addr
```

再次执行 `ip addr` 之后我们发现, 当我们启动了一个 docker 容器之后, 宿主机多了一个网卡信息

![host-ip-addr](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091350385.png)

### 3. 测试在宿主机上是否能够直接 ping 通 docker 容器

```bash
ping 172.17.0.2
# 这个地址是上面的步骤查看到的, 每个人的不一样
```

> 结论: 通过实验我们可以发现: 启动一个 docker 容器, 在宿主机上就会多出一个网卡, 而且宿主机可以直接通过这个网卡 ping 通 docker 容器

![ping-docker-contaienr](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091353836.png)

### 4. 再启动一个容器测试结论是否正确

```bash
# 再次启动一个容器
docker run -d -P --name ng2 nginx

# 查看这个容器的ip地址
docker inspect ng2 --format='{{.NetworkSettings.IPAddress}}'

# 查看宿主机的网卡的变化
ip addr
```

![ip-addr2](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091408527.png)

### 5. 容器和容器之间可以通信吗?

```bash
# 查看两个容器的ip地址
docker inspect ng1 -f='{{.NetworkSettings.IPAddress}}'
docker inspect ng2 -f='{{.NetworkSettings.IPAddress}}'

# 用ng1去ping ng2 的ip地址, 测试是否可以ping通
docker exec -it ng1 ping 172.17.0.3
```

经过测试发现是可以 ping 通的
![ping-container](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091419318.png)

> 注意点:

现在的新版本的 docker 容器可能没有 ping 这些命令, 这个就需要我们手动安装下:

```bash
# 1.进入容器
docker exec -it ng1 /bin/bash

# 2.更新源
apt-get update

# 3.安装 ifconfig(net-tools) 和 ping(iputils-ping) 命令
apt-get install net-tools
apt-get install iputils-ping

# 4.当我们安装完这两个命令以后, 可以用这个命令来查看容器的ip地址了
# 就可以不使用 inspect 命令了, 那个命令是在太长了, 而且这个ifconfig命令看到的信息更加详细
docker exec -it ng1 ifconfig
```

![ipconfig](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091429222.png)

### 结论

1. 每启动一个 docker 容器, 就会在宿主机上创建一个网卡
2. 宿主机可以通过这个网卡和 docker 容器进行通信
3. 容器与容器之间是在同一个网段的: 也就是说可以互相通信(ping 通)

## 通过 --link 参数设置网络连接(了解, 不常用)

> 启动 docker 容器的时候 ip 地址不是我们人为控制的, 而是按照启动顺序排列的, 这个很麻烦, 我们希望通过给这个 ip 设置别名的方式来访问网络, 不管 ip 如何变化都没有关系, 只要这个名字对了就可以了

### 启动一个新的容器并且通过 --link 连接到其他的容器

```bash
# 启动一个容器ng3通过--link连接到另外一个已经启动的容器ng2
docker run -d -P --name ng3 --link ng2 nginx

# 查看效果
docker exec -it ng3 ping ng2

# 由下图可见: 是可以 ping 通的, 而且是通过 ng2 这个名字, 而不是 ip 地址
# 现在的问题是这样的: ng3 启动的时候设置--link连接了ng2
# 但是ng2启动的时候并没有设置 --link 所以在 ng2 中无法 ping 通 ng3
```

![__link](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091454421.png)

![show__link](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091456887.png)

![ng2_ping_ng3](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091500437.png)

### 进入容器查看--link 的原理

> 其实就是在 `/etc/hosts` 文件中添加了一个域名解析

```bash
# 查看容器(ng3) 的 /etc/host 下的文件内容
docker exec -it ng3 cat /etc/hosts
```

![cat_hosts](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091525447.png)

## docker0 这个网络的问题

1. docker0 不支持通过容器名直接访问,需要通过--link 来连接
2. 通过--link 连接也只是在 hosts 中加了一行域名解析而已, 并不方便

- Q:既然这个 docker0 这么不方便, 那我们可以自定义自己的 docker 网络吗?
- A:可以, 但是在这之前, 我们需要学习一些命令, 来让我可以查看到所有的 docker 网络

## docker network 命令

### 1. 查看所有 docker 网络

```bash
# docker network --help 查看docker network的所有子命令

docker network ls
```

![docker_network](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091512940.png)

### 2. 查看某个网络的详细信息

```bash
docker network inspect 611f1c4752b4
```

![network_inspect](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091516629.png)

## 自定义网络实现容器互联

### 网络模式

- 桥接模式(默认): bridge 桥接模式
- 主机模式: host 和宿主机共享网络
- 不配置网络: none

### 创建网络

- `--driver` 指定网络模式(默认就是 bridge)
- `--subnet` 指定子网地址
- `--gateway` 指定子网网关
- `mynet` 自定义网络的名字

```bash
# 创建网络
docker network create \
--driver bridge \
--subnet 192.168.0.0/16 \
--gateway 192.168.0.1 \
mynet

# 查看是否创建成功
docker network ls

# 查看一个网络的详细信息
docker network inspect mynet
```

![mynet](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091551590.png)
![mynet2](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091555426.png)

### 将容器加入到自定义的网络中

#### 通过 `--net` 来指定容器的网络

```bash
# 启动连个容器并且都加入到 mynet 这个网络下
docker run -d -P --net mynet --name mynet-ng1 nginx
docker run -d -P --net mynet --name mynet-ng2 nginx
```

#### 查看自定义网络的变化

```bash
docker network inspect mynet
```

![show_mynet1](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091604815.png)

既然使用 `--link` 也可以直接实现容器互联, 为什么还要费这么大劲来自定义网络呢??

#### 自定义网络的好处

1. 弥补了 `--link` 的不足, 必须互相 `--link` 才能实现互联
2. 可以直接通过容器的名字来通信
3. 隔离性: 可以创建多个自定义网络, mysql 集群在 mysql 的网络里, redis 集群在 redis 网络里

## 如何让容器跨网络通信

现在的网络是样的

![nets](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091627647.png)

### 使用 docker network connect 命令让容器加入网络

```bash
# 查看网络详细信息
docker network inspect mynet

# 让 ng1 加入 mynet 网络
docker network connect mynet ng1
```

> ng1 加入 mynet 之前:

![mynet_before](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091724305.png)

> ng1 加入 mynet 之后

![mynet_after](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091806684.png)

> 此时再查看 ng1 的网络信息

发现此时这个 `ng1` 容器多了一个网卡, 这个网卡就是用来连接咋们的自定义网络的

```bash
# 查看 ng1 的网络信息
docker exec -it ng1 ifconfig

# ng1 测试是否能够直接ping同mynet网络下的容器
docker exec -it ng1 ping mynet-ng1
```

![ng1_ifconf](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091816749.png)

![access](https://raw.githubusercontent.com/liaohui5/images/main/images/202109091826186.png)

因为 ng1 加入了 `mynet` 这个网络, 所以现在 `ng1` 可以直接访问 `mynet` 网络下的所有容器里
