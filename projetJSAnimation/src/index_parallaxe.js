
// npm run start // ^^ on terminal 

import { add } from 'lib/math';
import { Circle } from 'class/Circle';
import { Keyboard } from 'class/Keyboard';


console.log("test");
// console.log(add(1, 6));



//get 0 = premier des canvas rencontré
let ctx = $("canvas").get(0).getContext("2d");
//ctx = context graphique = canva + des méthode de base
// la taille de dessin = à la taille du dom 
// servent aussi à nettoyer la totalité du canvas
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const KEYBOARD = new Keyboard();


let c1 = new Circle(10, 10, 20, "red");
let c2 = new Circle({ x: 50, y: 50, speed: 0, r: 20, dir: Math.PI/2.5, color: "blue" });

console.log(c1);
console.log(c2);

let lasttime = 0;

//boucle d'animation "the loop"
const tick = (time) => {
    requestAnimationFrame(tick);
    const dt = time - lasttime;
    lasttime = time;
    c2.setSpeed(0);
    if (dt >= 1000 / 30) return; //pour dropper les frames
    if (KEYBOARD.isKeyDown("w")) {
        c2.setSpeed(0.1);
        c2.setDir(3/2 * Math.PI);
    }
    if (KEYBOARD.isKeyDown("s")) {
        c2.setSpeed(0.1);
        c2.setDir(1/2 * Math.PI);
    }
    if (KEYBOARD.isKeyDown("d")) {
        c2.setSpeed(0.1);
        c2.setDir(0);
    }
    if (KEYBOARD.isKeyDown("r")) {
        c2.setSpeed(0.1);
        c2.setDir(-1 * Math.PI);
    }
    c2.move(dt);
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    c2.draw(ctx);
}

requestAnimationFrame(tick);//tourner en 60fps