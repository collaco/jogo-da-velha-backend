const Strategy = require("./Strategy");

class StrategyLevel2 extends Strategy {
  constructor() {
    super();
  }

  calculatePlay(board, player) {
    let p = {
      row: -1,
      col: -1,
    };
    switch (this.getNextPlay(board, player)) {
      case 1:
        p = board.calculateFirstFreeCornerPosition();
        break;
      case 2:
        p = board.calculateFreeCornerPositionToCheckMate(player.symbol);

        if (
          !(p = board.calculateFreeCornerPositionToCheckMate(player.symbol))
        ) {
          p = this.calculateStandardPlay(board, player);
        }
        break;
      case 3:
        if (
          !(p = board.calculateFreeCornerPositionToCheckMate(player.symbol))
        ) {
          p = this.calculateStandardPlay(board, player);
        }
        break;
      default:
        p = this.calculateStandardPlay(board, player);
        break;
    }

    return p;
  }
}

module.exports = StrategyLevel2;
