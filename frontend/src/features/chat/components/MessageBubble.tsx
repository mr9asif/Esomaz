import type { Message } from "../types/chat.types";

import { useAuth } from "@/provider/UseAuth";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEditMessage } from "../hooks/useEditMessage";


import { useState } from "react";
import { formatMessageTime } from "../utils/formateMessageTime";
interface Props {
  message: Message;
  //   onEdit: (messageId: string, content: string) => void;
  // onDelete: (messageId: string) => void;
}

const MessageBubble = ({
  message,
}: Props) => {
  const { user } = useAuth();
const [openMenu, setOpenMenu] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [content, setContent] = useState(
  message.content ?? ""
);

const { mutate: editMessage, isPending } =
  useEditMessage();

  const isMine =
    message.sender.id === user?.id;
    console.log(isMine)
    console.log(message);
    console.log({
  id: message.id,
  createdAt: message.createdAt,
  updatedAt: message.updatedAt,
});



  return (
  <div
    className={`flex mr-8 ml-2 mb-3 ${
      isMine ? "justify-end" : "justify-start"
    }`}
  >
    <div className="relative max-w-sm">

      {isMine && (
        <div className="absolute -right-10 top-2 z-10">
          <button
            onClick={() =>
              setOpenMenu((prev) => !prev)
            }
            className="rounded-full p-1 hover:bg-gray-200 transition"
          >
            <MoreVertical size={18} />
          </button>

          {openMenu && (
            <div className="absolute right-8 top-0 mt-2 w-36 rounded-xl z-50 border bg-white shadow-xl overflow-hidden">

              <button
              onClick={() => {
  setOpenMenu(false);
setContent(message.content ?? "");
  setIsEditing(true);
}}
                className="flex w-full items-center gap-2 px-4 py-2 hover:bg-gray-100"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => {
                  setOpenMenu(false);
                  console.log(
                    "Delete",
                    message.id
                  );
                }}
                className="flex w-full items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>

            </div>
          )}
        </div>
      )}

      <div
  className={`rounded-2xl px-4 py-2 ${
    isMine
      ? "bg-blue-500 text-white"
      : "bg-gray-100 text-black"
  }`}
>
  {isEditing ? (
    <div className="space-y-2">
      <input
        autoFocus
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setIsEditing(false);
       setContent(message.content ?? "");
          }

          if (e.key === "Enter") {
            if (
              !content.trim() ||
              content === message.content
            ) {
              setIsEditing(false);
              return;
            }

            editMessage(
              {
                messageId: message.id,
                content,
              },
              {
                onSuccess: () => {
                  setIsEditing(false);
                },
              }
            );
          }
        }}
        className="w-full rounded border bg-white px-2 py-1 text-black outline-none"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => {
            setIsEditing(false);
          setContent(message.content ?? "");
          }}
          className="text-xs"
        >
          Cancel
        </button>

        <button
          disabled={isPending}
          onClick={() => {
            editMessage(
              {
                messageId: message.id,
                content,
              },
              {
                onSuccess: () => {
                  setIsEditing(false);
                },
              }
            );
          }}
          className="rounded bg-white px-2 py-1 text-xs text-blue-600"
        >
          {isPending
            ? "Saving..."
            : "Save"}
        </button>
      </div>
    </div>
  ) : (
    message.content
  )}
</div>

      <div
        className={`mt-1 text-xs text-gray-500 ${
          isMine
            ? "text-right"
            : "text-left"
        }`}
      >
  {formatMessageTime(message.createdAt)}

        {message.updatedAt &&
 message.updatedAt !== message.createdAt && (
  <span className="ml-1 italic">
    • Edited
  </span>
)}
      </div>

    
    </div>
  </div>
);
};

export default MessageBubble;