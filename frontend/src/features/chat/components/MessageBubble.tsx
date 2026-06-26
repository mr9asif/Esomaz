import type { Message } from "../types/chat.types";

import { useAuth } from "@/provider/UseAuth";

interface Props {
  message: Message;
}

const MessageBubble = ({
  message,
}: Props) => {

  const { user } = useAuth();

  const isMine =
    message.sender.id === user?.id;

  return (
    <div
      className={`flex ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`
        max-w-sm
        px-4
        py-2
        rounded-2xl

        ${
          isMine
            ? "bg-blue-500 text-white"
            : "bg-gray-100"
        }
      `}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;