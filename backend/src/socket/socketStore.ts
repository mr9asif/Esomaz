import type { Socket } from "socket.io";

class SocketStore {
  private users = new Map<string, Socket>();

  addUser(userId: string, socket: Socket) {
    this.users.set(userId, socket);
  }

  removeUser(userId: string) {
    this.users.delete(userId);
  }

  getUser(userId: string) {
    return this.users.get(userId);
  }

  isOnline(userId: string) {
    return this.users.has(userId);
  }

  getOnlineUsers() {
    return [...this.users.keys()];
  }
}

export const socketStore = new SocketStore();