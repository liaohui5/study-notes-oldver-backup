> mysql version : 5.7.\*

---

## 基本使用

1. 登录
   1. 打开 cmd 命令窗口 windows+r 输入 cmd
   2. mysql -u 用户名 -p 密码

```sql
mysql -uroot  -p123
```

2. 退出

```sql
exit;
```

## 数据库操作

1. 查看所有的数据库

```sql
show databases;
```

2. 创建数据库

```sql
-- create database  数据库名  default charset=utf8;
create database test default charset=utf8;
```

3. 删除数据库

```sql
-- drop database 数据库名
drop database test;
```

4. 使用数据库

```sql
-- use 数据库名;
use test;
```

## 数据类型

1. 数值
   1. tinyint
   2. int
   3. float
   4. decimal (以字符串的形式存储小数)
2. 字符串
   1. char 定长字符串,最大 255
   2. varcahr 变长字符串
   3. text 长文本
3. 日期
   1. timestamp 以年月日形式存储一个时间戳

> **注**: 除了数值型,其他类型在使用时都需要用引号("")括起来

## 字段约束

1. unsigned 无符号的整数(正数)
2. auto_increment 自增(必须是主键才能自增)
3. not null 这一列的值不能为 null
4. default 默认值(如果插入/修改时字段值为空就采用默认值)

## 数据表操作

1. 创建表

```sql
-- create table 表名(
-- 字段1  数据类型  字段约束,
-- 字段2  数据类型  字段约束,
-- ....
-- 字段n  数据类型  字段约束
-- );

create table user(
	id int unsigned primary key auto_increment,
    name char(4) not null,
    sex  char(1)  not null,
    age  tinyint not null
);
```

2. 删除表

```sql
-- drop table 表名
drop table user;
```

3. 修改表结构

   1. 添加字段

   ```sql
   -- alter table 表名 add 要添加的字段名 添加字段的属性
   -- 向 user 表中添加 一个 height 字段
   alter table user add height int unsigned not null;
   ```

   2. 删除字段

   ```sql
   -- alter table 表名 drop 字段名
   -- 删除 user 表中的 height 字段
   alter table user drop height;
   ```

   3. 修改字段( 索引不会丢失 )

   ```sql
   -- 修改字段属性:alter table 表名 modify 字段名-字段属性;
   -- 将user表中的 age 字段修改为可以为 不能为负数
   alter table user modify age tinyint unsigned not null;

    -- 修改字段名:alter table 表名 change 原字段名 新字段名-字段类型-字段属性;
    -- 将user表 sex 字段修改为 gender
    alter table user change sex gender int tinyint unsigned not null;
   ```

   4. 修改表名称

   ```mysq
   -- rename table 原表名 to 新表名;
   rename user to users;
   ```

4. 查看表

```sql
-- desc 表名
-- 查看表结构
desc user;

-- 查看数据库中所有的数据表
show tables;
```

## 数据表数据操作

1. 添加数据

```sql
-- 添加一条数据: insert into 表名(字段1,字段2...字段n) values(值1,值2...值n);
-- 此时id是自增属性,可以不填写
insert into user(name,age) values('user1',18);

-- 添加多条数据: insert into 表名(字段1,字段2...字段n) values(值1,值2...值n),(值1,值2...值n);
insert into user(name,age) values('user2',20),('user3',22),('user4',24);
```

> **注** : 插入数据是,字段和值必须一一对应,插入多个数据是,括号之间必须用逗号(,)隔开

2. 删除数据

```sql
-- 删除数据(自增属性不会重置): delete from 表名 where 条件
delete form user where id=1;

-- 清空数据(自增属性会重置): truncate 表名
truncate user;
```

> **注** : 删除数据是必须要写明 `where` 条件,不然会删除表中`所有的数据`

3. 修改数据

```sql
-- update 表名 set 字段1=值1,字段2=值2...字段n=值n where 字段=值;
update user set name='testUserName',age=30  where id=1;
```

> **注** : 删除数据是必须要写明 `where` 条件,不然会修改表中`所有的数据`

## 查询数据(重点)

> 查询数据的关键字使用顺序(不能修改):
>
> `select` => `from` => `where` => `group by` => `having` => `order by` => `limit`

1. 查询所有数据

   ```sql
   -- select * from 表名
   select * from user;
   ```

2. 查询指定字段

   ```sql
   -- select 字段1,字段2..字段 from 表名
   select name,age from user;

   -- 查询指定字段并去重: select distinct 字段 from 表名
   -- 查询user表中所有不重复的名字
   select distinct name from user;
   ```

3. 带条件的查询 where

   ```sql
   -- select *|字段列表 from 表名 where 条件
   select * from user where id=1;  -- 查询user表中id为一的数据
   select * from user where id>3;  -- 查询user表中所有id大于3的数据
   select * from user where id>=3; -- 查询user表中所有id大于等于3的数据
   select * from user where id<5;  -- 查询user表中所有id小于5的数据
   select * from user where id<=5; -- 查询user表中所有id小于等于5的数据
   select * from user where id in(1,3,5);         -- 查询user表中id是1或3或5的数据
   select * from user where id between 10 and 20; -- 查询user表中id在10到20之间的数字
   select * from user where name is null;     -- 查询user表中所有name字段值为null的数据
   select * from user where name id not null; -- 查询user表中所有name字段值不为null的数据
   select * from user where id>3 and name is not null; -- 查询user表中id大于3并且name不为空的数据
   select * from user where id>3 or name is not null;  -- 查询user表中id大于3或者name不为空的数据
   ```

4. 模糊查询 like

   ```sql
   -- select * from 表名 where 字段 like '%需要查找的内容%';
   -- 查询所有user表中name字段包含 测试 的数据
   select name,age from user where name like '%测试%';

   -- 查询所有user表中name字段包含所有 是以任意字符开头并且以测试结尾的数据
   select name,age from user where name like '_测试';

   -- 查询所有user表中name字段包含所有 是以任意字符开头并且以测试开头的数据
   select name,age from user where name like '测试_';
   ```

   > 模糊查询特殊字符:
   >
   > 1. **\_** : 任意一个字符
   > 2. **%**: 任意 0 个或多个字符

5. 分组聚合(_重在理解,没有数据,笔记难做_)

   1. 数据分组 group by

   ```sql
   -- select 分组字段 from 表名 group by 分组字段;
   -- 根据性别把所有数据分为两组,并查看每组有多少数据
   select sex,count(*) from user group by sex;

   -- 根据性别把所有数据分为两组,并查看每组有多少数据

   ```

   > **注**: 一般所有分组字段(group by 后的字段)也需要写在 select 后面

   2. 聚合函数

   ```sql
   -- 最大值: max()
   -- 最小值: min()
   -- 平均值: avg()
   -- 求总和: sum()
   ```

   > **注**: 所有的聚合函数都是对分组之后的数据进行操作的

6. 排序 order by

```sql
-- 对查询后的数据进行排序
-- select * 字段列表 from 表名 order by 字段1,字段2 [desc];

-- 根据 age 字段升序排序,默认升序
select * from user order by age;

-- 根据 age 字段降序排序后,然后根据id字段升序排序
select * from user order by age desc,id;
```

7. 分页

```sql
-- select * from 表名 limit 从第n条数据开始显示,显示m条数据

-- 从user表中查询数据,从第5条开始显示,显示5条
select * from user limit 5,5;

-- 从user表中查询数据,从第0条开始显示是,0可以不写
select * from user limit 5;
```

8. 多表查询(多个表必须建立关系)
   1. 内联查询

```sql
-- select * from 表名1,表名2 where 表名1.表名1有关系的字段 = 表名2.表名2有关系的字段

select * from user,info where user.id = info.id;
-- 或者用以下这种方式
select * from user inner join info on user.id=info.id;
```

2. 左|右连接(两种方式一样的)

```sql
select * from users left join score on  user.id=score.id;
```

## 字符集

_因为一些一键安装包的环境, `my.ini` 默认配置的字符集是 `latin1` 或者其他, 如果此时一旦不注意, 使用 sql 语句去创建数据库, 表 默认都是 `latin1`, 因为有些字符集是不能存储中文的,如果需要存储中文, 需要使用 GBK,utf8...等字符集...如果一个个去修改就太难..._

### 查看字符集

> 数据库

```sql
SHOW CREATE DATABASE `database_name`
```

database_name: 数据库名

> 数据表

```sql
SHOW CREATE TABLE `table_name`;
```

table_name: 数据表名

> 字段

```sql
SHOW FULL COLUMNS FROM `table_name`;
```

table_name: 数据表名

### 修改字符集

> 数据库

```sql
ALTER DATABASE `test_db` CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';
```

- `test` 是数据库名
- `utf8_general_ci` 是排序规则, 可选项

> 数据表

```sql
ALTER TABLE `test_db`.`user` CHARACTER SET = utf8mb4, COLLATE = utf8mb4_bin;
```

> 字段

```sql
ALTER TABLE `test_db`.`username`  MODIFY COLUMN `password` varchar(30)  CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
```

### 查看一个数据库中所有的表格

```sql
select table_name from information_schema.`TABLES` where TABLE_SCHEMA = 'database_name';
```

- database_name: 是要查询的数据库名称
- 这条 sql 语句中的 table_name 是关键字, 不是表名

### 将一个表所有字段修改为指定字符集

```sql
alter table `table_name` convert to character set utf8 COLLATE utf8_bin;
```

_将`table_name` 这个表的所有字段字符集修改为 `utf8` 排序规则为`utf8_bin`_

## 其他笔记

### 修改 **Mysql** 默认字符集 ( wampserver )

> mysql 服务器和客户端都使用 utf8 的编码:

1. 找到 mysql 的配置文件【 my.ini 】
2. 找到[client]后面加【 default-character-set = utf8 】
3. 找到[wampmysqld64]后面加【 character-set-server = utf8 】
4. 找到[wampmysqld64]后面加【 collation-server = utf8_general_ci 】
5. 使用【\s】命令查看字符集编码(如果结果如下说明修改成功)

```
Server characterset: utf8
Db characterset: utf8
Client characterset: utf8
Conn. characterset: utf8
```

> 如果以上不管用就请使用以下方法:

1. 打开 mysql 中的配置文件: `my.ini`
2. 找到[client] 在其下面添加: `default-character-set=utf8`
3. 找到[mysql]在其下面添加 : `default-character-set=utf8`
4. 找到\[mysqld\](一般是在最后面那行)下面添加 : `character-set_server=utf8`
5. 加完之后保存,重启 mysql 服务,再执行 `show variables like '%char%';` 查看是否修改成功

> 查看 MySQL 默认字符集编码

- 查看服 MySQL 支持的编码: `show character set`
- 查看 MySQL 服务器和客户端的字符集: `show variable like %char%`

### 修改 Mysql 密码( 默认没密码 )

1. mysql -uroot -p
2. update mysql.user set authentication_string=password('`密码`') where user='root'
3. flush privileges; (强制刷新或者重启 MySQL 服务)

### 数据创建

1. 导入数据

```
-- 在 windows dos 命令行中
-- mysql -u用户名 -p密码 数据库名 数据表名 sql文件名
mysql -uroot -p123 数据库名 < 1.sql
```

2. 导出数据

> _注_: 导出数据会生成对应的`sql`文件,导入数据是,需要有相应的表结构

```
-- 在 windows dos 命令行中
-- mysqldump -u用户名 -p密码 数据库名 数据表名>sql文件名
mysqldump -uroot -p123 test user > 1.sql
```

### 修改默认表引擎

> 1. 找到 mysql 的配置文件 `my.ini`

```ini
# 查找 default-storage
# 将 default-storage-engine=MYISAM 修改为 default-storage-engine=InnoDB
default-storage-engine=InnoDB
```

> 两个表引擎之间的区别:
>
> 1. `InnoDB` 支持外键,支持事务 `MYISAM` 不支持外键,不支持事务

## 连表查询

### 数据

> students

| id   | name  |
| :--- | :---- |
| 1001 | tom   |
| 1002 | jack  |
| 1003 | jason |

> results

| student_id | score | score_name |
| :--------- | :---- | :--------- |
| 1001       | tom   | Math       |
| 1002       | jack  | History    |
| 1005       | alex  | History    |

### 内链接

```sql
select * from student as s join results as r on s.id=r.student_id where r.score>60;
```

_`select * from 表1 join 表2 on 表1.id=表2.id where 其他条件`_

### 左链接

_left join 左边的表中的数据全部查询出来，右边的的表中符合条件的查询出来_

```sql
select * from student as s left join retults as r on s.id=r.student_id where r.score>60
```

_`select * from 表1 right join 表2 on 表1.id=表2.id where 其他条件`_

### 右链接

_rigit join 右边的表中的数据全部查询出来，左边的的表中符合条件的查询出来_

```sql
select * from student as s right join retults as r on s.id=r.student_id where r.score>60
```

_`select * from 表1 left join 表2 on 表1.id=表2.id where 其他条件`_

## 预防 SQL 注入

> 什么是 SQL 注入?

简单来说就是将用户的输入拼接到 SQL 语句中,然后直接执行 SQL 语句

如下代码, 看起来好像没有什么问题? 但是如果, 不校验 username 的内容

```js
// express
let { username, password } = req.body;
let sql = `select * from users where username='${username}' and password='${password}'`;

executeQuery(sql);
```

如果 username 的内容是这样的 `abc' --<space>`(注意&lt;space&gt;是空格字符)那么就不会验证密码,

最终拼接的字符串是这样的, 如下代码

在 mysql 中, `--` 是注释的意思, 那么查询的条件就变成了只有 `username=abc` 没有密码验证了

```sql
select * from users where username='abc' --' and password='xxx'
```

### 预处理

```sql
-- 定义预处理语句: prepare 语句变量名 from 'SQL语句, 其中需要改变的用 ? 作为占位符'
PREPARE pp_sql1  FROM 'SELECT * from demos where id=? and email=?';

-- 定义变量
SET @demos_id="1";
SET @demos_email="abc@qq.com";

-- 执行语句时, 使用变量(按照顺序对应?的顺序)
EXECUTE pp_sql1 USING @id, @email;

-- 释放结果集
DEALLOCATE PREPARE pp_sql1;
```

## 事物处理

事务是保证多个 SQL 操作的一致性，如果一条失败全部 SQL 也将失效。

比如银行转账, 操作应该是这样的

1. 修改账户表 A 用户的余额, -100
2. 修改账户表 B 用户的余额, +100

如果两个 SQL 语句都执行成功才成功, 如果执行失败就是失败

用文字说或许不太清晰, 用代码吧

```js
try {
  executeQuery(sql1);
  executeQuery(sql2);

  commit(); // 成功了就一起执行
} catch (e) {
  rollback(); // 如果有失败, 就一起不执行
}
```

### 查看引擎

为什么要查看引擎? 因为只有 InnoDB 才支持事务, MyISAM 不支持事务

```sql
-- 查看所有支持的引擎, 看是否支持 InnoDB
SHOW ENGINES;

-- 将表修改为 InnoDB
ALTER TABLE your_table_name ENGINE=InnoDB;
```

### 开启事务

事物主要是针对数据所有 `写` 的操作(`delete`,`update`,`insert`)

默认情况下, MySQL 是自动提交的, 发送一条 SQL(在命令行敲回车)就执行一条, 这样就无法使用事物了

```sql
START TRANSACTION;
  INSERT INTO demos (`email`) VALUES('abc@qq.com');
  UPDATE demos set `email`='456@qq.com' where `email`='hij@qq.com';
-- 先执行上面的, 然后用另外一个客户端来查看数据

COMMIT; -- 执行这一行之后才会真正插入到数据表中
-- 执行 COMMIT 后, 再到另外一个客户端来查看数据
```

> 注: 如果要测试, 需要两个不同的链接(使用不同的客户端即可)

### 隔离级别

https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/mysql/9%20%E4%BA%8B%E5%8A%A1%E5%A4%84%E7%90%86.html

## 锁机制

https://www.bilibili.com/video/BV11t411L7tM?p=2&vd_source=dcc56a2c762f3d9eb797374cafccd146
