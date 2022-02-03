import Circle from 'class/Circle';

export default class extends Circle {

    constructor({x, y, r=3,angle, speed=0.3, color=null}){
        super({x, y, r, speed, color})
        this.angle=angle;
    }


move(deltaT) {
    super.move(deltaT)
    let distX = this.speed * deltaT * Math.cos(this.angle);
    let distY = this.speed * deltaT * Math.sin(this.angle);
    this.x += distX;
    this.y += distY; 
  }

}