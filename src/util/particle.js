export class Particle {
  constructor(opt) {
    this.ctxWidth = opt.width;
    this.ctxHeight = opt.height;
    this.x = Math.random() * opt.width;
    this.y = Math.random() * opt.height;
    this.speed = opt.speed + Math.random() * opt.variantSpeed;
    this.directionAngle = Math.floor(Math.random() * 360);
    this.color = opt.color;
    this.radius = opt.radius + Math.random() * opt.variantRadius;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed
    };
  }

  update() {
    this.border();
    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  border() {
    if (this.x >= this.ctxWidth || this.x <= 0) {
      // 反向
      this.vector.x *= -1;
    }

    if (this.y >= this.ctxHeight || this.y <= 0) {
      this.vector.y *= -1;
    }

    if (this.x > this.ctxWidth) this.x = this.ctxWidth;
    if (this.y > this.ctxHeight) this.y = this.ctxHeight;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  }

  draw(context) {
    context.save();
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
    context.restore();
  }
}