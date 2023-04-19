让 docker-compose 项目开机启动

```sh
# 创建系统服务
sudo vim /etc/systemd/system/docker-compose.service
```

```toml
# 输入以下内容, 最好把所有注释都删了
[Unit]
Description=Docker Compose Project            # 服务的描述
After=docker.service                          # 在启动docker之后启动

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/path/to/your_project        # 执行命令工作目录
ExecStart=/usr/local/bin/docker-compose up -d # 开启服务执行的命令
ExecStop=/usr/local/bin/docker-compose down   # 停止服务命令
User=<username>                               # 用户名

[Install]
WantedBy=multi-user.target
```

```sh
# 2. 重新加载服务
sudo systemctl daemon-reload
```

```sh
# 3. 启动服务
sudo systemctl start docker-compose.service
```

```sh
# 4. 查看服务状态
sudo systemctl status docker-compose.service
```

```sh
# 5. 设置开机自启
sudo systemctl enable docker-compose.service
```
