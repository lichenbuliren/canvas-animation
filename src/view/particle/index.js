import { util, Ball, Particle } from '../../util/';
require('../index.css');

window.onload = function () {
  const canvasBody = document.getElementById("canvas");
  const context = canvasBody.getContext("2d");
  let canvasWidth, canvasHeight;
  let delay = 200, timer;
  const config = {
    particleColor: '#fff',
    lineColor: '#fff',
    particleAmount: 200,
    defaultSpeed: 1,
    variantSpeed: 1, // 用作速度的随机变量
    defaultRadius: 2,
    variantRadius: 1, // 用作半径的随机变量
    linkRadius: 100 // 两点连线距离
  };
  let particles = [];
  canvasBody.style.backgroundColor = '#000';
  resizeReset();
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
    for (var i = 0; i < config.particleAmount; i++) {
      particles.push(new Particle({
        width: canvasWidth,
        height: canvasHeight,
        speed: config.defaultSpeed,
        variantSpeed: config.variantSpeed,
        radius: config.defaultRadius,
        variantRadius: config.variantRadius,
        color: config.particleColor
      }));
    }
    requestAnimationFrame(loop);
  }

  function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(context);
    }

    for (let i = 0; i < particles.length; i++) {
      linkPoints(particles[i], particles);
    }
  }

  function linkPoints(p1, hubs) {
    for (var i = 0; i < hubs.length; i++) {
      let distance = checkDistance(p1, hubs[i]);
      let opacity = 1 - distance / config.linkRadius;
      if (opacity > 0) {
        context.lineWidth = .2;
        context.strokeStyle = config.particleColor;
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(hubs[i].x, hubs[i].y);
        context.closePath();
        context.stroke();
      }
    }
  }

  function checkDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  function resizeReset() {
    canvasWidth = canvasBody.width = window.innerWidth;
    canvasHeight = canvasBody.height = window.innerHeight;
  }
}