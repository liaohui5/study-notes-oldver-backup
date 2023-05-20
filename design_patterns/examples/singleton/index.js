// 遮罩类
var Modal = (function() {
  // 测试 非单例模式
  // function Modal() {
  //   this.modalDOM = this.initDOM();
  // }

  var _instance = null;
  function Modal() {
    if (_instance === null) {
      _instance = this;
      this.init();
    }
    return _instance;
  }

  // 获取唯一实例
  Modal.getInstance = function() {
    return new Modal();
  };

  // 初始化
  Modal.prototype.init = function() {
    this.doms = {
      mask: '',
      content: '',
    };
    this.render();
  };

  // 渲染 dom
  Modal.prototype.render = function() {
    var modalMask = document.createElement('div');
    this.doms.mask = modalMask;
    modalMask.className = 'modal-mask';

    var contentDiv = document.createElement('div');
    this.doms.content = contentDiv;
    contentDiv.classList = 'modal-main';
    contentDiv.textContent = '中间内容'; // 先写死, 之后可以做动态传入然后渲染

    var closeBtn = document.createElement('button');
    closeBtn.classList = 'modal-close-btn';
    closeBtn.textContent = 'x';
    closeBtn.addEventListener('click', this.close.bind(this), false);

    modalMask.appendChild(contentDiv);
    modalMask.appendChild(closeBtn);
    document.body.appendChild(modalMask);
  };

  // 显示遮罩
  Modal.prototype.open = function() {
    this.doms.mask.style.display = '';
  };

  // 关闭遮罩
  Modal.prototype.close = function() {
    this.doms.mask.style.display = 'none';
  };

  return Modal;
})();

window.onload = function() {
  var btn = document.querySelector('#btn');

  btn.addEventListener('click', function() {
    console.log('click');
    // 将弹窗做成单例的好处:
    // 1. 无论 new Modal 或者 getInstance 多少次, 始终都只会创建一次DOM
    // 2. 无论点击多少次,始终都只会创建一次DOM, 这样就可以避免异步的问题

    var modal1 = Modal.getInstance();
    modal1.open();

    var modal2 = Modal.getInstance();
    modal2.open();

    // 点击之后没有立即创建, 此时按钮可以重复点击(如果不是单例那么就会重复创建)
    setTimeout(() => {
      var modal3 = Modal.getInstance();
      modal3.open();
    }, 1000);
  });
};
