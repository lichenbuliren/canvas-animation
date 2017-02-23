import util from './util';
import './index.css';

window.onload = function () {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  canvas.style.backgroundColor = '#000';
  console.log(canvas);
}