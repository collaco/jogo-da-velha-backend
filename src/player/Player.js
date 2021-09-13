class Player {
  constructor(name, symbol, socketId) {
    this._name = name;
    this._symbol = symbol;
    this._socketId = socketId;
  }

  get name() {
    return this._name;
  }
  get symbol() {
    return this._symbol;
  }
  get socketId() {
    return this._socketId;
  }
  set symbol(symbol) {
    this._symbol = symbol;
  }
}

module.exports = Player;
