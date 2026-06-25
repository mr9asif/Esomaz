import { Server } from "socket.io";
import { socketAuth } from "./auth.js";
import { registerSocketEvents } from "./events.js";
import type { AuthenticatedSocket } from "./types.js";

let io: Server;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (socket) => {
    registerSocketEvents(io, socket as AuthenticatedSocket);
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized.");
  }

  return io;
};