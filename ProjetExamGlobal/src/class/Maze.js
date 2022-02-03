import Automaton from 'class/Automaton.js';
import { getRandomInt } from 'lib/Math';

export default class extends Automaton {

    constructor({ width, height, player = { row: 0, col: 0 }, target = { row: 10, col: 10 }, probAlive = 1, aliveColor = "black", deadColor = "white" }) {
        super({ width, height, probAlive, aliveColor, deadColor });
        this.player = player;
        this.player.row = getRandomInt(0, height);
        this.player.col = getRandomInt(0, width);
        this.target=target;
        this.target.row = getRandomInt(0, height);
        this.target.col = getRandomInt(0, width);



    }

    generateMaze(probAlive) {
        // super.randomize(probAlive);

        // I tried, hooo I tried...
        for (let row = 0; row < this.height; row = row + 2) {
            for (let col = 0; col < this.width; col = col + 2) {
                this.grid[row][col] = false;
                let randomNumber = getRandomInt(0, 1);
                if (randomNumber == 1) {
                    if (this.grid[row][col - 1] == !"undefined") {
                        this.grid[row][col - 1] = false;
                    }

                } else {
                    if (this.grid[row][col - 1] == !"undefined") {
                        this.grid[row - 1][col] = false;
                    };
                }


            }
        }
    }


    drawPlayer({ ctx, cellsize, borderSize = 1 }) {
        ctx.fillStyle = "red";
        ctx.fillRect(
            this.player.col * cellsize + borderSize, this.player.row * cellsize + borderSize,
            cellsize - borderSize, cellsize - borderSize
        );
    }


    drawTarget({ ctx, cellsize, borderSize = 1 }) {
        ctx.fillStyle = "Yellow";
        ctx.fillRect(
            this.target.col * cellsize + borderSize, this.target.row * cellsize + borderSize,
            cellsize - borderSize, cellsize - borderSize
        );
    }

    movePlayer(dir) {
        if (dir == 1) {
            if (this.grid[this.player.row - 1][this.player.col]) {
                this.player.row = this.player.row - 1
            }
        }
        if (dir == 2) {
            if (this.grid[this.player.row][this.player.col - 1]) {
                this.player.col = this.player.col - 1
            }
        }
        if (dir == 3) {
            if (this.grid[this.player.row + 1][this.player.col]) {
                this.player.row = this.player.row + 1
            }

        }
        if (dir == 4) {
            if (this.grid[this.player.row][this.player.col + 1]) {
                this.player.col = this.player.col + 1
            }


        }


    }







}

