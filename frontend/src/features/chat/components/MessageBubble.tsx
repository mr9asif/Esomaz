import type { Message } from "../types/chat.types";

import { useAuth } from "@/provider/UseAuth";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";


import { useState } from "react";
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

  const isMine =
    message.sender.id === user?.id;
    console.log(isMine)
    console.log(message);

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
                  console.log(
                    "Edit",
                    message.id
                  );
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
        className={`rounded-2xl px-4 py-2 break-words ${
          isMine
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-black"
        }`}
      >
        {message.content}
      </div>

      <div
        className={`mt-1 text-xs text-gray-500 ${
          isMine
            ? "text-right"
            : "text-left"
        }`}
      >
        {new Date(
          message.createdAt
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      {isMine && message.seenAt && (
        <div className="text-xs text-right text-blue-500">
          Seen
        </div>
      )}
    </div>
  </div>
);
};

export default MessageBubble;