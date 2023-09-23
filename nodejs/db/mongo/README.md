> 图形化工具的使用:
> [nosqlbooster](https://nosqlbooster.com/downloads)

## 基本操作

获取当前数据库名称

```
db.getName()
```

创建数据库

```php
# use 数据库名, 如果有就切换,没有就创建
use test_db
```

查看数据库状态

```
db.stats()
```

获取当前数据库版本

```
db.version()
```

查看数据库相关帮助信息

```
db.help()
```

## 增删改查

> 在 `MySQL` 等关系型数据库中,必须先设计表,然后才能进行 `增删改查` 的操作
>
> 在 `mongodb` 中,不需要设计表,

### 插入数据

- 插入普通数据

```php
// db.集合.insert({}); 集合相当于mysql中的数据表
// insert({...}) 传递一个 bson 格式的字符串, 类似 json
db.users.insert({name:'zs',sex:'男', height: '172'});
```

- 插入多维数据

```php
db.users.insert({
    name:'alex', age:18, height: '172', other: {
        class: '101',
        like: ['code', 'db'],
    }
});
```

- 数组数据

```php
db.users.insert({name:'jason', likes: ['code', 'db', 'study', 'sleep']});
```

### 查询数据

#### 笼统查询

- 查询所有数据

```php
// db.集合.find()       相当于sql语句中的:  select * from users

db.users.find();
```

- 查询一条数据

```php
// db.集合.findOne()       相当于sql语句中的: select * from users limit 1;

db.users.findOne();
```

#### 带条件的查询

- 查询所有符合条件的数据

```php
// db.集合.find(条件)    相当于sql语句中的: select * from users where name='zs';

db.users.find({name:'zs'})
```

- 查询符合条件的第一条数据

```php
// db.集合.findOne(条件)  相当于sql语句中的:  select * from users where name='zs' limit 1;
db.users.findOne({name:'zs'})
```

#### 范围条件查询

- 查询指定字段大于或者小于某个值的所有数据

  - $lt 小于 相当于 sql 语句中的 <

  ```javascript
  // 查询users集合中身高字段小于172的所有数据
  // SQL语句: select * from users where height < 172
  db.users.find({ height: { $lt: 172 } });
  ```

  - $gt 大于 相当于 sql 语句中的 >

  ```javascript
  // 查询users集合中身高字段大于172的所有数据
  // SQL语句: select * from users where height > 172
  db.users.find({ height: { $gt: 172 } });
  ```

- 查询指定字段大于等于或者小于等于的所有数据

  - $lt 小于 相当于 sql 语句中的 <=

  ```javascript
  // 查询users集合中身高字段小于等于172的所有数据
  // select * from users where height < 172
  db.users.find({ height: { $lte: 172 } });
  ```

  - $gt 大于 相当于 sql 语句中的 >=

  ```javascript
  // 查询users集合中身高字段大于等于172的所有数据
  // select * from users where height > 172
  db.users.find({ height: { $gte: 172 } });
  ```

- 查询指定字段不等于某个值的所有数据

```javascript
// 查询指定字段不等于某个值的所有数据
// select * from user != 'zs'
db.users.find({ name: { $ne: "zs" } });
```

> 注: 使用关键字 \$le \$lte \$gt \$gte \$ne 必须使用引号引起来, 建议用单引号

#### 设置多个查询条件

```JavaScript
 // SQL语句中的and操作符: select * from users where height<=172 and age>10

// 查询出所有的height字段小于等于172 并且 age字段大于10的所有数据
db.users.find({height:{'$lte': 172 },age: {'$gt': 10}});

// 查询出所有height字段小于180字段 并且 age 字段等于18 的所有数据
db.users.find({height: {'$lt': 172}, age: 10})


// 查询出 age字段等于10 或者 height字段大于等于 180 的所有数据(文档)
// 相当于SQL语句中的: select * from users where age=10 or height>=180
db.users.find({
    "$or": [
        { age: 10 },
        {height:{"$gte": 180 } }
    ]
});
```

#### 多维字段的查询

```javascript
// 查询 other_info 字段中 class 的值为101的数据
db.users.find({
  "other.class": "101",
});
```

#### 数组条件的限制

```javascript
// 表示查询 likes 字段中有 code 和 music 的所有数据(文档)
db.users.find({
  likes: {
    $all: ["code", "music"],
  },
});
```

#### 限制查询的字段

```javascript
// 表示查询出age等于18的所有数据(文档), 只查询name字段
db.users.find({ age: 18 }, { name: 1 });

// 表示查询出age等于18的所有数据(文档), 除了name以外的所有字段
db.users.find({ age: 18 }, { name: 0 });

// 表示查询出age字段为18的所有数据(文档)
// 表示只显示name字段并且排除默认的_id字段 {"age":18},{name:1,_id:0}
db.users.find({ age: 18 }, { name: 1, _id: 0 });
```

> 注: 限定条件输出时,除了默认的\_id 字段以外,要么全部输出,要么全部不输出,不能一个 1 一个 0,
>
> 1 查询,0 排除, 不然会报错

### 修改数据

- 使用 $set 修改字段,只修改要修改的字段的值,其他字段不变化

```javascript
// 表示将name字段为zs的所有数据的 age 字段修改为 18,其他字段不变
db.users.update({ name: "zs" }, { $set: { age: 18 } });
```

- 不使用 $set 修改设置的字段, 除\_id 字段以外,其他字段就删除

```javascript
// 表示将name字段zs的所有数据的的 age 字段修改为 20, 并且删除其他所有字段
db.users.update({ name: "zs" }, { age: 20 });
```

- 修改字段时,有就直接修改没有就添加

```javascript
// 表示将name字段为zs的所有数据的, name字段改为xiaoZhang, nickName改为xiaoZhang 其他字段全部删除
db.users.update({ name: "zs" }, { name: "ZhangShang", nickName: "xiaoZhang" });
```

### 数据删除

- 删除指定条件的数据

```javascript
// 表示删除所有, name为zs的数据
db.users.remove({ name: "zs" });

// 表示删除所有 name字段为zs 并且 age字段为100 的数据
db.users.remove({ name: "zs", age: 100 });
```

- 删除字段

```javascript
// 表示删除name字段值为zhangShang的所有数据 的 age 字段,{"age": 1}
// 这个值可以是任意的值,比如(字符串,true,null)但是不能不写
db.users.update({ name: "zhangShang" }, { $unset: { age: 1 } });
```

### 限制查询条数 (分页)

```css
/* 表示查询符合条件的跳过前5条后面的10条数据 */
db.users.find().skip(5).limit(10);
```

### 排序 `sort`

- 默认是安装 ` _id` 字段升序排序, 利用 `sort` 方法可以根据指定的方法排序

```css
/* 根据name字段升序排序,如果有相同的就根据 height 字段降序排序*/
db.users.find().sort({
    name: 1,
    height: -1
});
```

### 限制分页条数并且排序

```css
db.users.find().skip(5).limit(5).sort({
    name: 1,
    age: -1
});
```

- `1` 表示升序, `-1` 表示降序
