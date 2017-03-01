export class Particle3d {
  constructor(opt) {
    this.x = opt.x || 0;
    this.y = opt.y || 0;
    this.z = opt.z || 0;
    this.color = opt.color || '#fff';
    // 三维球体半径
    this.ballR = opt.ballR;
    // 粒子半径
    this.r = opt.r || 2;
    this.vpX = opt.vpX;
    this.vpY = opt.vpY;

    // 三维坐标投影二维坐标
    this.x2 = undefined;
    this.y2 = undefined;
    this.r2 = undefined;
  }

  translate2d(perspective) {
    let scale = 1 / (1 + this.z / perspective);
    this.x2 = this.x * scale;
    this.y2 = this.y * scale;
    this.r2 = this.r * scale;
  }

  rotateY(angle) {
    var cosy = Math.cos(angle);
    var siny = Math.sin(angle);
    var x1 = this.x * cosy - this.z * siny;
    var z1 = this.z * cosy + this.x * siny;
    this.x = x1;
    this.z = z1;
  }

  rotateX(angle) {
    var cosx = Math.cos(angle);
    var sinx = Math.sin(angle);
    var y1 = this.y * cosx - this.z * sinx;
    var z1 = this.z * cosx + this.y * sinx;
    this.y = y1;
    this.z = z1;
  }

  rotateZ(angle) {
    var cosz = Math.cos(angle);
    var sinz = Math.sin(angle);
    var x1 = this.x * cosz - y * sinz;
    var y1 = this.y * cosz + x * sinz;
    this.x = x1;
    this.y = y1;
  }

  draw(context, perspective) {
    context.save();
    context.translate(this.vpX, this.vpY);
    this.translate2d(perspective);
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x2, this.y2, this.r2, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.restore();
  }
}