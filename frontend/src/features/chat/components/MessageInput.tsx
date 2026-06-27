import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "@/socket/useSocket";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { conversationId } = useParams();

  const { socket } = useSocket();

  const handleSend = () => {
    if (!message.trim() || !conversationId) return;

    console.log("1️⃣ Sending", {
    conversationId,
    message,
    socketId: socket.id,
    connected: socket.connected,
  });

  if (!message.trim() || !conversationId) return;
  
    socket.emit("chat:send", {
      conversationId,
      content: message,
    });

    setMessage("");
  };

  return (
    <div className="border-t p-4 flex gap-2">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 border rounded-full px-4 py-2"
        placeholder="Write a message..."
      />

      <button
        onClick={handleSend}
        className="px-5 rounded-full bg-blue-500 text-white"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;