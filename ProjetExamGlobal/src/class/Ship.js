import Circle from 'class/Circle';

export default class {

  constructor({x, y, dir = 0, speed = 0.1, turnSpeed = 0.005, acceleration = 0.0005, size = 20, maxSpeed = 0.5, friction = 0.0001}) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.size = size;
    this.turnSpeed = turnSpeed;
    this.speed = speed;
    this.acceleration = acceleration;
    this.maxSpeed = maxSpeed;
    this.friction = friction;
  }

  draw(ctx) {
    ctx.font = `${this.size}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.translate(this.x, this.y);
    ctx.rotate(this.dir + Math.PI / 4);
    ctx.fillText('🚀', 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  move(dt) {
    let distX = this.speed * dt * Math.cos(this.dir);
    let distY = this.speed * dt * Math.sin(this.dir);
    this.x += distX;
    this.y += distY;
  }

  rotate({dt, clockwise = true}) {
    const turnRad = this.turnSpeed * dt;
    if (clockwise) {
      this.dir += turnRad;
    } else {
      this.dir -= turnRad;
    }
  }

  thruster({dt, reverse = false}) {
    let speedIncDec = this.acceleration * dt;
    if (reverse) {
      this.speed -= speedIncDec;
    } else {
      this.speed += speedIncDec;
    }
    this.speed = Math.max(0, this.speed);
    this.speed = Math.min(this.maxSpeed, this.speed);
  }

  applyFriction(dt) {
    let speedDec = this.friction * dt;
    this.speed -= speedDec;
    this.speed = Math.max(0, this.speed);
  }

  getHitbox() {
    return new Circle({
      x: this.x,
      y: this.y,
      r: this.size/1.5,
      speed: 0,
      dir: 0,
      color: "red"
    });
  }


};