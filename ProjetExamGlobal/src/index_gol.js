import Automaton from 'class/Automaton/InFlatTorus';
import randomColor from "randomcolor";
import Keyboard from './class/Keyboard';


let gps = 10; // generation per sec
let cellsize = 16; // in pixels
let ctx = $("canvas").get(0).getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;
let width = Math.floor(ctx.canvas.width / cellsize);
let height = Math.floor(ctx.canvas.height / cellsize);

let automaton = new Automaton({width, height, probAlive: 0.6, aliveColor: randomColor()});
let keyboard = new Keyboard();

const tick = () => {
  automaton.applyRules({s: [0, 0, 1, 1, 0, 0, 0, 0, 0]});
  //automaton.flowFieldTo({row: 0, col: 0});
  //console.log(automaton.flowMap);
  automaton.draw({ctx, cellsize, borderSize: 1});
}

let loop = setInterval(tick, 1000 / gps);
//tick();
keyboard.on("p", evt => clearInterval(loop));
