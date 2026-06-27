import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "@/socket/useSocket";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const ChatWindow = () => {
  const { conversationId } = useParams();
  const { socket } = useSocket();

useEffect(() => {
  if (!conversationId) return;

  const joinRoom = () => {
    console.log(
      "✅ JOIN ROOM AFTER CONNECT",
      socket.id,
      socket.connected
    );

    socket.emit("chat:join", conversationId);
  };

  console.log(
    "Effect start",
    socket.connected,
    socket.id
  );

  socket.on("connect", joinRoom);

  if (socket.connected) {
    joinRoom();
  }

  return () => {
    console.log("Cleanup");

    socket.off("connect", joinRoom);

    if (socket.connected) {
      socket.emit("chat:leave", conversationId);
    }
  };
}, [conversationId, socket]);

  if (!conversationId) {
    return (
      <div className="h-full flex items-center justify-center">
        <h1 className="text-gray-400">
          Select a conversation
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default ChatWindow;