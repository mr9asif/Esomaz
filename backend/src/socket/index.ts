import { Server } from "socket.io";
import { socketAuth } from "./auth.js";
import { registerSocketEvents } from "./events.js";
import { socketStore } from "./socketStore.js";
import type { AuthenticatedSocket } from "./types.js";

let io: Server;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on("connection", (rawSocket) => {
    const socket = rawSocket as AuthenticatedSocket;

    const userId = socket.user?.id;

    if (!userId) {
      console.error("❌ Socket connected without authenticated user");

      socket.disconnect();
      return;
    }

    console.log(`🟢 User online: ${userId}`);

    // Add user to online users
    socketStore.addUser(userId, socket);

    // Tell all OTHER connected users
    socket.broadcast.emit("user:online", userId);

    // Tell this user who is already online
    socket.emit("users:online", socketStore.getOnlineUsers());
    socket.on("users:online:request", () => {
      socket.emit("users:online", socketStore.getOnlineUsers());
    });

    // Existing chat/socket events
    registerSocketEvents(io, socket);

    // User disconnects
    socket.on("disconnect", () => {
      console.log(`🔴 User offline: ${userId}`);

      socketStore.removeUser(userId);

      // Tell other users
      socket.broadcast.emit("user:offline", userId);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized.");
  }

  return io;
};
