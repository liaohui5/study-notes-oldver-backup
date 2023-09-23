## 介绍

bash 是一种基于命令的编程语言

## hello world

```bash
#!/bin/bash
# 指定当前文件用什么 shell 去执行, 也可以使用: #!/usr/bin/env bash

# 定义变量
msg="hello world" # 注:等号两边不能加空格, 加空格就报错

# 输出变量
echo "msg value is:${msg}."
```

> 如何执行?

1. 给这个脚本执行的权限: `chmod +x ./hello.sh`
2. 直接执行脚本: `./helll.sh`

> 解析变量注意事项

使用字符串虽然可以省略 `""` 和 `{}`, 但是还是尽量使用

```sh
# 虽然这样也可以, 但是不建议
echo $msg;

# $msg 和 ${msg}, 大多数情况下建议使用后者, 因为可以区分边界
echo "$msg";
echo "${msg}s";
```

## 变量

```sh
# 定义
msg="hello world"
echo "${msg}"

# 只读变量, 重新赋值就会报错
readonly ro_msg="hello,readonly"

# 删除变量, 不能删除只读变量
msg2="hello,world"
unset msg2
echo "msg2 is ${msg2} ." # msg2 is  .


# 变量类型
# 环境变量: 所有脚本可以使用如 $SHELL/$HOME
# 局部变量: 只能在当前脚本中使用(函数中用 local 定义的局部变量只能在函数内部使用)
# shell变量: shell 内置的一些变量, 比如: $1 $# $? $- 等
```

## 数据类型

### 字符串

```sh
####### 字符串拼接 #######
str1="hello"
str2="world"
str3="${str1},${str2}" # hello,world

####### 字符串长度 #######
str4="hello-world"
echo "${#str5}" # 11

####### 字符串截取 #######
str5="hello-world"
sub_str="${str5:0:5}"  # 从 0 下标开始, 截取 5 个字符
echo "${sub_str}"      # hello

####### 字符串判断 #######
# 快速判断字符串为空
str6=""
if [[ -z "${str6}" ]]; then
  echo "str6 is empty" # 会执行
fi

if [[ ${#str6} -eq 0 ]]; then
  echo "str6 is empty" # 会执行
fi

# 快速判断字符串不为空(也可用来判断数组的 key 是否有值)
str7="str"
if [[ -n ${str7} ]]; then
  echo "1-str is not empty" # 会执行
fi

if [[ "${#str7}" -gt 0 ]]; then
  echo "2-str is not empty" # 会执行
fi

####### 字符串替换 #######
str8="hello-world"

# 替换字符串
str9="${str8/world/shell}"
echo "${str9}" # hello-shell

# 替换字符串为空(删除)
str10="${str8/world/}"
echo "${str10}" # hello-

# 替换成变量
rep_val="script"
str11="${str8/world/$rep_val}"
echo "${str11}" # hello-script
```

### 数字

> 支持的计算方法:

- 加法：+
- 减法：-
- 乘法：\*
- 除法：/
- 取余：%
- 自增：++
- 自减：--

> 支持的比较符号:

- 等于 :`-eq`
- 不等于 :`-ne`
- 大于 :`-gt`
- 大于等于 :`-ge`
- 小于 :`-lt`
- 小于等于 :`-le`

```sh
# 计算需要使用 $(()) 这样的语法来数字计算表达式
num1=5
num2=9
sum_num=$((num1 + num2))

# 数字转字符串 然后输出
echo "${sum_num}"

# 比较
if [ $num1 -eq $num2 ]; then
    echo "${num1} 等于 ${num2}"
else
    echo "${num1} 不等于 ${num2}"
fi
```

### 数组(数字下标/字符串下标)

注: shell 脚本中的数组不支持多维数组

> 普通数组: index 从 0 开始

```sh
# 直接定义并赋值
arr1=(120 520 "hello" "world")

# 先定义,然后赋值
arr2=()
arr2[0]="hello"
arr2[1]="world"
arr2[2]=111
arr2[4]=222

# 获取数组长度
echo "${#arr1}" # 4
```

> 关联数组(类似 JS 的 object, 一组 key-value 对)

<span style="color:#f00;">注意: 使用 `declare` 关键字来定义关联数组, bash有些很老的版本可能不支持 `-A` 参数</span>

```sh
# 定义关联数组
declare -A obj

obj[email]="admin@qq.com"
obj[password]="123456"

# 根据 key 取值
echo "${obj[email]}"

# 输出所有 value
echo "${obj[@]}"
echo "${obj[*]}"

# 如果 key 不存在获取的值为空字符串 ""
val="${obj[not_found_key]}"
echo "val length is ${#val}" # val lenth is 0
```

> bash 版本太老, 如何解决?

如果不支持可以用包管理工具下载一个较新的版本, 然后在文件中指定使用较新的版本

```sh
# 如 MacOS Ventura(13.5), 默认的 bash 是 3.x
brew install bash

# 安装完之后文件在: /usr/local/bin/bash
# 在文件中使用如下这个注释, 就可以指定脚本所用的解释器
#!/usr/local/bin/bash
```

修改注释, 重新执行

```sh
#!/usr/local/bin/bash

declare -A obj
obj[email]="admin@qq.com"
obj[password]="123456"

# 根据 key 取值
echo "${obj[email]}" # admin@qq.com
```

## 流程控制

### 分支

```sh
num=1

# 单个 if
if [[ "${num}" -eq 1 ]]; then
  echo "num value is 1"
fi

# if + else
if [[ "${num}" -eq 3 ]]; then
  echo "num value is 3"
else
  echo "num value is not 3"
fi

# if + elif + else
if [[ "${num}" -eq 9 ]]; then
  echo "num valus is 9"
elif [[ "${num}" -eq 7 ]]; then
  echo "num valus is 7"
elif [[ "${num}" -eq 5 ]]; then
  echo "num valus is 5"
elif [[ "${num}" -eq 3 ]]; then
  echo "num valus is 3"
elif [[ "${num}" -eq 1 ]]; then
  echo "num valus is 1"
else
  echo "not matched num value"
fi
```

> 数值判断

| 参数 | 说明           |
| :--- | :------------- |
| -eq  | 等于则为真     |
| -ne  | 不等于则为真   |
| -gt  | 大于则为真     |
| -ge  | 大于等于则为真 |
| -lt  | 小于则为真     |
| -le  | 小于等于则为真 |

```sh
num=10
if [[ "${num}" -eq 10 ]]; then
  echo "num value is 10"
fi
```

> 字符串判断

| 参数      | 说明                     |
| :-------- | :----------------------- |
| =         | 等于则为真               |
| !=        | 不相等则为真             |
| -z 字符串 | 字符串的长度为零则为真   |
| -n 字符串 | 字符串的长度不为零则为真 |

```sh
str="hello"
if [[ -n "${str}" ]]; then
  echo "str is not empty"
fi
```

> 文件相关判断

| 参数      | 说明                                 |
| :-------- | :----------------------------------- |
| -e 文件名 | 如果文件存在则为真                   |
| -r 文件名 | 如果文件存在且可读则为真             |
| -w 文件名 | 如果文件存在且可写则为真             |
| -x 文件名 | 如果文件存在且可执行则为真           |
| -s 文件名 | 如果文件存在且至少有一个字符则为真   |
| -d 文件名 | 如果文件存在且为目录则为真           |
| -f 文件名 | 如果文件存在且为普通文件则为真       |
| -c 文件名 | 如果文件存在且为字符型特殊文件则为真 |
| -b 文件名 | 如果文件存在且为块特殊文件则为真     |

```sh
file="./README.md"
if [[ -e "${file}" ]]; then
  echo "readme.md file exists"
else
  echo "not found readme.md"
fi
```

### 循环

- 循环指定次数

```sh
# - 循环指定次数 & 停止循环
i=0;
while(( "${i}" < 9 )); do
  echo "i value is ${i}"

  # 停止循环
  if [[ "${i}" -eq 4 ]]; then
    break
  fi

  # 修改条件
  i=$(( i + 1 ))
done
```

- 遍历数组

```sh
# - 遍历数组 & 停止循环
# 直接遍历
for item in "apple" "orange" "banana" "pineapple"; do
  echo "value is: ${item}"

  # 停止循环
  if [[ "${item}" = "orange" ]]; then
    break
  fi
done

# 使用 arr[@] 这样的变量
arr=("apple" "orange" "banana" "pineapple")
for item in "${arr[@]}"; do
  echo "item value is: ${item}"
done
```

- 遍历其他命令执行的输出结果

遍历其他命令(如:ls cat)执行的输出结果:

本质就是遍历带有空白字符(空格/换行)的字符串, 以空白字符为准分割成多个数据

```sh
# 遍历其他命令执行的输出结果
files="$(ls .)"

# 其他命令执行的结果
for file in ${files}; do
  echo "file is: ${file}"
done

echo "=====华丽的分割线====="

# 空格
worlds="hello shell script world"
for word in ${worlds}; do
  echo "word is: ${word}"
done

echo "=====华丽的分割线====="

# $()是一种命令替换的语法, 它用于执行命令, 并将其输出结果插入到命令替换的位置
# 换行 echo -e 可以解析字符串中的转义字符
worlds=$(echo -e "hello\nshell\nscript\nworld");
for word in ${worlds}; do
  echo "word is: ${word}"
done
```

## 函数

函数其实就是"命令", 只不过函数是编程语言的概念, 而"命令"是对这种函数的一种形象的描述

### 定义和使用

```sh
# 使用: 其实 echo 就是一个函数, 作用就是将内容输出, 方便查看
# 这种是 shell 自带的内置函数
echo "hello world"

# 定义自定义函数 [function] 函数名() { 函数体 }
# function 关键字可以省略, 但是还是建议保留, 别问, 问就是写其他编程语言代码的习惯
# 与其他编程语言不同的是, 函数名可以包含 - 但是不能包含 $
function say-hi() {
  echo "hi"
}

sayHello() {
  echo "hello"
}
```

### 作用域

- 全局作用域: 所有脚本都可以访问, 如: `$HOME, $PATH, $SHELL`
- 脚本作用域: 单个脚本内任何地方都可以访问, 如代码中的: `num, num2`
- 函数作用域: 在函数内用 `local` 定义的变量, 只能在其定义的函数中访问, 如代码中的 `num3`

```sh
num=10

function fn1(){
	num2=20
	local num3=30 # 只能在这个函数中访问
	echo "inner: ${num}-${num2}-${num3}" # 输出: 10-20-30
}

fn1

echo "outter: ${num}-${num2}-${num3}" # 输出: 10-20-
```

### 参数

在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参数的值，例如，$1表示第一个参数，$2表示第二个

在使用参数的时候 `$1` 或 `${1}` 这两种方式都可以, 但是建议使用前者, 用来和其他变量区分,

代表这是一个参数, 但是如果有 10 以上的参数, 就无法使用第一种方式了`$10`, 必须使用第二种方式 `${10}`

| 参数变量 | 说明                                                      |
| :------- | :-------------------------------------------------------- |
| $#       | 传递到脚本或函数的参数个数                                |
| $\*      | 以一个单字符串显示所有向脚本传递的参数                    |
| $$       | 脚本运行的当前进程ID号                                    |
| $!       | 后台运行的最后一个进程的ID号                              |
| $@       | 与$\*相同,但是使用时加引号，并在引号中返回每个参数        |
| $-       | 显示Shell使用的当前选项,与set命令功能相同                 |
| $?       | 显示最后命令的退出状态,0表示没有错误,其他任何值表明有错误 |

```sh
function say-hi() {
  echo "hi,$1" # 第一参数
  echo "hi,$2" # 第二个参数
  echo "hi,$3" # 第三个参数
  # ... $n     # 第 n 个参数
}

function say-hi-all() {
  # $#    总共有多少个参数
  # $*/$@ 所有的参数(数组)
  echo "总共传递了 $# 个参数, 参数为: $*"
  for item in "${@}"; do
    echo "hi,${item}"
  done
}

say-hi "tom" "jerry" "spike"

echo "=====华丽的分割线====="

say-hi-all "tom" "jerry" "spkie" "jessica" "alfred" "jackson"
```

> `$*` 和 `$@` 的区别

```sh
# $* 会获取所有参数作为一个字符串, 如: 'tom jerry spike'
# $@ 会获取所有参数作为多个字符串, 如: "tom" "jerry" "spike"
```

### 输出和返回值

- `echo` 可以输出任意字符串, `return` 只能返回 `0-255` 这些数字

- `echo` 用 `$()` 来获取结果, `return` 用 `$?` 来获取结果

- `return` 可以终止函数执行, 但 `echo` 不行

```sh
# echo 输出
function sum() {
	local res=0
	for num in "${@}"; do
		res=$((res + num))
	done
	echo "${res}"
}

# echo 输出的内容, 可以用 $() 执行可以获取结果
sum_value=$(sum 1 2 3 4 5)
echo "sum value is:${sum_value}"

# return 返回值, 和其他编程语言一样, return 可以终止函数的执行
function say-hi() {
	echo "hi,$1"
	return 5
}

# return 可以用 $? 来获取结果
say-hi "tom"
echo "return value is: $?"
```

## 输出重定向

大多数 UNIX 系统命令从你的终端接受输入并将所产生的输出发送回终端,

一个命令通常从一个叫标准输入的地方读取输入, 默认情况下是你的终端

同样, 一个命令通常将其输出写入到标准输出, 默认情况下也是你的终端

### 标准输入/输出/错误

一般情况下, 每个 Unix/Linux 命令运行时都会打开三个文件：

- 标准输入文件(stdin)：stdin的文件描述符为0, Unix程序默认从stdin读取数据
- 标准输出文件(stdout)：stdout 的文件描述符为1, Unix程序默认向stdout输出数据
- 标准错误文件(stderr)：stderr的文件描述符为2, Unix程序会向stderr流中写入错误信息

### 输出重定向

| 命令                | 说明                                                                                                 |
| :------------------ | :--------------------------------------------------------------------------------------------------- |
| command > file      | 将命令的输出重定向到 file                                                                            |
| command >> file     | 将命令的输出以追加的方式重定向到 file                                                                |
| command > /dev/null | /dev/null 是一个特殊的文件, 写入到它的内容都会被丢弃<br>将命令的输出重定向到它，会起到"禁止输出"的效果 |

```sh
# 输出默认会显示到终端
echo "hello-world"

# 将输出重定向到文件中(会覆盖)
echo "hello-world" > "1.txt"

# 将输出追加到文件中
echo -e "shell\nscript" >> "1.txt"

# 将 1.txt 的内容追加到 2.txt 中
cat "1.txt" >> "2.txt"

# 既想要执行命令, 又不想输出到终端
cat "1.txt" > /dev/null
```

## 模块化

所谓的模块化就是, 在一个文件中, 通过代码去引入另外一个文件的内容, 然后使用其提供的内容

```sh
# tool.sh
function sum() {
  local arr="$1"
  local res=0
  for num in "${arr[@]}"; do
    res=$(( res + num ))
  done
  echo "${res}"
}
```

```sh
# main.sh
source "./tool.sh" # source 会执行这个 tool.sh 脚本, 如果有输出也会直接输出

# 在 main.sh 中使用 tool.sh
sum_val=$(sum 1 2 3 4 5)
echo "${sum_val}"
```
