import { useState } from "react";

import { useParams } from "react-router-dom";

import { useSendMessage } from "../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] =
    useState("");

  const { conversationId } =
    useParams();

  const { mutate, isPending } =
    useSendMessage();

  const handleSend = () => {
    if (!message.trim()) return;

    mutate({
      conversationId:
        conversationId!,
      content: message,
    });

    setMessage("");
  };

  return (
    <div className="border-t p-4 flex gap-2">

      <input
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        className="flex-1 border rounded-full px-4 py-2"
        placeholder="Write a message..."
      />

      <button
        disabled={isPending}
        onClick={handleSend}
        className="px-5 rounded-full bg-blue-500 text-white"
      >
        Send
      </button>

    </div>
  );
};

export default MessageInput;