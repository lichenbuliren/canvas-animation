class Ball {
  constructor(opts) {
    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.vx = opts.vx || 0;
    this.vy = opts.vy || 0;
    this.radius = opts.radius || 40;
    this.mass = opts.mass || 1;
    this.rotation = opts.rotation || 0;
    this.scaleX = opts.scaleX || 1;
    this.scaleY = opts.scaleY || 1;
    this.color = opts.color || '#ofo';
    this.lineWidth = opts.lineWidth || 1;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.scale(this.scaleX, this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
  }

  getBounds() {
    return {
      x: this.x - this.radius,
      y: this.y - this.radius,
      width: this.radius * 2,
      height: this.radius * 2
    }
  }
}

export default Ball;