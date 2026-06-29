import {
  ImagePlus,
  Send,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { useSocket } from "@/socket/useSocket";
import { useUploadAttachments } from "../hooks/useUploadAttachments";
import type { UploadedAttachment } from "../types/chat.types";




const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { conversationId } = useParams();

  const { socket } = useSocket();

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const {
  mutateAsync: uploadAttachments,
  isPending: isUploading,
} = useUploadAttachments();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    setMessage(value);
console.log("⌨️ Typing emit", conversationId);

socket.emit("chat:typing", conversationId);
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

 const handleSend = async () => {
  if (
    !conversationId ||
    (!message.trim() && files.length === 0)
  ) {
    return;
  }

  try {
   let attachments: UploadedAttachment[] = [];

    if (files.length > 0) {
      attachments =
        await uploadAttachments(files);
    }

    console.log("attechmetn,", attachments)

    
    socket.emit("chat:send", {
      conversationId,
      content: message.trim(),
      attachments,
    });

    socket.emit(
      "chat:stopTyping",
      conversationId
    );

    setMessage("");
    setFiles([]);
  } catch (error) {
    console.error(error);
  }
};

  const [files, setFiles] = useState<File[]>([]);

const fileInputRef =
  useRef<HTMLInputElement>(null);

  const handleSelectFiles = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files) return;

  const selected = Array.from(
    e.target.files
  );

  setFiles((prev) => [
    ...prev,
    ...selected,
  ]);

  e.target.value = "";
};

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);



const removeFile = (index: number) => {
  setFiles((prev) =>
    prev.filter((_, i) => i !== index)
  );
};

  return (
    <div className="border-t p-3 ">

  {files.length > 0 && (
    <div className="mb-3 flex gap-2 overflow-x-auto">
      {files.map((file, index) => (
        <div
          key={index}
          className="relative shrink-0"
        >
          <img
            src={URL.createObjectURL(file)}
            className="h-20 w-20 rounded-lg object-cover"
          />

          <button
            onClick={() =>
              removeFile(index)
            }
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )}

  <div className="flex items-center gap-2">

    <input
      ref={fileInputRef}
      type="file"
      multiple
      accept="image/*,video/*"
      hidden
      onChange={handleSelectFiles}
    />

    <button
      onClick={() =>
        fileInputRef.current?.click()
      }
      className="rounded-full p-2 hover:bg-gray-100"
    >
      <ImagePlus size={22} />
    </button>

    <input
      value={message}
      onChange={handleChange}
      className="flex-1 rounded-full border px-4 py-2"
      placeholder="Write a message..."
    />

    <button
      onClick={handleSend}
        disabled={isUploading}
      className="rounded-full bg-blue-500 p-2 text-white"
    >
      <Send size={18} />
    </button>

  </div>

</div>
  );
};

export default MessageInput;