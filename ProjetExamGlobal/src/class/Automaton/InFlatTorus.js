import Automaton from 'class/Automaton';
import {moduloEuclidian} from 'lib/Math';

export default class extends Automaton {

  countAliveMooreNeighborhood({row, col, chebyshevDistance = 1}) {
    let startRow = row - chebyshevDistance;
    let endRow = row + chebyshevDistance;
    let startCol = col - chebyshevDistance;
    let endCol = col + chebyshevDistance;
    let alive = 0;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        if (this.grid[moduloEuclidian(r, this.height)][moduloEuclidian(c, this.width)]) alive++;
      }
    }
    return alive;
  }

}