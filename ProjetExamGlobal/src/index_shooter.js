import MainLoop from 'mainloop.js';
import Shooter from './class/Shooter.js';
import Keyboard from './class/Keyboard';
import Circle from './class/Circle';
import Bullet from 'class/Circle/Bullet';
import { getRandomInt } from 'lib/Math';


let ctx = $("canvas").get(0).getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const KEYBOARD = new Keyboard();

let myshooter = new Shooter({
    x: ctx.canvas.clientWidth / 2,
    y: ctx.canvas.clientHeight,
    r: 30,
    angle: 5
})



let targets = [];

setInterval(() => {
    let newTarget = new Circle({
        x: getRandomInt(0, ctx.canvas.clientWidth),
        y: 0,
        r: 20
    })
    targets.push(newTarget);

}, 1000);





MainLoop
    .setUpdate(() => {
        if (KEYBOARD.isKeyDown('a')) myshooter.turn(-10);
        if (KEYBOARD.isKeyDown('d')) myshooter.turn(10);
        if (KEYBOARD.isKeyDown(' ')) myshooter.fire();
        targets.forEach(target => target.move(5));


    })
    .setDraw(() => {
        ctx.canvas.width = ctx.canvas.clientWidth;
        ctx.canvas.height = ctx.canvas.clientHeight;
        myshooter.draw(ctx);
        targets.forEach(target => target.draw(ctx));



    })
    .start();



