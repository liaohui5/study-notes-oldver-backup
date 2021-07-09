> 原生 js 实现拖动效果

```js
!(function (win) {
  /**
   * drag
   * @param {String} selector querySelector(selector)
   * @param {Object} options {x, y}
   */
  win.drag = function (selector, options) {
    if (!options || typeof options !== "object") {
      options = {};
    }
    var x = options.x;
    var y = options.y;

    // position fixed
    var el = document.querySelector(selector);
    if (!(el && typeof el === "object" && el.nodeType === 1)) {
      throw new Error("The selector not select some html element");
    }

    var offsetX, offsetY, drag;
    el.style.position = "fixed";

    // mousedown
    el.addEventListener("mousedown", function (mousedownEvent) {
      offsetX = mousedownEvent.clientX - el.offsetLeft;
      offsetY = mousedownEvent.clientY - el.offsetTop;
      drag = true;

      // move
      el.addEventListener("mousemove", function (mouseMoveEvent) {
        if (drag && x) {
          el.style.left = mouseMoveEvent.clientX - offsetX + "px";
        }
        if (drag && y) {
          el.style.top = mouseMoveEvent.clientY - offsetY + "px";
        }
      });
    });

    // mouseup
    el.addEventListener("mouseup", function () {
      drag = false;
    });
  };
})(window);
```
