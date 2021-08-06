## 常见单位

### 像素

> 什么是像素(pixel)?

像素就是一个一个的小方格, 一个小方格就是一个像素, 例如此处是 100x100, 那么水平方向
占用 100 个小方格, 垂直方向占用 100 个小方格

> 像素的特点

不会随着视口的变化而变化

### 百分比

> 什么是百分比?

百分比是一个动态单位, 永远都是以当前元素的父元素作为参考进行计算的
例如: 父元素的宽度是 200px 设置子元素的宽度为 50%, 那么志愿书的宽度就是 100px

> 百分比的特点

1. 子元素的 `高度` 是参考 `父元素的高度` 来计算的
2. 子元素的 `宽度` 是参考 `父元素的宽度` 来计算的
3. 子元素的 `padding` 无论是水平还是垂直方向都是参考 `父元素的宽度` 来计算的
4. 不用用百分比来设置 `border`

### em

> 什么是 em

em 也是一个动态单位, 是相对于元素字体大小的单位
比如元素的 font-size 是 12px, 那么设置元素的的宽度为 2em 则元素的宽度为 24px

> em 的特点

1. 当前元素设置了字体大小, 就参考当前元素的字体大小进行计算
2. 当前元素没有设置字体大小, 就参考当前元素的第一个设置了字体大小的祖先元素的字体大小
3. 当前元素及其所有祖先元素都没有设置字体大小, 就参考浏览器默认的字体大小

### rem

> 什么是 rem ?

rem 就是 root em 的缩写, 和 em 一样是一个动态单位, 不同的是
rem 和 em 不同的是, rem 是参考根元素(html)的字体大小计算的单位
例如: 设置 html 的字体大小为 12px 那么一个 1rem 就是 12px

### vw 和 vh

> 什么是 vw(viewport width) 和 vh(viewport height)

1. vw 和 vh 是一种动态单位, 是一个参考网页视口的单位
2. 系统会自动将视口的高度和宽度分为 100 份, 1vw 就占用视口宽度的 1%, 1vh 就占用视口高度的 1%

---

## 视口属性 viewport

### 什么是视口

1. 视口的简单理解就是可视区域的大小
2. 在 PC 端, 视口的大小就是浏览器的可见区域
3. 在移动端, 视口的大小并不是窗口的大小, 而是被任务的定义为了 980

### 设置视口

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
/>
```

- `width:device-width` : 设置视口的宽度为设备的宽度
- `initial-scale=1.0` : 初始化缩放比例
- `user-scalable` : 是否允许用户缩放视口比例
- `maximum-scale`: 允许最大的缩放比例
- `minimum-scale`: 允许最小的缩放比例

## 移动端开发适配方案

### 方案 1: 媒体查询

- 通过判断设备的宽度写多套 css 样式来兼容所有设备, 缺点: `需要维护多套代码`

```css
@media screen and (max-width: 320px) {
  /* iphone5 */
}

@media screen and (min-width: 375px) {
  /* iphone6/7/8 */
}

@media screen and (min-width: 414px) {
  /* iphoneX/Plus */
}
```

### 方案 2: 媒体查询 + rem

> 使用此方案的网站

- https://www.163.com
- https://www.suning.com

> 手机尺寸

- iphone3/4/5: 320px
- iphone6/7/8: 375px
- iphoneX/plus: 414px

> 设计图的尺寸宽度一般是 750px 或 1125px, 如何等比缩放

- 将设计图宽度分成指定份数, 获取每一份的大小

  例如: 750px 的设计图分成 7.5 份, 那么每一份的大小就是 100px

- 将目标屏幕也分为指定份数, 获取每一份的大小

  例如: 将 375 的屏幕也分成 7.5 份, 那么每一份的大小就是 50px

- `原始元素的尺寸 / 原始设计图每份大小 * 目标屏幕每份大小 = 等比缩放后的尺寸`

  例如: 750 设计图有一个 150 \* 150 大小的图片, 想要等比缩放到 375 的屏幕上

  那么: 150 / 100 \* 50 = 75px;

- 如何应用到代码中?

1. 目标屏幕的每一份大小就是 html 的 `font-size` : 50px
2. 使用时: 元素的 rem 尺寸 = 原始的元素尺寸 / 原始图片每一份大小

```css
/******************************************************
图片: 750px
屏幕: 375px
元素: 150px
均分: 7.5 份, 图片每份大小: 100px, 屏幕每份大小: 50px

目标屏幕的每一份大小就是 html 的 `font-size` : 50px

计算rem: 元素原始尺寸 / 图片每一份大小 = 1.5
        150         / 100           = 1.5rem

还原px:  元素的rem尺寸 * 屏幕的每一份大小  = 75
        1.5          * 50               = 75px       
*****************************************************/
```

- 具体代码实现:

```css
@media screen and (max-width: 320px) {
  html {
    /*
          iphone5:
          1rem = 320px(屏幕尺寸) / 7.5(均分的份数)
        */
    font-size: 42.7px;
  }
}

@media screen and (min-width: 375px) {
  html {
    /********************************
          iphone6/7/8: 
          1rem = 375px(屏幕尺寸) / 7.5(均分的份数)
        ********************************/
    font-size: 50px;
  }
}

@media screen and (min-width: 414px) {
  /* iphoneX/Plus */
  html {
    /********************************
         iphone6/7/8:
         1rem = 414px(屏幕尺寸) / 7.5(均分的份数)
        ********************************/
    font-size: 55.2px;
  }
}
```

### 方案 3: js 设置 html 的 fontsize + rem

- 现在的 `android` 手机尺寸太多, 更新速度太快, 用媒体查询一个一个全都适配不太现实, 所以需要 js 动态获取屏幕的宽度然后除以指定份数

```js
document.documentElement.style.fontSize = window.innerWidth / 7.5 + "px";
```

### 解决物理像素和逻辑像素不同的问题

- 逻辑像素: css 编程虚拟的像素单位
- 物理像素: 物理设备的实际像素

1. 获取设备的像素比: DPR (Device Pixel Ratio)
2. 设置视口

```js
const viewportMeta = document.createElement("meta");
const dpr = 1.0 / window.devicePixelRatio;
viewportMeta.name = "viewport";
viewportMeta.content = `width=device-width, initial-scale=${dpr}, maximum-scale=${dpr}, minimum-scale=${dpr}, user-scalable=no`;
document.head.appendChild(viewportMeta);
```
