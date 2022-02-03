import Bullet from 'class/Circle/Bullet';

export default class {

    constructor({ x, y, r, turnSpeed = 0.003, fireRate = 2, color = "yellow" }) {
        this.x = x;
        this.y = y;
        this.angle = 1.5 * Math.PI;
        this.r = r;
        this.x2 = this.x + 2 * this.r * Math.cos(this.angle);
        this.y2 = this.y + 2 * this.r * Math.sin(this.angle);
        this.turnSpeed = turnSpeed;
        this.fireRate = fireRate;
        this.color = color;

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }

    turn(dt, clockwise = true) {
        let turnRad = this.turnSpeed * dt;
        if (clockwise) {
            this.angle += turnRad;
        } else {
            this.angle -= turnRad;
        }
        this.angle = Math.min(this.angle, 2 * Math.PI);
        this.angle = Math.max(this.angle, Math.PI);
        this.x2 =this.x + 2 * this.r * Math.cos(this.angle);
        this.y2 = this.y + 2 * this.r * Math.sin(this.angle);
      }

      
    fire() {
        let bullet1=new Bullet({
            x: this.x2,
            y: this.y2,
            r: this.r,
            angle: this.angle
        });
        
      }



}