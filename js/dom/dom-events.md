### 获取事件

```javascript
var btn = document.getElementById("btn");
btn.onclick = function (event) {
  // event 就是事件对象
  // window.event是兼容低版本IE的写法
  var e = event || window.event;
};
```

### event 常见属性

|  属性   | 用途                                       |
| :-----: | :----------------------------------------- |
| clientX | 光标相对于该网页的水平位置                 |
| clientY | 光标相对于该网页的垂直位置                 |
|  type   | 事件的类型                                 |
| target  | 该事件被传送到的对象                       |
| screenX | 光标相对于该屏幕的水平位置                 |
| screenY | 光标相对于该屏幕的垂直位置                 |
|  pageX  | 光标相对于该网页的水平位置(IE6,7,8 不适用) |
|  pageY  | 光标相对于该网页的垂直位置(IE6,7,8 不适用) |
|  width  | 该窗口或框架的宽度                         |
| height  | 该窗口或框架的高度                         |
|  data   | 返回拖拽对象的 URL 字符串                  |

### javascript 事件传递机制(冒泡)

- js 事件会从事件源(比如被点击的 a 标签)沿着`DOM树`一层层向上传递

> 注: 不是所有的事件都能冒泡,比如 : `blur` `focus` `load` `unload`, 一般只有 UIEvent 才能冒泡

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .wrapper {
        width: 500px;
        height: 500px;
        background-color: red;
      }
      .wrapper .box {
        width: 300px;
        height: 300px;
        background-color: blue;
      }
    </style>
  </head>
  <body>
    <div class="wrapper" id="wrapper">
      <div class="box" id="box"></div>
    </div>
    <script>
      document.getElementById("box").onclick = function (e) {
        console.info("box");
        // event.stopPropagation(); // 阻止冒泡
      };
      document.getElementById("wrapper").onclick = function () {
        console.info("wrapper");
      };
    </script>
  </body>
</html>
```

### 阻止冒泡

```javascript
// 标准浏览器
event.stopPropagation();

// IE
event.cancelBubble = true;

// 兼容写法
function stopBubble(event) {
  // w3c标准
  if (event && event.stopPropagation) {
    event.stopPropagation();
  } else {
    // IE浏览器
    event.cancelBubble = true;
  }
}
```

### 阻止浏览器默认事件

- 浏览器默认会有些事件, 比如 `点击表单中的按钮会提交表单` `点击右键会出现浏览器菜单`

```js
// 屏蔽右键菜单
document.oncontextmenu = function (e) {
  e.preventDefault();
  return false;
};

// 阻止表单提交
document.getElementById("form").onsubmit = function (e) {
  e.preventDefault();
  return false;
};
```

### 如何手动触发事件

- [参考](https://www.cnblogs.com/xiaozhuyuan/p/8296827.html)
- [参考](https://www.cnblogs.com/jiangxiaobo/p/5830200.html)

```js
// 兼容写法
const btn = document.getElementById("btn");
if (document.createEvent) {
  const event = document.createEvent("MouseEvents");
  event.initEvent("click", true, false);
  btn.dispatchEvent(event);
} else if (document.createEventObject) {
  btn.fireEvent("click");
} else {
  btn.click();
}
```

### 特殊事件及 js 库

- [操作剪贴版](https://www.npmjs.com/package/clipboardy)
- onerror: 当遇到错误的时候
- onload: 当资源加载完的时候

> onerror 事件应用: 使用默认图片替换加载失败的图片

```js
const images = document.querySelectAll("img");
const defaultURL = "http://xxx.com/xxx.jpg";
Array.from(images).forEach((img) => {
  img.onerror = () => (img.src = defaultURL);
});
```

### 特殊事件实现拖拽效果

> 原生 js 拖动效果

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>js 拖动效果</title>
    <style>
      #drag {
        width: 100px;
        height: 100px;
        background: #000;
      }
    </style>
  </head>
  <body>
    <div id="drag"></div>

    <script>
      window.onload = () => {
        let div = document.getElementById("drag");
        let offsetX, offsetY, drag;

        div.addEventListener(
          "mousedown",
          function (event) {
            div.style.position = "fixed";
            offsetX = event.clientX - div.offsetLeft;
            offsetY = event.clientY - div.offsetTop;
            drag = true;

            window.addEventListener(
              "mousemove",
              function (event) {
                if (drag) {
                  div.style.left = event.clientX - offsetX + "px";
                  div.style.top = event.clientY - offsetY + "px";
                }
              },
              false
            );
          },
          false
        );

        window.addEventListener(
          "mouseup",
          function (e) {
            drag = false;
          },
          false
        );
      };
    </script>
  </body>
</html>
```

> jquery 拖动效果

- 我这里使用的版本是 `jquery-1.12.4` 不同的版本可能需要调整

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>jquery</title>
    <style>
      div {
        width: 100px;
        line-height: 100px;
        background: #000;
        color: skyblue;
        position: absolute;
        top: 0;
        left: 0;
      }
    </style>
  </head>
  <body>
    <div>点住进行拖拽</div>

    <!-- javascript -->
    <script src="jquery-1.12.4.min.js"></script>

    <script>
      $(function () {
        function drag(obj) {
          obj.on("mousedown", start);
          function start(e) {
            var event = e || window.event;
            deltaX = event.clientX - obj.offset().left;
            deltaY = event.clientY - obj.offset().top;
            // 鼠标坐标减去div离浏览器左上角的坐标
            $(document).on("mousemove", move);
            $(document).on("mouseup", stop);
            // 当鼠标移动的时候绑定mousemove事件
            // 当鼠标放开的时候绑定一个stop函数
          }

          function move(e) {
            var event = e || window.event;
            obj.css({
              left: event.clientX - deltaX + "px",
              top: event.clientY - deltaY + "px",
            });
            //只要鼠标移动就触发move函数 设置div坐标
            // 鼠标的坐标减去div离浏览器左上角的坐标就是div自己的目标
            return false;
          }

          function stop() {
            // 当鼠标放开时解除document绑定的事件
            $(document).off("mousemove", move);
            $(document).off("mouseup", stop);
            // $(document).off(); 解除所有绑定过的事件,这样也行
          }
        }
        drag($("div"));
      });
    </script>
  </body>
</html>
```

> 更新补充 -- vue.js 拖动插件

[https://github.com/liaohui5/vue-drag.js](https://github.com/liaohui5/vue-drag.js)
