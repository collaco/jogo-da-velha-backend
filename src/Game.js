const Board = require("./Board.js");
const PlayerComputer = require("./player/PlayerComputer.js");

const StrategyLevel1BeginCenter = require("./strategy/StrategyLevel1BeginCenter.js");
const StrategyLevel1BeginCorner = require("./strategy/StrategyLevel1BeginCorner.js");
const StrategyLevel2 = require("./strategy/StrategyLevel2.js");
const StrategyLevel3 = require("./strategy/StrategyLevel3.js");

const db = require("./db/db.js");

class Game {
  constructor(playerPerson, level) {
    this._playerPerson = playerPerson;
    this._board = new Board();
    this._playerComputer = new PlayerComputer(
      "Computador",
      this.mountSymbolComputer()
    );
    this._level = level;
    this.defineStrategy();
  }

  mountSymbolComputer() {
    return this._board.getOppositeSymbol(this._playerPerson.symbol);
  }

  defineStrategy() {
    this._strategy = null;
    switch (this._level) {
      case 1:
        if (this._board.getCenterCell() == this._playerPerson.symbol) {
          this._strategy = new StrategyLevel1BeginCenter();
        } else {
          this._strategy = new StrategyLevel1BeginCorner();
        }
        break;
      case 2:
        this._strategy = new StrategyLevel2();
        break;
      case 3:
        this._strategy = new StrategyLevel3();
        break;
      default:
        this._strategy = new StrategyLevel1BeginCorner();
    }
    return this._strategy;
  }

  get playerPerson() {
    return this._playerPerson;
  }

  get playerComputer() {
    return this._playerComputer;
  }

  get board() {
    return this._board;
  }

  get level() {
    return this._level;
  }

  set level(level) {
    this_level = level;
  }

  playPerson(row, col) {
    this._board.setCell(row, col, this._playerPerson.symbol);
    db.insertLogPlay(
      {
        playername: this._playerPerson._name,
        play: {
          row: row,
          col: col,
        },
        symbol: this._playerPerson._symbol,
        level: this._level,
        result: this._board.calculateStatus(),
      },
      (err, result) => {
        if (err) {
          return console.log(err);
        }
      }
    );
    this._board.log();
  }

  playComputer() {
    if (
      this._level == 1 &&
      this._board.countSymbol(this._playerPerson.symbol) == 1
    ) {
      this.defineStrategy();
    }

    if (!this._board.isCompleted()) {
      const play = this._strategy.calculatePlay(
        this._board,
        this._playerComputer
      );
      if (play) {
        this._board.setCell(play.row, play.col, this._playerComputer.symbol);
        this._board.log();

        db.insertLogPlay(
          {
            playername: this._playerComputer._name,
            play: play,
            symbol: this._playerComputer._symbol,
            level: this._level,
            result: this._board.calculateStatus(),
          },
          (err, result) => {
            if (err) {
              return console.log(err);
            }
          }
        );
      }
      return play;
    } else {
      return { row: -1, col: -1 };
    }
  }
}

module.exports = Game;
