import { useNavigate } from "react-router-dom";
import type { SearchUser } from "../types/chat.types";

import { useCreateDirectConversation } from "../hooks/useCreateDirectConversation";

interface Props {
  users: SearchUser[];
  onClose: () => void;
}

const SearchResults = ({
  users, onClose,
}: Props) => {
const navigate = useNavigate();

const { mutateAsync } =
  useCreateDirectConversation();

  const handleOpenChat = async (
  receiverId: string
) => {
  try {
    const conversation =
      await mutateAsync(receiverId);

    onClose();

    navigate(
      `/messages/${conversation.id}`
    );
  } catch (error) {
    console.error(error);
  }
};


  return (
   <div className="absolute inset-0 z-50 overflow-y-auto bg-white shadow-lg">

      {users.length === 0 ? (
        <div className="p-6 text-center text-muted-foreground">
          No users found
        </div>
      ) : (
        users.map((user) => (
        <button
  key={user.id}
  onClick={() =>
    handleOpenChat(user.id)
  }
  className="flex w-full items-center gap-3 border-b p-4 text-left transition hover:bg-muted"
>
            <img
              src={
                user.avatar ||
                "/default-avatar.png"
              }
              alt={user.name}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div>

              <h3 className="font-semibold">
                {user.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                @{user.username}
              </p>

              {user.bio && (
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  {user.bio}
                </p>
              )}

            </div>
          </button>
        ))
      )}

    </div>
  );
};

export default SearchResults;