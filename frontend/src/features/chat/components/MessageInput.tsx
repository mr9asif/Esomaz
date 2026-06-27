import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "@/socket/useSocket";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { conversationId } = useParams();

  const { socket } = useSocket();

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setMessage(value);

    if (!conversationId) return;

    // Notify other user that I'm typing
    socket.emit("chat:typing", conversationId);

    // Reset timer
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Stop typing after 1 second of inactivity
    typingTimeout.current = setTimeout(() => {
      socket.emit(
        "chat:stopTyping",
        conversationId
      );
    }, 1000);
  };

  const handleSend = () => {
    if (!message.trim() || !conversationId) return;

    socket.emit("chat:send", {
      conversationId,
      content: message,
    });

    // Stop typing immediately after sending
    socket.emit(
      "chat:stopTyping",
      conversationId
    );

    setMessage("");
  };

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  return (
    <div className="border-t p-4 flex gap-2">
      <input
        value={message}
        onChange={handleChange}
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