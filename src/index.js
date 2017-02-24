import util from './util';
import Ball from './ball';
import './index.css';

window.onload = function () {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let xpos = 0,
    ypos = 0,
    zpos = 0,
    f1 = 250, //眼睛距离屏幕距离
    vpX = canvas.width / 2, // 消失点
    vpY = canvas.height / 2;
  let ball = new Ball({
    radius: 40,
    color: 'red'
  });
  let mouse = util.captureMouse(canvas);

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  canvas.style.backgroundColor = '#000';
  util.drawAxis(canvas, '#fff');
  
  window.addEventListener('keydown', function(e) {
    if (e.keyCode === 38) { //up
      zpos += 5;
    } else if (e.keyCode === 40) {
      zpos -= 5;
    }
  }, false);


  (function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    util.drawAxis(canvas, '#fff');
    if (zpos > -f1) {
      var scale = f1/(f1 + zpos); // 透视缩放比例
      xpos = mouse.x - vpX;
      ypos = mouse.y - vpY;
      ball.scaleX = ball.scaleY = scale;
      ball.x = vpX + xpos * scale;
      ball.y = vpY + ypos * scale;
      ball.visible = true;
    } else {
      ball.visible = false;
    }

    if (ball.visible) ball.draw(ctx);
    requestAnimationFrame(render, canvas);
  })();
}