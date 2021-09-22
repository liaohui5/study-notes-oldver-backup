### 创建节点

> createElement

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <div id="box">
      <p class="testNode">---------a测试a--------</p>
      <p class="testNode">---------b测试b--------</p>
      <p class="testNode">---------c测试c--------</p>
    </div>
    <script>
      window.onload = function () {
        // 1.创建节点
        var aNode = document.createElement("a");

        // 2.为节点对象添加属性
        aNode.href = "https://gitee.com";
        aNode.text = "gitee";
        aNode.target = "_blank";

        // 3.获取 "当前节点"
        var box = document.getElementById("box");
        // 4.将 aNode 这个节点追加到 box 中, appendChild 追加到最后
        // box.appendChild(aNode);

        // 5 插入到指定节点的前面
        var referenceNode = document.querySelectorAll(".testNode")[1];
        // 将 要插入节点 插入到 参照节点之前   box.insertBefore(要插入节点, 参照节点);
        box.insertBefore(aNode, referenceNode);
      };
    </script>
  </body>
</html>
```

### 复制节点

> cloneNode

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <div class="box">
      <p>--------a测试节点a---------</p>
      <p>--------b测试节点b---------</p>
      <p>--------c测试节点c---------</p>
    </div>
    <script>
      window.onload = function () {
        // 复制节点:  新节点 = 原节点.cloneNode(参数); 参数可选复制节点

        // 1.获取需要拷贝的节点
        var box = document.getElementsByClassName("box")[0];

        // 2.克隆节点
        // var newNode = box.cloneNode(false); // 浅克隆: 只拷贝需要拷贝的节点(默认)
        var newNode = box.cloneNode(true); // 深克隆: 拷贝节点中所有子节点

        // 3.将拷贝的内容追加到box中
        box.appendChild(newNode);
      };
    </script>
  </body>
</html>
```

### 删除节点

> 1. remove 自杀
> 2. removeChild 他杀

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <div id="box">
      <p class="testNode">---------a测试a--------</p>
      <p class="testNode">---------b测试b--------</p>
      <p class="testNode">---------c测试c--------</p>
    </div>
    <script>
      window.onload = function () {
        // 删除节点   删除 <p class="testNode">---------b测试b--------</p> 这个节点
        // 1.获取 "需要删除的节点"
        var delNode = document.getElementById("box").children[1];

        // 2.获取 "需要删除的节点" 的 父节点并调用 removeChild 删除需要删除的节点
        // delNode.parentNode.removeChild(delNode);   // 他杀

        // 2.直接删除节点(自杀)    推荐使用
        delNode.remove();
        // 可简写为 document.getElementById('box').children[1].remove();
      };
    </script>
  </body>
</html>
```

### 替换节点

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>replaceNode</title>
    <style>
      #box {
        width: 100px;
        height: 100px;
        background: #000;
      }
    </style>
  </head>
  <body>
    <button id="replace">replace</button>
    <div id="box"></div>
    <script>
      window.onload = function () {
        document.getElementById("replace").onclick = function () {
          var btnNode = document.createElement("button");
          btnNode.innerText = "button";
          document.body.replaceChild(btnNode, document.getElementById("box"));
        };
      };
    </script>
  </body>
</html>
```
