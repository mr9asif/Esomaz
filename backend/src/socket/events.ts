import type { Server } from "socket.io";
import type { AuthenticatedSocket } from "./types.js";

import { registerChatEvents } from "../modules/chat/chat.socket.js";
import { socketStore } from "./socketStore.js";

export const registerSocketEvents = (
  io: Server,
  socket: AuthenticatedSocket
) => {

  if (!socket.user) return;

  socketStore.addUser(
    socket.user.id,
    socket
  );

  console.log(
    `🟢 ${socket.user.username} connected`
  );

  registerChatEvents(io, socket);

  socket.on(
    "disconnect",
    () => {

      socketStore.removeUser(
        socket.user!.id
      );

      console.log(
        `🔴 ${socket.user?.username} disconnected`
      );

    }
  );

};