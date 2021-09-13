var _ = require("lodash");

class Board {
  constructor() {
    this._cells = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    this._symbols = ["X", "O"];
  }

  get symbols() {
    return this._symbols;
  }

  getCell(row, col) {
    return this._cells[row][col];
  }

  setCell(row, col, symbol) {
    this._cells[row][col] = symbol;
  }

  getCells() {
    return this._cells;
  }

  isBusyCell(row, col) {
    return this._cells[row][col] !== "";
  }

  getCenterCell() {
    const p = this.getCenterPosition();
    return this.getCell(p.row, p.col);
  }

  /*
   * Row
   */

  countSymbolByRow(row, symbol) {
    return this.countSymbolInRowByCells(this._cells, row, symbol);
  }

  countEmptyInRow(row) {
    return this.countSymbolInRowByCells(this._cells, row);
  }

  countSymbolInRowByCells(cells, row, symbol) {
    return cells[row].filter(v => v == symbol).length;
  }

  countEmptyInRowByCells(cells, row) {
    return cells[row].filter(v => v == '').length;
  }
  

  /*
   * Column
   */

  getListColByCells(cells, col) {
    return [cells[0][col], cells[1][col], cells[2][col]];
  }

  /*
   * Resultado
   */

  getAllVictoryPossible() {
    return this.getAllVictoryPossibleByCells(this._cells);
  }

  getAllVictoryPossibleByCells(cells) {
    return [
      // rows
      [cells[0][0], cells[0][1], cells[0][2]],
      [cells[1][0], cells[1][1], cells[1][2]],
      [cells[2][0], cells[2][1], cells[2][2]],
      // columns
      [cells[0][0], cells[1][0], cells[2][0]],
      [cells[0][1], cells[1][1], cells[2][1]],
      [cells[0][2], cells[1][2], cells[2][2]],
      // diagonal
      [cells[0][0], cells[1][1], cells[2][2]],
      [cells[0][2], cells[1][1], cells[2][0]],
    ];
  }

  calculateCheckMateByCells(cells, symbol) {
    const list = this.getAllVictoryPossibleByCells(cells);
    if (
      this.calculateCheckMate(symbol, list[0]) ||
      this.calculateCheckMate(symbol, list[1]) ||
      this.calculateCheckMate(symbol, list[2]) ||
      this.calculateCheckMate(symbol, list[3]) ||
      this.calculateCheckMate(symbol, list[4]) ||
      this.calculateCheckMate(symbol, list[5]) ||
      this.calculateCheckMate(symbol, list[6]) ||
      this.calculateCheckMate(symbol, list[7])
    ) {
      return true;
    }
    return false;
  }

  isVictory(symbol) {
    return this.calculateVictoryByCells(this._cells, symbol);
  }

  hasVictory() {
    return this.isVictory(this._symbols[0]) || this.isVictory(this._symbols[1]);
  }

  isTie() {
    return this.isCompleted() && !this.hasVictory();
  }

  calculateStatus() {
    if (this.isVictory(this._symbols[0])) {
      return this._symbols[0] + " Venceu";
    } else if (this.isVictory(this._symbols[1])) {
      return this._symbols[1] + " Venceu";
    } else if (this.isCompleted()) {
      return "Empate";
    }
  }

  calculateVictoryByCells(cells, symbol) {
    const list = this.getAllVictoryPossibleByCells(cells);
    if (
      this.calculateVictory(symbol, list[0]) ||
      this.calculateVictory(symbol, list[1]) ||
      this.calculateVictory(symbol, list[2]) ||
      this.calculateVictory(symbol, list[3]) ||
      this.calculateVictory(symbol, list[4]) ||
      this.calculateVictory(symbol, list[5]) ||
      this.calculateVictory(symbol, list[6]) ||
      this.calculateVictory(symbol, list[7])
    ) {
      return true;
    }
    return false;
  }

  calculateCheckMate(symbol, list) {
    let countSymbol = 0;
    let countEmpty = 0;
    list.forEach((v) => {
      if (v == symbol) {
        countSymbol++;
      } else if (v == "") {
        countEmpty++;
      }
    });
    return countSymbol == 2 && countEmpty == 1;
  }

  calculateVictory(symbol, list) {
    let countSymbol = 0;
    list.forEach((v) => {
      if (v == symbol) {
        countSymbol++;
      }
    });
    return countSymbol === 3;
  }

  countSymbol(symbol) {
    let count = 0;
    [0, 1, 2].forEach((row) => {
      count += this.countSymbolByRow(row, symbol);
    });
    return count;
  }

  getDataByCol(col) {
    let arrCol = [];
    [0, 1, 2].forEach((row) => {
      arrCol.push();
    });

    return [this._cells[0][col]];
  }

  getOppositeSymbol(mySymbol) {
    return mySymbol == this._symbols[0] ? this._symbols[1] : this._symbols[0];
  }

  isCompleted() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (!this.isBusyCell(row, col)) {
          return false;
        }
      }
    }
    return true;
  }

  reset() {
    this._cells = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  calculateFreePositionToVictory(symbol) {
    const list = this.calculateFreePositions();    
    for (let p of list) {    
      if (this.calculateVictorySimulation(symbol, p)) {
        return p;
      }
    }
    return null;
  }

  calculateFreePositionToCheckMate(symbol) {
    const list = this.calculateFreePositions();
    for (let p of list) {
      if (this.calculateCheckMateSimulation(symbol, p)) {
        return p;
      }
    }
    return null;
  }

  calculateFreeCornerPositionToCheckMate(symbol) {
    const list = this.calculateFreeCornerPositions();
    for (let p of list) {
      if (this.calculateCheckMateSimulation(symbol, p)) {
        return p;
      }
    }
    return null;
  }

  calculateFreeMiddlePositionToCheckMate(symbol) {
    const list = this.calculateFreeMiddlePositions();
    for (let p of list) {
      if (this.calculateCheckMateSimulation(symbol, p)) {
        return p;
      }
    }
    return null;
  }

  calculateCheckMateSimulation(symbol, positionSimuation) {
    const cells = _.cloneDeep(this._cells, true);
    cells[positionSimuation.row][positionSimuation.col] = symbol;
    return this.calculateCheckMateByCells(cells, symbol);
  }

  calculateVictorySimulation(symbol, positionSimuation) {
    const cells = _.cloneDeep(this._cells, true);
    cells[positionSimuation.row][positionSimuation.col] = symbol;
    return this.calculateVictoryByCells(cells, symbol);
  }

  calculateFirstFreePosition() {
    return this.calculeteFirstFreePositionInList(this.getAllPositions());
  }

  calculateFirstFreeMiddlePosition() {
    return this.calculeteFirstFreePositionInList(this.getMiddlePositions());
  }

  calculateFirstFreeCornerPosition() {
    return this.calculeteFirstFreePositionInList(this.getCornerPositions());
  }

  calculeteFirstFreePositionInList(list) {
    for (let p of list) {
      if (!this.isBusyCell(p.row, p.col)) {
        return p;
      }
    }
    return null;
  }

  getMiddlePositions() {
    return [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 2, col: 1 },
    ];
  }

  getCenterPosition() {
    return { row: 1, col: 1 };
  }

  getCornerPositions() {
    return [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 },
    ];
  }

  getAllPositions() {
    return [
      ...this.getCornerPositions(),
      ...this.getMiddlePositions(),
      ...[this.getCenterPosition()],
    ];
  }

  calculateFreePositions() {
    return this.calculeteFreePositionsInList(this.getAllPositions());
  }

  calculateFreeMiddlePositions() {
    return this.calculeteFreePositionsInList(this.getMiddlePositions());
  }

  calculateFreeCornerPositions() {
    return this.calculeteFreePositionsInList(this.getCornerPositions());
  }

  calculeteFreePositionsInList(list) {
    let newList = [];
    for (let p of list) {
      if (!this.isBusyCell(p.row, p.col)) {
        newList.push(p);
      }
    }
    return newList;
  }

  log() {
    console.log(this._cells);
  }
}

module.exports = Board;
