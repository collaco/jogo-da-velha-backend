const express = require("express");
const app = express();
const server = require("http").createServer(app).listen(3000);
const io = require("socket.io")(server);

const PlayerPerson = require("./src/player/PlayerPerson.js");
const Game = require("./src/Game.js");

let currentGame;
let currentSocket;
let level = 1;

io.on("connection", (socket) => {
  let id = socket.id;
  console.log(`Socket conectado: ${id}`);

  currentSocket = socket;

  socket.on("start-game", (data) => {
    console.log("Jogo Iniciado", data);
    level = 1;
    currentSocket.emit("update-level", level);
    console.log("Nivel: " + level);

    const player = new PlayerPerson(data.name, data.symbol, socket.id);
    currentGame = new Game(player, level);
  });

  socket.on("next-level-game", (data) => {
    console.log("Jogo Iniciado", data);
    level = level < 3 ? level + 1 : 1;
    currentSocket.emit("update-level", level);
    console.log("Nivel: " + level);

    const player = new PlayerPerson(data.name, data.symbol, socket.id);
    currentGame = new Game(player, level);
    currentSocket.emit("update-level", level);
    if (level > 1) {
      const play = currentGame.playComputer();
      currentSocket.emit("new-play", play);
    }
  });

  socket.on("new-play", (data) => {
    currentGame.playPerson(data.row, data.col);
    const play = currentGame.playComputer();
    currentSocket.emit("new-play", play);
  });

  socket.on("disconnect", (data) => {
    console.log(`Socket desconectado: ${id}`);
  });
});
