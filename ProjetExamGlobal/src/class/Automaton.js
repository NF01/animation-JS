export default class {

  constructor({width, height, probAlive = 0.5, aliveColor = "red", deadColor = "black"}) {
    this.grid = [];
    this.width = width;
    this.height = height;
    this.aliveColor = aliveColor;
    this.deadColor = deadColor;
    this.randomize(probAlive);
  }

  countAliveMooreNeighborhood({row, col, chebyshevDistance = 1}) {
    let startRow = Math.max(0, row - chebyshevDistance);
    let endRow = Math.min(row + chebyshevDistance, this.height - 1);
    let startCol = Math.max(0, col - chebyshevDistance);
    let endCol = Math.min(col + chebyshevDistance, this.width - 1);
    let alive = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        if (this.grid[r][c]) alive++;
      }
    }
    return alive;
  }

  applyRules({
    b = [0, 0, 0, 1, 0, 0, 0, 0, 0],
    s = [0, 0, 1, 1, 0, 0, 0, 0, 0]
  } = {}) {
    let nextGen = [];
    for (let row = 0; row < this.height; row++) {
      nextGen[row] = [];
    }

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let alive = this.countAliveMooreNeighborhood({row, col});
        if (this.grid[row][col]) {
          // (alive1 - 1 == 2 || alive2 - 1 == 3)
          nextGen[row][col] = s[alive - 1];
        } else {
          nextGen[row][col] = b[alive];
        }
      }
    }

    this.grid = nextGen;
  }

  draw({ctx, cellsize, borderSize = 1}) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        ctx.fillStyle =  this.grid[row][col] ? this.aliveColor : this.deadColor;
        ctx.fillRect(
          col * cellsize + borderSize, row * cellsize + borderSize,
          cellsize - borderSize, cellsize - borderSize
        );
      }
    }
  }

  randomize(probAlive) {
    // Matrix creation
    for (let row = 0; row < this.height; row++) {
      this.grid[row] = [];
    }
    // Matrix population
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.grid[row][col] = Math.random() < probAlive;
      }
    }
  }

  initFlowMap() {
    this.flowMap = [];
    // Matrix creation
    for (let row = 0; row < this.height; row++) {
      this.flowMap[row] = [];
    }
    // Matrix population
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.flowMap[row][col] = false;
      }
    }
  }

  flowFieldTo({row, col, allowDiag = true}) {
    this.initFlowMap();
    let frontier = [];
    frontier.push({row, col});
    this.flowMap[row][col] = {row, col};
    while (frontier.length > 0) {
      let current = frontier.shift();
      this.getWalkableNeighbors({
        row: current.row,
        col: current.col,
        allowDiag
      }).forEach(next => {
        if (this.flowMap[next.row][next.col] === false) {
          frontier.push(next);
          this.flowMap[next.row][next.col] = {row: current.row, col: current.col};
        }
      });
    }
    this.flowMap[row][col] = false; // the destination is the final step
  }

  getWalkableNeighbors({row, col}) {
    let neighbors =  [
      {row: row, col: col - 1},
      {row: row, col: col + 1},
      {row: row + 1, col: col},
      {row: row - 1, col: col},
    ];
    neighbors = neighbors.filter(pos => this.isValidPos(pos)
                && this.grid[pos.row][pos.col]);
    return neighbors;
  }

  isValidPos({row, col}) {
    return row >= 0 && row < this.height
        && col >= 0 && col < this.width;
  }

}