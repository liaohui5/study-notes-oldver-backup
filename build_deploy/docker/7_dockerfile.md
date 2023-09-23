### 什么是 Dockerfile

Dockerfile 可以认为是**Docker 镜像的描述文件，是由一系列命令和参数构成的脚本**。主要作用是**用来构建 docker 镜像的构建文件**。

![image-20200404111908085](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131634719.png)

- **通过架构图可以看出通过 DockerFile 可以直接构建镜像**

### Dockerfile 解析过程

![image-20200603181253804](https://raw.githubusercontent.com/liaohui5/images/main/images/202206131634910.png)

### Dockerfile 的保留命令

官方说明:https://docs.docker.com/engine/reference/builder/

| 保留字         | 作用                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **FROM**       | **当前镜像是基于哪个镜像的** `第一个指令必须是FROM`                                                                             |
| MAINTAINER     | 镜像维护者的姓名和邮箱地址                                                                                                      |
| **RUN**        | **构建镜像时需要运行的指令**                                                                                                    |
| **EXPOSE**     | **当前容器对外暴露出的端口号**                                                                                                  |
| **WORKDIR**    | **指定在创建容器后，终端默认登录进来的工作目录，一个落脚点**                                                                    |
| **ENV**        | **用来在构建镜像过程中设置环境变量**                                                                                            |
| **ADD**        | **将宿主机目录下的文件拷贝进镜像且 ADD 命令会自动处理 URL 和解压 tar 包**                                                       |
| **COPY**       | **类似于 ADD，拷贝文件和目录到镜像中<br/>将从构建上下文目录中<原路径>的文件/目录复制到新的一层的镜像内的<目标路径>位置**        |
| **VOLUME**     | **容器数据卷，用于数据保存和持久化工作**                                                                                        |
| **CMD**        | **指定一个容器启动时要运行的命令<br/>Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数替换** |
| **ENTRYPOINT** | **指定一个容器启动时要运行的命令<br/>ENTRYPOINT 的目的和 CMD 一样，都是在指定容器启动程序及其参数**                             |

#### FROM 命令

- 基于那个镜像进行构建新的镜像,在构建时会自动从 docker hub 拉取 base 镜像 必须作为 Dockerfile 的第一个指令出现

- 语法:

  ```dockerfile
  FROM  <image>
  FROM  <image>[:<tag>]     使用版本不写为latest
  FROM  <image>[@<digest>]  使用摘要
  ```

#### MAINTAINER 命令

- 镜像维护者的姓名和邮箱地址[废弃]

- 语法:

  ```dockerfile
  MAINTAINER <name>
  ```

#### RUN 命令

- RUN 指令将在当前映像之上的新层中执行任何命令并提交结果。生成的提交映像将用于 Dockerfile 中的下一步

- 语法:

  ```dockerfile
  RUN <command> (shell form, the command is run in a shell, which by default is /bin/sh -c on Linux or cmd /S /C on Windows)
  RUN echo hello
  
  RUN ["executable", "param1", "param2"] (exec form)
  RUN ["/bin/bash", "-c", "echo hello"]
  ```

#### EXPOSE 命令

- 用来指定构建的镜像在运行为容器时对外暴露的端口

- 语法:

  ```dockerfile
  EXPOSE 80/tcp  如果没有显示指定则默认暴露都是tcp
  EXPOSE 80/udp
  ```

#### CMD 命令

- 用来为启动的容器指定执行的命令,在 Dockerfile 中只能有一条 CMD 指令。如果列出多个命令，则只有最后一个命令才会生效。

- 注意: **Dockerfile 中只能有一条 CMD 指令。如果列出多个命令，则只有最后一个命令才会生效。**

- 语法:

  ```dockerfile
  CMD ["executable","param1","param2"] (exec form, this is the preferred form)
  CMD ["param1","param2"] (as default parameters to ENTRYPOINT)
  CMD command param1 param2 (shell form)
  ```

#### WORKDIR 命令

- 用来为 Dockerfile 中的任何 RUN、CMD、ENTRYPOINT、COPY 和 ADD 指令设置工作目录。如果 WORKDIR 不存在，即使它没有在任何后续 Dockerfile 指令中使用，它也将被创建。

- 语法:

  ```dockerfile
  WORKDIR /path/to/workdir
  
  WORKDIR /a
  WORKDIR b
  WORKDIR c
  `注意:WORKDIR指令可以在Dockerfile中多次使用。如果提供了相对路径，则该路径将与先前WORKDIR指令的路径相对`
  ```

#### ENV 命令

- 用来为构建镜像设置环境变量。这个值将出现在构建阶段中所有后续指令的环境中。

- 语法：

  ```dockerfile
  ENV <key> <value>
  ENV <key>=<value> ...
  ```

#### ADD 命令

- 用来从 context 上下文复制新文件、目录或远程文件 url，并将它们添加到位于指定路径的映像文件系统中。

- 语法:

  ```dockerfile
  ADD hom* /mydir/       通配符添加多个文件
  ADD hom?.txt /mydir/   通配符添加
  ADD test.txt relativeDir/  可以指定相对路径
  ADD test.txt /absoluteDir/ 也可以指定绝对路径
  ADD url
  ```

#### COPY 命令

- 用来将 context 目录中指定文件复制到镜像的指定目录中

- 语法:

  ```dockerfile
  COPY src dest
  COPY ["<src>",... "<dest>"]
  ```

#### VOLUME 命令

- 用来定义容器运行时可以挂在到宿主机的目录

- 语法:

  ```dockerfile
  VOLUME ["/data"]
  ```

#### ENTRYPOINT 命令

- 用来指定容器启动时执行命令和 CMD 类似

- 语法:

```dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2
```

#### ENTRYPOINT 命令

ENTRYPOINT 指令，往往用于设置容器启动后的**第一个命令**，这对一个容器来说往往是固定的。
CMD 指令，往往用于设置容器启动的第一个命令的**默认参数**，这对一个容器来说可以是变化的。
