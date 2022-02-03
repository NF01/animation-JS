import Circle from 'class/Circle';

export default class extends Circle {

  move(deltaT, width, height) {
    super.move(deltaT);

    if (this.x - this.r > width) {
      this.x = 0 - this.r;
    } else if (this.x < 0 - this.r) {
      this.x = width + this.r;
    }
    if (this.y - this.r > height) {
      this.y = 0 - this.r;
    } else if (this.y < 0 - this.r) {
      this.y = height + this.r;
    }
  }

}