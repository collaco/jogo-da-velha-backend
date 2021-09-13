const Player = require("./Player");

class PlayerPerson extends Player {
  constructor(name, symbol, socketId) {
    super(name, symbol);
    this._socketId = socketId;
  }

  get socketId() {
    return this._socketId;
  }
}

module.exports = PlayerPerson;
