## 瀑布流效果

> 代码 html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Waterfall</title>
    <script src="./js/waterfall.js"></script>
  </head>
  <body>
    <script>
      window.onload = function () {
        window.mockHTML("app");
        new Waterfall({
          el: "#app",
          columns: 6,
          gap: 10,
        });
      };
    </script>
  </body>
</html>
```

> 代码 js

```js
(function () {
  // The DOM structure needed to generate the waterfall
  function mockHTML(id) {
    // Generate random numbers with minimum and maximum value ranges
    function getRangeNumber(Min, Max) {
      var range = Max - Min;
      return Min + Math.round(range * Math.random());
    }

    var html = "";
    for (var i = 0; i < 100; i++) {
      var h = getRangeNumber(100, 500);
      html += `<div class="item" style="background:#f00;width:200px;height:${h}px">${i}</div>`;
    }
    var app = document.createElement("div");
    app.id = id;
    app.style.margin = "100px auto";
    app.style.width = "1200px";
    app.style.position = "relative";
    app.innerHTML = html;
    document.body.appendChild(app);
  }

  /**
   * Waterfall
   * @param {Object} options {columns, gap, el}
   */
  function Waterfall(options) {
    if (!(this instanceof Waterfall)) {
      throw new TypeError("Waterfall must be used as a constructor");
    }

    if (!options.el) {
      throw new ReferenceError("the options must contain the el option");
    }

    this.el = document.querySelector(options.el);
    this.columns = options.columns || 5;
    this.gap = options.columns || 10;
    this.itemWidth = this.el.offsetWidth - (this.gap * this.columns - 1);
    this.itemWidth = Math.ceil(this.itemWidth / this.columns);
    this.items = this.el.querySelectorAll(".item");
    this.render();
  }

  /**
   * render the doms
   */
  Waterfall.prototype.render = function () {
    var item;
    var firstLineItemsHeight = [];
    var minItemIndex = -1;

    // Get the index of the smallest value in the array
    function getMinValueIndex(array) {
      var minVal = Math.min.apply(null, array);
      return array.indexOf(minVal);
    }

    for (var i = 0, l = this.items.length; i < l; i++) {
      item = this.items[i];
      item.style.position = "absolute";
      item.style.width = this.itemWidth + "px";

      if (i < this.columns) {
        // first line items
        firstLineItemsHeight.push(item.offsetHeight);
        item.style.top = "0px";
        item.style.left = i * (this.itemWidth + this.gap) + "px";
      } else {
        // other line items
        minItemIndex = getMinValueIndex(firstLineItemsHeight);
        item.style.top = firstLineItemsHeight[minItemIndex] + this.gap + "px";
        item.style.left = this.items[minItemIndex].offsetLeft + "px";
        firstLineItemsHeight[minItemIndex] += item.offsetHeight + this.gap;
      }
    }
  };

  window.Waterfall = Waterfall;
  window.mockHTML = mockHTML;
})();
```


> 实现思路

1. 获取容器(el)/分成多少列(columns)/计算每列的宽度(itemWidth)
2. 给容器定位, 获取所有的子元素(items)
3. 给第1行的子元素定位(前 columns 个元素), 并且把offsetHeight存到数组中(firstLineItemsHeight)
4. 后面的(第1行-最后1行), 每一个的item都定位到offsetHeight值最小的那个位置去, 然后修改最小的offsetHeight, 下一次再找最小的offsetHeight, 就一定不是当前这个

```
假设是5列: 第1行 firstLineItemsHeight: [120, 150, 100, 180, 200]

第6个item: 比如高度 150, left: 对齐找到的那一列的就行
  minItemIndex: 2, 因为100是offsetHeight最小的
  item.style.top: 100 + this.gap + "px";
  item.style.left: this.items[minItemIndex].offsetLeft + "px";
  firstLineItemsHeight: [120, 150, 250, 180, 200]

第7个item: 比如高度 100, left: 对齐找到的那一列的就行
  minItemIndex: 0, 因为120是offsetHeight最小的, 之前100已经被改了
  item.style.top: 120 + this.gap + "px";
  item.style.left: this.items[minItemIndex].offsetLeft + "px";
  firstLineItemsHeight: [220, 150, 150, 180, 200]

第8个item,
第9个item,
...
```




