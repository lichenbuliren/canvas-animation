import { util, Particle3d } from '../../util/';
require('../index.css');

window.onload = function () {
  const canvasBody = document.getElementById("canvas");
  const context = canvasBody.getContext("2d");
  let particles = [], canvasWidth, canvasHeight, centerX, centerY;
  let delay = 200, timer;
  canvasWidth = canvasBody.width = window.innerWidth;
  canvasHeight = canvasBody.height = window.innerHeight;
  canvasWidth = canvasBody.width, canvasHeight = canvasBody.height;
  centerX = canvasWidth/2, centerY = canvasHeight/2;
  const config = {
    particleColor: '#fff',
    lineColor: '#fff',
    particleAmount: 100,
    defaultRadius: 4,
    perspective: 400, //视距
    sphereRadius: 200 //球体半径
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
    for (var i = 0; i < config.particleAmount; i++) {
      particles.push(new Particle3d({
        x: util.getRandom(0, canvasWidth),
        y: util.getRandom(0, canvasHeight),
        z: util.getRandom(-2000, config.perspective),
        centerX: centerX,
        centerY: centerY,
        radius: config.defaultRadius,
        color: config.particleColor,
        perspective: config.perspective
      }));
      
    }
    requestAnimationFrame(loop);
  }
  console.log(particles);

  function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    for (var i = 0; i < particles.length; i++) {
      particles[i].draw(context, config.perspective);
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
    console.log(canvasBody.width, canvasBody.height);
  }
}