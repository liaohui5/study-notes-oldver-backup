## CSS 自定义属性

有的文章/博客也把它叫做 `定义(全局)变量`

```css
/*
选择器 {
  --属性名: 属性值
}

定义: 属性名必须是 -- 开始, 属性多个单词可以用 - _ 分隔或者驼峰
:root {
  --my-bg-color: #272822;
  --my_text_color: #a6e22e;
  --myFontSize: 24px;
}

使用: 使用 var 函数来使用(区分大小写)
#app {
  color: var(--my_text_color);
  font-size: var(--myFontSize);
  background-color: var(--my-bg-color);
}
*/
```

## CSS 函数

https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Functions

| 函数名 | 作用                 |
| :----- | :------------------- |
| calc   | 加减乘除计算         |
| max    | 多个值取最大的那一个 |
| min    | 多个值取最小的那一个 |

```css
.container {
  width: 1200px;
}
.container .sidebar {
  width: 300px;
}
.container .main {
  width: calc(1200px - 300px);
  height: max(100px, 300px, 200px); /* 300px */
  padding: min(10px, 20px, 30px); /* 10px */
}
```

## 换肤设计

最简单的方式就是使用变量, 如果使用的浏览器比较老旧, 可以是用 link 标签动态引入 css 来实现这个效果

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="no-referrer" />
    <title>JavaScript</title>
    <style>
      :root {
        /* light: 默认主题 */
        --theme-bg: #ffffff;
        --theme-color: #2c3e50;
        --theme-bg-dark: #f5f5f5;
      }

      :root[data-theme='dark'] {
        /* dark: 黑色主题 */
        --theme-bg: #555555;
        --theme-color: #c8c8c8;
        --theme-bg-dark: #282828;
      }

      body {
        background: var(--theme-bg);
        color: var(--theme-color);
      }

      button {
        border: none;
        background: var(--theme-bg-dark);
        color: var(--theme-color);
        padding: 5px 10px;
      }
    </style>
  </head>

  <body>
    <div id="app">
      <p>这是一段文字</p>
      <button type="button" id="light">点击换主题(light)</button>
      <button type="button" id="dark">点击换主题(dark)</button>
    </div>
    <script>
      const lightThemeBtn = document.querySelector('#light');
      const darkThemeBtn = document.querySelector('#dark');
      const root = document.querySelector(':root');

      // 加载主题
      function loadTheme() {
        const theme = window.localStorage.getItem('__theme') || 'light';
        setTheme(theme);
      }

      // 设置主题(持久化)
      function setTheme(theme) {
        root.setAttribute('data-theme', theme);
        window.localStorage.setItem('__theme', theme);
      }

      // 切换主题
      lightThemeBtn.addEventListener('click', function () {
        setTheme('light');
      });
      darkThemeBtn.addEventListener('click', function () {
        setTheme('dark');
      });

      // 默认先加载主题
      loadTheme();
    </script>
  </body>
</html>
```
