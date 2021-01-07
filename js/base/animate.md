### 匀速动画

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>js定时器动画</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      #box {
        width: 100px;
        height: 100px;
        background: #000;
      }
    </style>
    <script src="./js/funs.js"></script>
  </head>
  <body>
    <button id="btn">开始动画</button>
    <div id="box"></div>
    <!-- javascript -->
    <script>
      window.onload = function () {
        var box = document.getElementById("box");
        var timer,
          start = 0,
          step = 5,
          stop = 1000;
        document.getElementById("btn").onclick = function () {
          clearInterval(timer); // 防止多次点击错误
          timer = setInterval(function () {
            // 步长
            start += step;
            // 停止条件
            if (start >= stop) {
              start = stop;
              clearInterval(timer);
            }
            // 开始动画
            box.style.marginLeft = start + "px";
            console.log(start);
          }, 10);
        };
      };
    </script>
  </body>
</html>
```

### 缓动动画

> 缓动公式: 起始值 += (结束值 - 起始值) \* 缓动系数

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>动画封装</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      #box {
        width: 100px;
        height: 100px;
        background: #000;
      }
    </style>
  </head>
  <body>
    <button id="btn">开始动画</button>
    <div id="box"></div>
    <!-- javascript -->
    <script>
      /**
       * 获取元素的style属性
       * @param obj
       * @param attr
       * @returns {string}
       */
      function getStyleAttrValue(obj, attr) {
        if (obj.currentStyle) {
          return obj.currentStyle[attr];
        } else {
          return window.getComputedStyle(obj, null)[attr];
        }
      }

      /**
       * 部分缓动动画封装
       * @param obj 需要做动画的元素节点
       * @param jsonData 需要做动画的属性和值
       * @param fn   在动画结束后做另一个动画
       */
      function bufferAnimation(obj, jsonData, fn) {
        clearInterval(obj.timer);
        // 设置定时器
        var begin = 0,
          target = 0,
          speed = 0,
          flag = true;
        obj.timer = setInterval(function () {
          // 遍历json数据,将属性和值都作用到要操作的元素对象上
          for (var k in jsonData) {
            // 获取初始值
            begin = parseInt(getStyleAttrValue(obj, k)) || 0;
            // 求出步长 speed
            speed = (jsonData[k] - begin) * 0.1;
            // 判断方向 并 将步长向上/下取整
            speed = target > begin ? Math.ceil(speed) : Math.floor(speed);
            // 开始动画
            obj.style[k] = begin + speed + "px";
            // 是否所有的属性动画都完成
            if (begin !== target) {
              flag = false;
            }
          }
          // 所有的属性动画完成后,清除定时器
          if (flag) {
            clearInterval(obj.timer);
            // 判断是否有回调函数,如果有就就在动画完成后执行回调
            typeof fn === "function" && fn();
          }
        }, 20);
      }

      window.onload = function () {
        var box = document.getElementById("box");
        document.getElementById("btn").onclick = function () {
          bufferAnimation(box, { left: 800, top: 500, height: 200, width: 200 });
        };
      };
    </script>
  </body>
</html>
```
