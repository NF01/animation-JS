import Ship from 'class/Ship';
import MainLoop from 'mainloop.js';
import Keyboard from 'class/Keyboard';
import Circle from 'class/Circle';
import {getRandomInt} from 'lib/Math';
import randomColor from 'randomcolor';

let ctx = $("canvas").get(0).getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const ship = new Ship({
  x: ctx.canvas.clientWidth/2,
  y: ctx.canvas.clientHeight/2,
  dir: 1.5 * Math.PI
});

const KEYBOARD  = new Keyboard();
let targets = [];

setInterval(() => {
  let newTarget = new Circle({
    x: getRandomInt(0, ctx.canvas.clientWidth),
    y: getRandomInt(0, ctx.canvas.clientHeight),
    r: 20,
    speed: 0,
    dir: 0,
    color: randomColor()
  });
  let isCollinding = false;
  targets.forEach(target =>{
    if (target.isCollidingWith(newTarget)) {
      isCollinding = true;
    }
  });
  if (!isCollinding) targets.push(newTarget);
}, 1000);

MainLoop
  .setUpdate(dt => {
    if (KEYBOARD.isKeyDown('d')) ship.rotate({dt});
    if (KEYBOARD.isKeyDown('a')) ship.rotate({dt, clockwise: false});
    if (KEYBOARD.isKeyDown('w')) ship.thruster({dt});
    if (KEYBOARD.isKeyDown('s')) ship.thruster({dt, reverse: true});
    ship.applyFriction(dt);
    ship.move(dt);
    let hitBox = ship.getHitbox();
    targets = targets.filter(target => !target.isCollidingWith(hitBox));
  })
  .setDraw(() => {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    targets.forEach(target => target.draw(ctx));
    ship.draw(ctx);
  })
  .start();