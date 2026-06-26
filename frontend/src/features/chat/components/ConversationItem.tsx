import { Link } from "react-router-dom";

import { useAuth } from "@/provider/UseAuth";
import type { Conversation, ConversationParticipant } from "../types/chat.types";

interface Props {
  conversation: Conversation ;
}

const ConversationItem = ({
  conversation,
}: Props) => {
  const { user } = useAuth();

const receiver = conversation.participants.find(
  (participant: ConversationParticipant) =>
    participant.user.id !== user?.id
);

if (!receiver) {
  return null;
}

  return (
    <Link
      to={`/messages/${conversation.id}`}
      className="flex items-center gap-3 p-4 hover:bg-gray-100 transition"
    >
      <img
        src={receiver.user.avatar ?? "/default-avatar.png"}
        alt=""
        className="w-12 h-12 rounded-full object-cover"
      />

      <div>

        <h2 className="font-semibold">

          {receiver.user.name}

        </h2>

        <p className="text-sm text-gray-500">

          @{receiver.user.username}

        </p>

      </div>

    </Link>
  );
};

export default ConversationItem;