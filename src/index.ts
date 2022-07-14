/* eslint-disable n/no-path-concat */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");

const port = process.env.PORT || 3000;
const previousMsg = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("views engine", "html");

app.get("/", (req, res) => {
  res.render("index.html");
});
app.get("/suport", (req, res) => {
  res.render("chat.html");
});

io.on("connection", (socket) => {
  io.emit("previous", previousMsg);
  socket.on("chat", (msg) => {
    io.emit("chat", msg);
    previousMsg.push(msg);
  });
});

server.listen(port, () => {
  console.log(`Server on - PORT: ${port} ✅`);
});
