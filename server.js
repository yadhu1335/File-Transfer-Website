const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);
let Rooms = {};
// let socket_room_id_map =
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "index.html"));
});

app.get("/room/:room_id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "room.html"));
});

app.get("/ping", (req, res) => {
  console.log(`Ping recieved`);
  res.sendStatus(200); // Respond with HTTP status 200 (OK)
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);
  io.to(socket.id).emit("socketid", socket.id);

  socket.on("create room", (room_id) => {
    console.log(`Room ${room_id} created`);
    Rooms[room_id] = {
      socketidmap: {},
      username: [],
      usercount: 0,
    };
  });

  socket.on("join room", (room_id, username) => {
    if (!Rooms[room_id]) {
      io.to(socket.id).emit("no room");
      console.log(`${room_id} does not exist`);
      console.log(`Rooms=${JSON.stringify(Rooms)}`);
      return;
    }
    Rooms[room_id].socketidmap[username] = socket.id;
    console.log(`${username} joined ${room_id}`);
    console.log(`Rooms=${JSON.stringify(Rooms)}`);
    Rooms[room_id].usercount += 1;
  });

  socket.on("working", () => {
    console.log(`Workingbgjfkjnbgjfkdjcnbjv`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} left`);
  });
});
server.listen(PORT, () =>
  console.log(`Server is up and running on port: http://localhost:${PORT}`)
);
