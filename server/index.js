import express from 'express';
import { Server } from 'socket.io';

const connections = new Map();
const app = express();

const server = app.listen(3030, () => {
  console.log("Server is running on port 3030");
});

app.listen();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  },
  allowEIO3: true
});

io.on('connection', (socket) => {
  console.log(`Made socket connection, id: ${socket.id}`);

  socket.on("join-room", (roomID, UserID) => {
    socket.join(roomID);
    const connection = connections.get(roomID) || { roomID, users: [] };
    if (connection.users.indexOf(UserID) === -1) {
      connection.users.push(UserID);
      connections.set(roomID, connection);
      connections.forEach((v, k) => {
      });
      io.in(roomID).emit("user-joined", connection.users);
    }
  })

  socket.on('change-duration', (roomID, duration) => {
    io.in(roomID).emit('broadcast-duration', duration);
  })

  socket.on('video-playing-state', (roomID, isPlaying) => {
    if (isPlaying) {
      console.log("playing: " + isPlaying);
    } else {
      console.log("not playing: " + isPlaying);
    }
    io.in(roomID).emit('broadcast-video-playing-state', isPlaying);
  })

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  socket.on('disconnect', () => {
    if (connections.size !== 0) {
      connections.forEach((v, k) => {
        const i = v.users.indexOf(socket.id);
        if (i != -1) {
          v.users = v.users.filter(user => user !== socket.id);
          io.in(k).emit("user-disconnected", v.users || []);
        }
      })
    }
  });
});

