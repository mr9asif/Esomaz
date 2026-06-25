import type { Socket } from "socket.io";

export interface SocketUser {
  id: string;
  username?: string;
  email?: string;
}

export interface AuthenticatedSocket extends Socket {
  user?: SocketUser;
}