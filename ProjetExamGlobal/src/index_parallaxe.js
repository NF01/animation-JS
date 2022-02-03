import {getRandomInt} from 'lib/math';
import Circle from 'class/Circle/InFlatTorus';
import Keyboard from 'class/Keyboard';
import randomColor from "randomcolor";

let ctx = $("canvas").get(0).getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const KEYBOARD  = new Keyboard();

const getAngleFromKeyPressed = () => {
  if (KEYBOARD.isKeysDown('a', 'w')) return Math.PI * 0.25;
  if (KEYBOARD.isKeysDown('a', 's')) return Math.PI * 1.75;
  if (KEYBOARD.isKeysDown('d', 'w')) return Math.PI * 0.75;
  if (KEYBOARD.isKeysDown('d', 's')) return Math.PI * 1.25;
  if (KEYBOARD.isKeyDown('s')) return Math.PI * 1.5;
  if (KEYBOARD.isKeyDown('d')) return Math.PI;
  if (KEYBOARD.isKeyDown('w')) return Math.PI * 0.5;
  if (KEYBOARD.isKeyDown('a')) return 0;
  return false;
}

let circles = [];

for (let i = 0; i < 300; i++) {
  let r = getRandomInt(3, Math.max(i / 8, 3));
  circles.push(new Circle({
    x: getRandomInt(0, ctx.canvas.width),
    y: getRandomInt(0, ctx.canvas.height),
    speed: r / 100, // [pixel / ms]
    r: r,
    dir: 0, // radian
    color: randomColor()
  }));
}
circles.sort((c1, c2) => c1.compareTo(c2));


let lastTime = 0;

const tick = (time) => {
  // gestion du temps d'animation
  requestAnimationFrame(tick);
  const dt = time - lastTime;
  console.log(dt);
  lastTime = time;
  if (dt >= 1000/30) return;

  // Gestion des entrées
  let angle = getAngleFromKeyPressed();

  // mise à jour du monde
  if (angle !== false) {
    circles.forEach(c => c.setDir(angle));
    circles.forEach(c => c.move(dt, ctx.canvas.width, ctx.canvas.height));
  }

  // dessin
  ctx.canvas.width = ctx.canvas.clientWidth;
  ctx.canvas.height = ctx.canvas.clientHeight;
  circles.forEach(c => c.draw(ctx));
}

requestAnimationFrame(tick);