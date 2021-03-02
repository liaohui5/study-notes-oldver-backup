## 制作自己的镜像(终于入门 docker 了...)

通俗的理解就是: 这个镜像就是一个虚拟机, 这个自己制作的镜像就是一个虚拟机的快照

#### docker commit 提交一个自己的镜像

```shell
# sudo docker commit -a "作者名" -m "提交信息" 原容器名 自定义镜像名:版本tag
```

```shell
# 0. 运行一个容器
sudo docker run -d -it -p 80:80 --name ngx_1 nginx

# 1. 进入容器
[root@localhost ~]# docker exec -it ngx_1  /bin/bash

# 2. 找到 HTML 文件并修改文件内容
root@c81a821f3527:/# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
root@c81a821f3527:/# cd /usr/share/nginx/html/
root@c81a821f3527:/usr/share/nginx/html# ls
50x.html  index.html
root@c81a821f3527:/usr/share/nginx/html# echo "hello nginx" > index.html

# 3. 查看文件内容是是否修改成功
root@c81a821f3527:/usr/share/nginx/html# cat index.html
hello nginx

# 4. 测试
[root@localhost ~]# curl http://localhost:80
hello nginx

# 5. 基于这个修改后的镜像打包自己的镜像
sudo docker commit -a "liaohui5" -m "updated html files" ngx_1 myngx1:1.0

## 6. 运行输出如下
[root@localhost ~]# sudo docker commit -a "liaohui5" -m "updated html files" ngx_1 myngx1:1.0
sha256:768b6469373620f54dd9463481bf6b6ed8e43fb080d361c8bfc7e316a6276c4f
[root@localhost ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
myngx1              1.0                 768b64693736        4 seconds ago       132MB
nginx               latest              0901fa9da894        14 hours ago        132MB
```
