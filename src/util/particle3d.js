export class Particle3d {
  constructor(opt) {
    this.x = opt.x || 0;
    this.y = opt.y || 0;
    this.z = opt.z || 0;
    this.color = opt.color || '#fff';
    this.radius = opt.radius || 2;
  }

  translate2d(perspective) {
    let scale = 1/(1 + this.z/perspective);
    this.x = (this.x - this.centerX) * scale + centerX;
    this.y = (this.y - this.centerY)* scale + centerY;
    this.radius = this.radius * scale;
  }

  draw(context, perspective) {
    // this.translate2d(perspective);
    context.save();
    context.translate(this.xpos, this.ypos);
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
    context.restore();
  }
}