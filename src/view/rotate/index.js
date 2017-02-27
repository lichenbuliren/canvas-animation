import { Ball, util } from '../../util';
require('../index.css');

// 使用高级旋转公式旋转小球 ball{x, y};
// newX = x*cos(rotation) - y*sin(rotation);
// newY = y*cos(rotation) + x*sin(rotation);

window.onload = function() {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var w = canvas.width = window.innerWidth;
  var h = canvas.height = window.innerHeight;
  var centerX = w/2;
  var centerY = h/2;
  var ball = new Ball({
    r: 40,
    color: 'red'
  });

  var angle = 0;
  var speed = .05;
  // 每次旋转角度值
  var sin = Math.sin(speed);
  var cos = Math.cos(speed);

  ball.x = Math.random() * w;
  ball.y = Math.random() * h;

  util.drawAxis(canvas, '#fff');

  (function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0,0, w,h);
    util.drawAxis(canvas, '#fff');
    angle += speed;
    // 相对中心点位置坐标
    var x1 = ball.x - centerX;
    var y1 = ball.y - centerY;
    var newX = x1*cos - y1*sin;
    var newY = y1*cos + x1*sin;
    ball.x = centerX + newX;
    ball.y = centerY + newY;
    ball.draw(ctx);
  })();
}