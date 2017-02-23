export default {
  // 捕获当前鼠标在 canvas 元素中的坐标
  captureMouse: function (element) {
    var mouse = {
      x: 0,
      y: 0
    };

    element.addEventListener('mousemove', function (event) {
      var x, y;
      if (event.pageX || event.pageY) {
        x = event.pageX;
        y = event.pageY;
      } else {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      x -= element.offsetLeft;
      y -= element.offsetTop;

      mouse.x = x;
      mouse.y = y;
    }, false);
  },
  // 
  captureTouch: function (element) {
    var touch = {
      x: null,
      y: null,
      isPressed: false,
      event: null
    };

    var bodyScrollLeft = document.body.scrollLeft;
    var elementScrollLeft = document.documentElement.scrollLeft;
    var bodyScrollTop = document.body.scrollTop;
    var elementScrollTop = document.documentElement.scrollTop;
    var offsetLeft = element.offsetLeft;
    var offsetTop = element.offsetTop;

    // 绑定 touchstart 事件
    element.addEventListener('touchstart', function (event) {
      touch.isPressed = true;
      touch.event = event;
    }, false);

    // 绑定 touchmove 事件
    element.addEventListener('touchmove', function (event) {
      var x, y;
      var touchEvent = event.touches[0];

      if (touchEvent.pageX || touchEvent.pageY) {
        x = touchEvent.pageX;
        y = touchEvent.pageY;
      } else {
        x = touchEvent.clientX + bodyScrollLeft + elementScrollLeft;
        y = touchEvent.clientY + bodyScrollTop + elementScrollTop;
      }

      x -= offsetLeft;
      y -= offsetTop;

      touch.x = x;
      touch.y = y;

      touch.event = event;
    }, false);
  },
  // 绘制中心坐标轴
  drawAxis: function (canvas, color) {
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
}

//动画循环 
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame =
    (window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 17 /*~ 1000/60*/);
      });
}

//动画循环取消 
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame =
    (window.cancelRequestAnimationFrame ||
      window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
      window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
      window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
      window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
      window.clearTimeout);
}