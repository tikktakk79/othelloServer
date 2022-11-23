"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
var _http = require("http");
var _socket = require("socket.io");
const httpServer = (0, _http.createServer)();
const io = new _socket.Server(httpServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
});
var boardStart = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 1, 2, 0, 0, 0], [0, 0, 0, 2, 1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]];
var turn = 1;
var board = [...boardStart];
io.on("connection", socket => {
  socket.emit("board", [board, turn]);
  socket.on("update", data => {
    var _data$, _data$2;
    board = (_data$ = data[0]) !== null && _data$ !== void 0 ? _data$ : board;
    turn = (_data$2 = data[1]) !== null && _data$2 !== void 0 ? _data$2 : turn;
    console.log("update received");
    socket.emit("board", [board, turn]);
  });
  socket.on("requestBoard", () => {
    socket.emit("board", [board, turn]);
  });
  socket.on("resetBoard", () => {
    board = [...boardStart];
    socket.emit("board", [board, turn]);
  });
});
console.log("Kom hit")
io.listen(3000);