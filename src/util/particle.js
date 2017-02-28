export class Particle {
  constructor(opt) {
    this.x = opt.x;
    this.y = opt.y;
    this.xpos = this.x;
    this.ypos = this.y;
    this.z = opt.z;
    this.speed = opt.speed + Math.random() * opt.variantSpeed || 0;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opt.color || '#fff';
    this.radius = opt.radius + Math.random() * opt.variantRadius || 4;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
  }

  to2D(perspective) {
    let scale = 1 / (1 + this.zAxis / perspective);
    this.xpos = this.x * scale;
    this.ypos = this.y * scale;
    this.radius = this.radius * scale;
  }

  update(canvas) {
    this.border(canvas);
    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  border(canvas) {
    let ctxWidth = canvas.width, ctxHeight = canvas.height;
    if (this.x >= ctxWidth || this.x <= 0) {
      // 反向
      this.vector.x *= -1;
    }

    if (this.y >= ctxHeight || this.y <= 0) {
      this.vector.y *= -1;
    }

    if (this.x > ctxWidth) this.x = ctxWidth;
    if (this.y > ctxHeight) this.y = ctxHeight;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  }

  draw(canvas) {
    let context = canvas.getContext('2d');
    this.update(canvas);
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }
}