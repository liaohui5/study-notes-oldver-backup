### GET 请求

```js
// 1. 实例化Ajax对象
var xhr = new XMLHttpRequest();

// 2. 监听状态改变事件
xhr.onreadystatechange = function () {
  // 此时代表请求成功
  if (xhr.status == 4 && xhr.state == 200) {
    console.log(xhr.responseText);
  }
};

// 3. 初始化请求的参数 open("请求方式", "请求地址" , 是否异步true:异步,false:同步)
xhr.open("POST", "./index.php?id=1&name=user1", true); // 请求参数

// 4. 发送ajax请求
xhr.send();
```

### POST 请求

```js
// 1. 实例化Ajax对象
var xhr = new XMLHttpRequest();

// 2. 监听状态改变事件
xhr.onreadystatechange = function () {
  // 此时代表请求成功
  if (xhr.status == 4 && xhr.state == 200) {
    console.log(xhr.responseText);
  }
};

// 3. 初始化请求的参数 open("请求方式", "请求地址" , 是否异步true:异步,false:同步)
xhr.open("POST", "./index.php", true);

// 4. 设置请求头,(如果不设置, 在PHP服务端不能接受到参数)
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

// 5. 发送Ajex POST请求
xhr.send("id=10&name=admin"); // post 请求的参数
```

## 封装 Ajax

```js
/**
 * 发送ajax请求
 * option {object} 发送ajax时的参数
 * option.method：请求的类型；GET 或 POST
 * option.url：文件在服务器上的位置
 * option.async：true（异步）或 false（同步）
 */

function ajax(option) {
  // 0.将对象转换为字符串
  var str = objectToString(option.data); // key=value&key=value;

  // 1.创建一个异步对象
  var xhr, timer;

  // 低版本浏览器兼容
  xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  // 2.设置请求方式和请求地址
  if (option.type.toLowerCase() === "get") {
    xhr.open(option.type, option.url + "?" + str, true);
    // 3.发送请求
    xhr.send();
  } else {
    xhr.open(option.type, option.url, true);
    // 设置请求头, 否则在服务端接收不到参数, 必须放在open之后, send之前
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(str);
  }

  // 4.监听状态的变化
  // 状态: 0: 请求未初始化 1:服务器连接已建立 2:请求已接收 3:请求处理中 4:请求已完成,且响应已就绪
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      clearInterval(timer);
      // 判断是否请求成功
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        // 5.处理返回的结果
        option.success(xhr); // 成功
      } else {
        option.error(xhr); // 失败
      }
    }
  };

  // 判断外界是否传入了超时时间, 如果没有默认5秒
  var timeout = option.timeout ? option.timeout : 5000;
  timer = setInterval(function () {
    xhr.abort(); // 指定时间还没有响应结果就中断请求
    clearInterval(timer);
  }, timeout);
}

/**
 * 将对象中的属性和值转换成指定格式的字符串
 */
function objectToString(data) {
  // 如果没有传参, 为了添加随机因子,必须自己创建一个对象
  data = data || {};
  // 随机数, 兼容低版本的浏览器
  data.t = Math.random();
  var res = [];
  for (var key in data) {
    // 在URL中是不可以出现中文的, 如果出现了中文需要转码
    // 调用encodeURIComponent方法, URL中只可以出现字母/数字/下划线/ASCII码
    // [id=10, username="asdf"];
    res.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
  }
  return res.join("&"); // userName=test&userPwd=123456
}

// 基本使用
ajax({
  type: "get",
  url: "./ajax.php",
  data: {
    name: "ls",
    age: "18",
  },
  timeout: 3000,
  success: function (data) {
    console.log(data);
  },
  error: function () {
    console.log("请求失败");
  },
});
```
