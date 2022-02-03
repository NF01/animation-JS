import Keyboard from 'class/Keyboard';
import Maze from 'class/Maze';
import MainLoop from 'mainloop.js';
import { getRandomInt } from 'lib/Math';



let ctx = $("canvas").get(0).getContext("2d");
ctx.canvas.width = ctx.canvas.clientWidth;
ctx.canvas.height = ctx.canvas.clientHeight;

const KEYBOARD = new Keyboard();

const cellsize = 20;
const width = Math.floor(ctx.canvas.width / cellsize);
const height = Math.floor(ctx.canvas.height / cellsize);

const maze = new Maze({ width, height });
maze.generateMaze(0.6);


MainLoop
  .setSimulationTimestep(80)
  .setUpdate(dt => {
    if (KEYBOARD.isKeyDown('w')) maze.movePlayer(1);
    if (KEYBOARD.isKeyDown('a')) maze.movePlayer(2);
    if (KEYBOARD.isKeyDown('s')) maze.movePlayer(3);
    if (KEYBOARD.isKeyDown('d')) maze.movePlayer(4);
  })
  .setDraw(() => {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;
    maze.draw({ ctx, cellsize, borderSize: 1.5 });
    maze.drawPlayer({ ctx, cellsize, borderSize: 1.5 });
    maze.drawTarget({ ctx, cellsize, borderSize: 1.5 })
  })
  .start();
