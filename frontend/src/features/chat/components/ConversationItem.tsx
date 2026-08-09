import { Link } from "react-router-dom";

import { useAuth } from "@/provider/UseAuth";

import { useOnlineUsers } from "../hooks/useOnlineUsers";
import type {
  Conversation,
  ConversationParticipant,
} from "../types/chat.types";

interface Props {
  conversation: Conversation;
}

const ConversationItem = ({ conversation }: Props) => {
  const { user } = useAuth();

  const onlineUsers = useOnlineUsers();

  const receiver = conversation.participants.find(
    (participant: ConversationParticipant) => participant.user.id !== user?.id,
  );

  if (!receiver) {
    return null;
  }

  const isOnline = onlineUsers.has(receiver.user.id);

  return (
    <Link
      to={`/messages/${conversation.id}`}
      className="flex items-center gap-3 p-4 transition hover:bg-gray-100"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={receiver.user.avatar ?? "/default-avatar.png"}
          alt={receiver.user.name}
          className="h-12 w-12 rounded-full object-cover"
        />

        {/* Online indicator */}
        {isOnline && (
          <span
            className="
              absolute
              right-0
              bottom-0
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-white
              bg-green-500
            "
          />
        )}
      </div>

      {/* User info */}
      <div className="min-w-0">
        <h2 className="truncate font-semibold">{receiver.user.name}</h2>

        <p className="truncate text-sm text-gray-500">
          @{receiver.user.username}
        </p>
      </div>
    </Link>
  );
};

export default ConversationItem;
