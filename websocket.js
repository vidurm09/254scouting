var ws = require('nodejs-websocket');
var config = require('./config')
var connection = "";
var server = ws.createServer(function (conn) {
  conn.on("text", function (str) {
      console.log("Received "+str)
      conn.sendText(str.toUpperCase()+"!!!")
  })
  conn.on("close", function (code, reason) {})
}).listen(config.websocket.port);

exports.server = server;
