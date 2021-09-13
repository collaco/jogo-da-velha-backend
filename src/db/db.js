var mongoClient = require("mongodb").MongoClient;

var gameDb;

mongoClient
  .connect("mongodb://localhost:27017/jogo-velha", { useNewUrlParser: true })
  .then((conn) => {
    gameDb = conn.db("jogo-velha");
  })
  .catch((err) => console.log(err));

function insertLogPlay(data, callback) {
  gameDb.collection("logplay").insertOne(data, callback);
}

module.exports = { insertLogPlay };
