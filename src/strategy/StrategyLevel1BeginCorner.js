const Strategy = require("./Strategy");

class StrategyLevel1BeginCorner extends Strategy {
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
        if (
          !(p = board.calculateFreeMiddlePositionToCheckMate(player.symbol))
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

module.exports = StrategyLevel1BeginCorner;
