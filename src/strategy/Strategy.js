class Strategy {
  constructor() {
    this._board = ["X", "O"];

    if (!this.calculatePlay) {
      throw new Error("Strategy's must have play!");
    }
  }

  getNextPlay(board, player) {
    return board.countSymbol(player.symbol) + 1;
  }

  calculateStandardPlay(board, player) {
    let position = null;
    if (
      (position = board.calculateFreePositionToVictory(player.symbol)) ||
      (position = board.calculateFreePositionToCheckMate(player.symbol)) ||
      (position = board.calculateFirstFreePosition(player.symbol))
    ) {
      return position;
    }
    return null;
  }
}
module.exports = Strategy;
