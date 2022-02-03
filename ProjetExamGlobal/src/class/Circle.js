export default class {

  constructor({x, y, r, speed=0.2, dir=1.5, color="red"}) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.speed = speed;
    this.dir = dir; // radian
  }

  getRadius() {
    return this.r;
  }

  setSpeed(speed){
    this.speed = speed;
  }

  setColor(color){
    this.color = color;
  }

  setDir(dir){
    this.dir = dir;
  }

  compareTo(otherCircle) {
    return this.getRadius() - otherCircle.getRadius();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  move(deltaT) {
    let distX = this.speed * deltaT * Math.cos(this.dir);
    let distY = this.speed * deltaT * Math.sin(this.dir);
    this.x += distX;
    this.y += distY;
  }

  isCollidingWith(c) {
    return Math.pow(c.x - this.x, 2) + Math.pow(c.y - this.y, 2) <= Math.pow(this.r + c.r, 2);
  }

}