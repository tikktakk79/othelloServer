import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://othello.sjoburger.com",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
});

var boardStart = [[0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,1,2,0,0,0],
             [0,0,0,2,1,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0,0]]

var turn = 1

var board = [...boardStart]

io.on("connection", (socket) => {
  socket.emit("board", [board, turn])
  socket.on("update", data => {
    board = data[0] ?? board
    turn = data[1] ?? turn
    console.log("update received")
    socket.emit("board", [board, turn])
  })
  socket.on("requestBoard", () => {
    socket.emit("board", [board, turn])
  })
  socket.on("resetBoard", () => {
    board = [...boardStart]
    socket.emit("board", [board, turn])
  })
})

io.listen(3000);