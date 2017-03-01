import {
  util,
  Particle3d
} from '../../util/';
require('../index.css');

window.onload = function () {
  const canvasBody = document.getElementById("canvas");
  const context = canvasBody.getContext("2d");
  let particles = [],
    canvasWidth, canvasHeight, centerX, centerY;
  let delay = 200,
    timer;
  canvasWidth = canvasBody.width = window.innerWidth;
  canvasHeight = canvasBody.height = window.innerHeight;
  canvasWidth = canvasBody.width, canvasHeight = canvasBody.height;
  centerX = canvasWidth / 2, centerY = canvasHeight / 2;
  const config = {
    particleColor: '#fff',
    lineColor: '#fff',
    particleAmount: 100,
    defaultRadius: 4,
    perspective: 1200, //视距
    sphereRadius: 400 //球体半径
  };

  canvasBody.style.backgroundColor = '#000';
  setup();

  window.addEventListener('resize', function () {
    deBouncer();
  });

  function deBouncer() {
    clearTimeout(timer);
    timer = setTimeout(function () {
      resizeReset();
    }, delay);
  }

  function setup() {
    // 设置球面粒子坐标, angleY 从 0 到 180°，angleX 从 0 到 360°，分成 10 等分
    // x 坐标：x = r*sin(angleY)*cos(angleX);
    // y 坐标：y = r*cos(angleY);
    // z 坐标：z = r*sin(angleY)*sin(angleX);
    var angleY = 0;
    for (var i = 0; i < 30; i++) { // y 轴 10 等分
      var angleX = 0;
      for (var j = 0; j < 36; j++) { // x 轴 30 等分
        var x = config.sphereRadius * Math.sin(angleY) * Math.cos(angleX);
        var y = config.sphereRadius * Math.cos(angleY);
        var z = config.sphereRadius * Math.sin(angleY) * Math.sin(angleX);
        // 验证公式是否正确 x² + y² + z² = r²；
        console.log(Math.round((Math.sqrt(x * x + y * y + z * z))));
        particles.push(new Particle3d({
          x,
          y,
          z,
          r: 2,
          ballR: config.sphereRadius,
          vpX: centerX,
          vpY: centerY,
          perspective: config.perspective
        }));
        angleX += 10;
      }
      angleY += 6;
    }
    console.log(angleY, angleX);
    requestAnimationFrame(loop);
  }
  // particles.sort(function(a, b) {
  //   return b.z - a.z;
  // });

  console.log(particles);

  var rotateY = -0.001;
  var rotateX = 0.001;
  function loop() {
    // rotateY = 0.0001;
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < particles.length; i++) {
      particles[i].rotateY(rotateY);
      particles[i].rotateX(rotateX);
      particles[i].draw(context, config.perspective);
    }
  }

  function resizeReset() {
    canvasWidth = canvasBody.width = window.innerWidth;
    canvasHeight = canvasBody.height = window.innerHeight;
    console.log(canvasBody.width, canvasBody.height);
  }
}