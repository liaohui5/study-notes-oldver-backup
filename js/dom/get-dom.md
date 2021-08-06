### 基础 API 获取

> 在 javascript 中,获取 dom 对象的节点的方式有很多,如:

```js
document.getElementById(); // 根据ID获取dom
document.getElementsByTagName(); // 根据标签名获取dom
document.getAnonymousElementByAttribute(); // 根据标签的属性获取dom
document.getElementsByName(); //根据标签的 name 属性获取dom
document.getElementsByClassName(); // 根据标签的 class 属性获取 dom
```

> 除了这些还有很多,这些大多都是只能传一个单一的选择器,如果想选择通过选择器来灵活,获取节点或节点列表就可以使用 `querySelector` 和 `querySelectorAll`

### querySelector

> 获取选择器匹配到的节点列表中的第一个

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Study javascript</title>
  </head>
  <body>
    <button class="btns">测试1</button>
    <button class="btns">测试2</button>
    <button class="btns">测试3</button>

    <script>
      var btns = document.querySelector(".btns");
      console.log(btns); // 只获取到了 <button class="btns">测试1</button>
    </script>
  </body>
</html>
```

### querySelectorAll

> 获取选择器匹配到的节点列表

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Study javascript</title>
  </head>
  <body>
    <button class="btns">测试1</button>
    <button class="btns">测试2</button>
    <button class="btns">测试3</button>

    <script>
      var btns = document.querySelectorAll(".btns");
      console.log(btns); // 所有的 button 标签
    </script>
  </body>
</html>
```

### dom 节点 获取父节点

> parentNode

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <div id="box">
      <button class="btn">按钮</button>
      <span id="span">
        <a href="#" id="link">百度一下,你就知道</a>
      </span>
    </div>
    <script>
      window.onload = function () {
        // 获取 a 标签
        var a = document.getElementsByTagName("a")[0];
        console.log(a);

        // 根据 a 标签获取 span
        var span = a.parentNode;
        console.log(span);

        // 根据 span 获取 div
        var div = span.parentNode;

        // 根据 a 获取 div
        var div = a.parentNode.parentNode;
      };
    </script>
  </body>
</html>
```

### dom 节点获取兄弟节点

> 上一个: previousElementSibling 或者 previousSibling
>
> 下一个: nextElementSibling 或者 nextSibling

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <ul>
      <li><a href="">001</a></li>
      <li><a href="">002</a></li>
      <li id="current"><a href="">003</a></li>
      <li><a href="">004</a></li>
      <li><a href="">005</a></li>
    </ul>
    <script>
      window.onload = function () {
        // 获取 "当前节点"
        var current = document.getElementById("current");
        console.log(current); // 003

        // 获取相对  "当前节点" 来说的上一个节点
        // current.nextElementSibling || current.nextSibling是IE兼容写法
        // 因为低版本IE只支持 nextSibling;
        var nextNode = current.nextElementSibling || current.nextSibling;
        console.log(nextNode); // 只有 004,因为只获取 后面相邻 的 第一个 兄弟节点

        // 获取相对  "当前节点" 来说的下一个节点
        // current.previousElementSibling || current.previousSibling; 是IE兼容写法
        // 因为低版本IE只支持 previousSibling;
        var prevNode =
          current.previousElementSibling || current.previousSibling;
        console.log(prevNode); // 只有 002,因为只获取 前面相邻 的 第一个 兄弟节点
      };
    </script>
  </body>
</html>
```

### dom 节点获取后代节点

> 1. 第一个子节点: `firstChild` 或者 `firstElementChild`
> 2. 最后一个子节点: `lastChild` 或者 `lastElementChild`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <ul id="current">
      <li><a href="">001</a></li>
      <li><a href="">002</a></li>
      <li><a href="">003</a></li>
      <li><a href="">004</a></li>
      <li><a href="">005</a></li>
    </ul>
    <script>
      window.onload = function () {
        // 获取 "当前节点"
        var current = document.getElementById("current");
        console.log(current); // ul

        // 获取相对  "当前节点" 来说的第一个子节点
        // current.firstElementChild || current.firstChild 兼容写法,
        // 低版本ie只支持 firstChild
        var firstChildNode = current.firstElementChild || current.firstChild;
        console.log(firstChildNode); // 001

        // 获取相对  "当前节点" 来说的最后一个子节点
        // current.lastElementChild || current.lastChild 兼容写法
        // 低版本ie只支持 lastChild
        var lastChildNode = current.lastElementChild || current.lastChild;
        console.log(lastChildNode); // 005
      };
    </script>
  </body>
</html>
```

> 3. 获取所有子节点 包括 html 标签节点(元素节点), 属性节点 和 文本节点

```JavaScript
// 判断节点类型
nodeType == 1; // html标签节点(元素节点)
nodeType == 2; // 属性节点
nodeType == 3; // 文本节点
```

> ​ 1. childeNodes 包括 html 标签节点(元素节点), 属性节点 和 文本节点

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <ul id="current">
      <li><a href="">001</a></li>
      <li><a href="">002</a></li>
      <li><a href="">003</a></li>
      <li><a href="">004</a></li>
      <li><a href="">005</a></li>
    </ul>
    <script>
      window.onload = function () {
        var current = document.getElementById("current");

        // 获取所有子节点,包括 html标签节点(元素节点), 属性节点 和 text节点
        var allChildNodes = current.childNodes;
        // 获取所有的 元素节点
        var htmlNodes = [];
        for (var i = 0; i < allChildNodes.length; i++) {
          if (allChildNodes[i].nodeType === 1) {
            htmlNodes.push(allChildNodes[i]);
          } else {
            continue;
          }
        }

        /* 或者 for...in   两种方式遍历都可以
        for (var key in allChildNodes) {
          if ( allChildNodes[key].nodeType === 1 ){
            htmlNodes[] = allChildNodes[key];
          }else {
            continue;
          }
        }
        */
        console.log(htmlNodes);
      };
    </script>
  </body>
</html>
```

> ​ 2. children: 只获取元素节点

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <ul id="current">
      <li><a href="">001</a></li>
      <li><a href="">002</a></li>
      <!-- 注释节点 -->
      <li><a href="">003</a></li>
      <!-- 注释节点 -->
      <li><a href="">004</a></li>
      <li><a href="">005</a></li>
    </ul>
    <script>
      window.onload = function () {
        // 获取 "当前节点"
        var current = document.getElementById("current");
        // 获取相对于 "当前节点" 来说的所有子节点
        var allHtmlNode = current.children;
        // 注意: 低版本ie会获取注释节点
        console.log(allHtmlNode);
      };
    </script>
  </body>
</html>
```

> 3.根据当前节点获取任意兄弟节点

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <ul>
      <li><a href="">001</a></li>
      <li><a href="">002</a></li>
      <li id="current"><a href="">003</a></li>
      <li><a href="">004</a></li>
      <li><a href="">005</a></li>
    </ul>
    <script>
      window.onload = function () {
        // 获取任意一个 兄弟节点

        // 1.获取 "当前节点"
        var current = document.getElementById("current");

        // 2.根据 "当前节点" 获取 父节点中的所有 子节点集合
        var allSiblings = current.parentNode.children;

        // 3.根据下标取任意一个"当前节点" 的 兄弟节点,下标从0开始
        console.log(allSiblings[1]); // 002
      };
    </script>
  </body>
</html>
```
