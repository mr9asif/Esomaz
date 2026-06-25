import type { Server } from "socket.io";
import { socketStore } from "./socketStore.js";
import type { AuthenticatedSocket } from "./types.js";

export const registerSocketEvents = (
  io: Server,
  socket: AuthenticatedSocket
) => {
  if (!socket.user) return;

  socketStore.addUser(socket.user.id, socket);

  console.log(
    `✅ ${socket.user.username} connected (${socket.id})`
  );

  console.log("🟢 Online Users:", socketStore.getOnlineUsers());

  socket.on("disconnect", () => {
    socketStore.removeUser(socket.user!.id);

    console.log(
      `❌ ${socket.user?.username} disconnected`
    );

    console.log("🟠 Online Users:", socketStore.getOnlineUsers());
  });
};