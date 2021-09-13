const StrategyEnum = require("./strategyEnum.js");

const StrategyLevel1BeginCenter = require("./StrategyLevel1BeginCenter.js");
const StrategyLevel1BeginCorner = require("./StrategyLevel1BeginCorner.js");
const StrategyLevel2 = require("./StrategyLevel2.js");
const StrategyLevel3 = require("./StrategyLevel3.js");

class Play {
  constructor(strategyType, game, player) {
    this._strategy = null;
    switch (strategyType) {
      case StrategyEnum.NIVEL1.BEGIN_CORNER:
        this._strategy = new StrategyLevel1BeginCorner();
        break;
      case StrategyEnum.NIVEL1.BEGIN_CENTER:
        this._strategy = new StrategyLevel1BeginCenter();
        break;
      case StrategyEnum.NIVEL2:
        this._strategy = new StrategyLevel2();
        break;
      case StrategyEnum.NIVEL3:
        this._strategy = new StrategyLevel3();
        break;
      default:
        this._strategy = StrategyLevel1BeginCorner();
    }
  }

  setStrategy(strategy) {
    this._strategy = strategy;
  }

  playPeace() {
    this._strategy.play(this);
  }
}
module.exports = Play;
