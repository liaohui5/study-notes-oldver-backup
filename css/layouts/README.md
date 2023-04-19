## 相关文档

- [flex](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

- [grid](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

## 什么是 flex 布局?

flex 是 flexible box 的缩写, 翻译就是 "弹性盒子", 简单来说就是可以只适用宽度高度的盒子,可以用于自适应弹性布局(也叫 flex 布局)

## 基本概念

- flex 容器: `display: flex` 的元素
- flex 容器成员: `display: flex` 的元素的子元素(包括文本节点)
- 主轴: 在默认情况下水平方向的轴为主轴
  - 主轴起点: 在默认情况下水平方向的最左侧为主轴起点
  - 主轴终点: 在默认情况下水平方向的最右侧为主轴终点
- 侧轴: 在默认情况下垂直方向的轴为主轴
  - 侧轴起点: 在默认情况下垂直方向的最上方为侧轴起点
  - 侧轴终点: 在默认情况下垂直方向的最下方为侧轴终点

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .box {
        width: 500px;
        height: 300px;
        background: #eee;
        display: flex; /* 将这个元素设置为 flex-contaienr */
      }
      .box .item {
        width: 100px;
        height: 100px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
    </style>
  </head>
  <body>
    <!-- 
      1. 将元素的 display 的值为 flex 他就变成了一个 flex 容器(flex-contaienr) 
      2. 和 inlin-block 一样, flex 也有 inline-flex, 行内的伸缩布局容器
    -->
    <div class="box row">
      <!-- flex 容器中的所有元素都是 flex 伸缩项(flex-items) -->
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![basic-notion-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20230418140802.png)

## 容器属性

### flex-direction 主轴方向

> 在 flex 布局中, 水平轴和垂直轴必须只能有一个主轴, 而且主轴和侧轴必定是十字交叉的, flex 容器主轴的方向就是 伸缩项 排列的方向

- row : 默认取值, 设置左边为主轴起点, 从左向右排版
- row-reverse : 设置右边为主轴起点, 从右向左排版
- column : 将水平轴设置为侧轴, 垂直轴设置为主轴, 并且将容器顶部设置为主轴起点, 也就是说会从上往下排版
- column-reverse: 将水平轴设置为侧轴, 垂直轴设置为主轴, 并且将容器底部设置为主轴起点, 也就是说会从下往上排版

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .box {
        width: 300px;
        height: 150px;
        background: #eee;
        display: flex;
        margin: 10px;
      }
      .box .item {
        width: 50px;
        height: 50px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
    </style>
  </head>

  <body>
    <div class="box" style="flex-direction:row">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="flex-direction:row-reverse">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="flex-direction:column">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="flex-direction:column-reverse">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![flex-direction-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20230418161519.png)

### justify-content 伸缩项主轴对齐方式

- flex-start:
  1. 按主轴方向排列(从开始往结束位置排列)
  2. 排列好的伸缩项对齐主轴起点位置
- flex-end:
  1. 按主轴方向排列(从开始往结束位置排列)
  2. 排列好的伸缩项对齐主轴终点位置
- space-around: 环绕对齐
  1. 按主轴方向排列(从开始往结束位置排列)
  2. 给每个子元素(flex-item)左右加上平均每份空间的宽度
  3. (横轴为主轴的情况)每份空间平均宽度 = 剩余宽度(总宽度 - 所有子元素宽度) / 子元素的个数 _ 2(每个子元素的左右都要加所以 _ 2)
- space-between: 两端对齐
  1. 按主轴方向排列(从开始往结束位置排列)
  2. 最后一个除外, 给每个子元素(flex-item) 平均每份空间的宽度
  3. (横轴为主轴的情况)每份空间平均宽度 = 剩余宽度(总宽度 - 所有子元素宽度) / 子元素的个数 - 1(最后一个元素不用加所以 - 1)

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .box {
        width: 300px;
        height: 100px;
        background: #eee;
        display: flex;
        margin: 10px;
      }
      .box .item {
        width: 50px;
        height: 50px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
    </style>
  </head>

  <body>
    <div class="box" style="justify-content:flex-start;">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="justify-content:flex-end;">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="justify-content:space-around;">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="justify-content:space-between;">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![justify-content-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20230418170750.png)

### align-items 伸缩项侧轴对齐方式

- flex-start: 顶部对齐
  1. 按侧轴方向排列(从开始往结束位置排列)
  2. 排列好的伸缩项对齐侧轴起点位置
- flex-end: 底部对齐
  1. 按侧轴方向排列(从开始往结束位置排列)
  2. 排列好的伸缩项对齐侧轴结束位置
- center: 中间对齐
  1. 按侧轴方向排列(从开始往结束位置排列)
  2. 排列好的伸缩项对齐侧轴正中间位置
- stretch: 拉伸对齐(不能给伸缩项设置高度, 否则失效)
  1. 将伸缩项高度拉伸和容器一样高
- baseline:
  1. 按侧轴方向排列(从开始往结束位置排列)
  2. 排列好的伸缩项对齐文字底部

align-items: 是给容器使用的属性, 只要在容器中设置, 所有的伸缩项目都会生效

align-self: 是给伸缩项使用的属性, 只要给伸缩项设置, 只有被设置属性的会生效

两者主要的区别就是生效的范围不一样, 但是取值都是一样的

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .box {
        width: 300px;
        height: 150px;
        background: #eee;
        display: flex;
        margin: 10px;
      }
      .box .item {
        width: 50px;
      }
      .item.h50 {
        height: 50px;
      }
      .item.h25 {
        height: 25px !important;
      }
      .item.h100 {
        height: 100px !important;
      }
      .item.pt30 {
        padding-top: 30px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
    </style>
  </head>
  <body>
    <div class="box" style="align-items: flex-start;">
      <div class="item h50 bg-green">1</div>
      <div class="item h25 bg-red">2</div>
      <div class="item h100 bg-blue">3</div>
    </div>
    <div class="box" style="align-items: flex-end;">
      <div class="item h50 bg-green">1</div>
      <div class="item h25 bg-red">2</div>
      <div class="item h100 bg-blue">3</div>
    </div>
    <div class="box" style="align-items: center;">
      <div class="item h50 bg-green">1</div>
      <div class="item h25 bg-red">2</div>
      <div class="item h100 bg-blue">3</div>
    </div>
    <div class="box" style="align-items:stretch;">
      <div class="item bg-green">1</div>
      <div class="item bg-red">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="align-items:baseline;">
      <div class="item h50 bg-green">abc</div>
      <div class="item h25 bg-red">hjkl</div>
      <div class="item h100 pt30 bg-blue">xyz</div>
    </div>
  </body>
</html>
```

![align-items-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20230418192820.png)

### flex-wrap 伸缩项换行

> 默认情况下, 一行放不下所有的伸缩项, 那么浏览器会自动等比压缩所有的伸缩项, 保证所有的伸缩性能够放到一行
> 但是如果给伸缩项设置 `min-width` 就不会自动等比压缩所有的伸缩项目, 从而超出宽度超过容器元素
> 同样的, 如果容器足够大, 但是伸缩项设置了 `max-width` 那么缩放的最大的宽度也不会超过 `max-width` 设置的值

- nowrap: 默认值, 不换行
- wrap: 换行
- wrap-reverse: 换行, 并且每一行看做一个整体然后进行反转排列

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .box {
        width: 300px;
        height: 150px;
        background: #eee;
        display: flex;
        margin: 10px;
      }
      .box .item {
        width: 150px;
        height: 50px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="flex-wrap: wrap;">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="flex-wrap: wrap-reverse">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![flex-wrap-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20230418201050.png)

### align-content 换行后行对齐方式

这个属性只在设置了换行后才能生效, 也就是说: `flex-wrap` 的值必须是 `wrap` 或 `wrap-reverse` 才能让 `align-content` 生效

- flex-stretch: 默认值, 让每一行缩放至同等大小
- flex-start: 所有行对齐侧轴起始位置, 一行接一行
- flex-end: 所有行对齐侧轴结束位置, 一行接一行
- flex-end: 所有行对齐侧轴中间位置
- space-around: 多余的空白位置平均分布在平均每行的上下
- space-between: 上下对齐, 最后一行除外, 多余的空白位置平均分布在每行的底部

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .box {
        width: 300px;
        height: 150px;
        background: #eee;
        display: flex;
        margin: 10px;
        flex-wrap: wrap;
      }
      .box .item {
        width: 150px;
        height: 50px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
    </style>
  </head>
  <body>
    <div class="box" style="align-content: flex-start;">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="align-content: flex-end;">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="align-content: center;">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="align-content: space-around;">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="align-content: space-between;">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![align-content-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20230418204756.png)

## 伸缩项属性

### order 排序

默认情况下, 所有的伸缩项的 `order` 属性都是 `0`,如果要修改顺序, 可以给 伸缩项设置 order 属性, 排序方式是 `升序排序`

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .box {
        width: 400px;
        height: 100px;
        background: #eee;
        display: flex;
        flex-wrap: wrap;
      }
      .box .item {
        width: 100px;
        height: 50px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div style="order: 2" class="item bg-red">1</div>
      <div style="order: 3" class="item bg-green">2</div>
      <div style="order: 1" class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![order-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/20230418212603.png)

### flex-grow 放大

只有宽度不超过容器的宽度是才会生效, 所有伸缩项目的 `flex-grow` 的默认值都是 `0` 也就是不放大

```css
/*
flex-graw 放大的比例是如何计算的?

1. 计算剩余宽度: 容器总宽度 - 所有伸缩项的的总宽度 = 剩余宽度
               600 - (3 * 100) = 300
2. 计算要放大的平均宽度: 剩余宽度 / 所有伸缩项 flex-grow 值的总和
               300 / (1 + 3 + 5) = 37.5
3. 根据伸缩项的 flex-grow 的值 * 放大的平均宽度 + 原有的宽度
               (1 * 37.5) + 100 = 137.5
               (3 * 37.5) + 100 = 212.5
               (5 * 37.5) + 100 = 287.5
*/
```

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
      .box {
        width: 600px;
        height: 100px;
        background: #eee;
        display: flex;
      }
      .box .item {
        width: 100px;
        height: 50px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div style="flex-grow: 1;" class="item bg-red">1</div>
      <div style="flex-grow: 3;" class="item bg-green">2</div>
      <div style="flex-grow: 4;" class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![flex-grow-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/202304182155601.png)

### flex-shrink 缩小

所有伸缩项 `flex-shrink` 的默认值都是 `1`, 只有宽度超过容器的宽度这个属性才会生效

```css
/*
flex-shrink 缩小的比例是如何计算的?

1. 计算超出宽度: 计算所有伸缩项的总和 - 伸缩容器宽度 = 超出宽度
               (3 * 200) - 300 = 300
2. 计算权重值: 所有伸缩项 flex-shirnk 的值 * 当前伸缩项的宽度 = 权重值
               (2 * 200) + (3 * 200) + (5 * 200) = 2000
3. 计算需要缩小宽度: 超出的宽度 * 当前伸缩项的宽度 * 当前伸缩项 flex-shirnk 的值 / 权重值
               300 * 200 * 2 / 2000 = 60
               300 * 200 * 3 / 2000 = 90
               300 * 200 * 5 / 2000 = 150
4. 计算最终宽度: 当前伸缩项的宽度 - 需要缩小宽度
               140 = 200 - 60 
               110 = 200 - 90
               50  = 200 - 150
*/
```

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
      .box {
        width: 300px;
        height: 100px;
        background: #eee;
        display: flex;
      }
      .box .item {
        width: 200px;
        height: 50px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div style="flex-shrink: 2;" class="item bg-red">1</div>
      <div style="flex-shrink: 3;" class="item bg-green">2</div>
      <div style="flex-shrink: 5;" class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![flex-shrink-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/202304182302587.png)

### 放大缩小的注意点

1. flex-grow 的默认值是 `0`, 也就是不拉伸 而 flex-shrink 的默认是 `1` 也就是等比缩小
2. 如果 flex-shrink 的值设置为 `0`, 那么当前的伸缩项就不会缩小
3. flex-grow 和 flex-shrink 不一定是拉伸是宽度, 也有可能拉伸的是高度, 到底是拉伸宽度还是高度是由主轴来控制的, 无论是 flex-grow 还是 flex-shrink 都是对主轴方向上的值进行拉伸或者缩小

```html
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <title>flex layout</title>
    <style>
      body {
        padding: 30px;
      }
      .bg-red {
        background-color: #f00;
      }
      .bg-green {
        background-color: #0f0;
      }
      .bg-blue {
        background-color: #00f;
      }
      .box {
        width: 300px;
        height: 100px;
        background: #eee;
        display: flex;
        margin-bottom: 30px;
      }
      .box .item {
        width: 200px;
        height: 50px;
      }
      .box .item:nth-child(1) {
        flex-grow: 2;
      }
      .box .item:nth-child(2) {
        flex-grow: 3;
      }
      .box .item:nth-child(3) {
        flex-grow: 5;
      }
    </style>
  </head>
  <body>
    <div class="box" style="flex-direction: row">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
    <div class="box" style="flex-direction: column">
      <div class="item bg-red">1</div>
      <div class="item bg-green">2</div>
      <div class="item bg-blue">3</div>
    </div>
  </body>
</html>
```

![grow-direction](https://raw.githubusercontent.com/liaohui5/images/main/images/202304191437451.png)

### flex-basis 伸缩项宽度设置

flex-basis 可以设置宽度, 但是要注意的是:

1. `flex-basis` 只有在 flex-container 中才有效, 也就是说必须在 `display: flex` 的元素中才会生效
2. 如果通过 `flex-basis` 设置了宽度, 同时使用 `width` 设置宽度, 那么 `width` 会失效, 也就是说, 在 flex 不居中 `flex-basis` 的优先级要高于 `width`
3. 如果同时设置了 `flex-basis` 和 `width` 设置了宽度, 一个设置为 `auto` 另外一个设置为具体的值(如:`50px`), 那么他会优先使用具体设置的值的属性

## 简写属性

简写属性和分开写没有什么任何不同, 只是一个属性可以设置多个值而已, 写起来方便

### flex-flow 容器简写属性

flex-flow = flex-direction + flex-wrap

```css
/* flex-flow: <flex-direction> <flex-wrap> */
.box {
  flex-flow: row nowrap; /* 默认值 */
}
```

### flex 伸缩项简写属性

flex = flex-grow + flex-shrink + flex-basis

```css
/* flex-flow: <flex-grow> <flex-shrink> <flex-basis> */
.box {
  flex: 0 1 auto; /* 默认值 */
}
```
