export class Circle {


    constructor({x, y, r, speed, dir, color}) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.speed = speed;
        this.dir = dir;
    }


    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.borderColor;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.closePath();
        ctx.fill();
    }


    move(deltaT) {
        let distX = this.speed * deltaT * Math.cos(this.dir);
        let distY = this.speed * deltaT * Math.sin(this.dir);
        this.x += distX;
        this.y += distY;
    }


    setSpeed(speed){
        this.speed=speed;
    }

    setDir(dir){
        this.dir=dir;
    }





}