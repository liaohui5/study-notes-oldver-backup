### 设置属性

> 1. 节点对象.setAttribute('属性','值');
> 2. 节点对象.属性 = '值';

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <img src="./images/1.jpg" alt="" />
    <script>
      window.onload = function () {
        // 获取节点
        // 1. 获取节点属性
        var img = document.getElementsByTagName("img")[0];

        // 2.1 设置节点对象的值: 节点对象.setAttribute('属性','值');
        // 这种方法设置属性,如果没有就创建属性并设置值
        img.setAttribute("aaa", "AAAAAAAAAAAAA");

        // 2.2 设置节点对象的值: 节点对象.属性 = '值';
        // 这种方法设置属性的值,如果没有不会创建属性
        img.alt = "Test Alt Attribute"; // 设置成功
        img.bbb = "bbb"; // 设置失败
      };
    </script>
  </body>
</html>
```

### 获取节点属性

> 1. 节点对象.getAttribute('属性')
> 2. 节点对象.属性

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <img src="./images/1.jpg" alt="" />
    <script>
      window.onload = function () {
        // 获取节点
        // 1. 获取节点属性
        var img = document.getElementsByTagName("img")[0];

        // 2 设置节点属性
        img.setAttribute("aaa", "AAAAAAAAAAAAA");

        // 3.1 获取节点属性:  节点对象.getAttribute('属性')
        // 该方法获取的是属性中的原始属性,属性的值写的是什么就获取什么
        // 并且,该方法可以获取通过 js动态添加的属性
        console.log(img.getAttribute("src")); // ./images/1.jpg
        console.log(img.getAttribute("aaa")); // AAAAAAAAAAAAA

        console.log("--------------------------"); // 方便查看两种方法获取的测试结果

        // 3.2 获取节点属性:  节点对象.属性
        // 该方法获取的属性是运行后的值,并且该方法不能获取 js动态添加的属性
        console.log(img.src); // file:///D:/code/images/1.jpg
        console.log(img.aaa); // undefined 不能获取到 js动态添加的 aaa属性
      };
    </script>
  </body>
</html>
```

### 移除属性

> 节点属性.removeAttribute('属性')

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>javascript</title>
  </head>
  <body>
    <img src="./images/1.jpg" alt="" />
    <script>
      window.onload = function () {
        // 获取节点
        // 1. 获取节点属性
        var img = document.getElementsByTagName("img")[0];

        // 2 设置节点属性
        img.setAttribute("aaa", "AAAAAAAAAAAAA");

        // 3.移除属性  removeAttribute('属性')
        img.removeAttribute("aaa"); // 移除成功
        img.removeAttribute("alt"); // 移除成功
        console.log();
      };
    </script>
  </body>
</html>
```
