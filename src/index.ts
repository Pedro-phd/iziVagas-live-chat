/* eslint-disable n/no-path-concat */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});
app.get("/chat", (req, res) => {
  res.sendFile(__dirname + "/pages/chat.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3001, () => {
  console.log("Server on - PORT: 3001 ✅");
});
