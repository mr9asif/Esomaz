import { useToggleFollow } from "@/features/follow/hooks/useToggleFollow";
import {
  MessageCircle,
  Pencil,
  Share2,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

type Props = {
  isMe: boolean;
  isFollowing?: boolean;
  userId: string;
  username: string;
  onEdit?: () => void;
    onMessage?: () => void;
};



const ProfileAction = ({
  isMe,
  isFollowing,
  userId,
  username,
  onEdit,
  onMessage,
}: Props) => {
  const { mutate: toggleFollow } = useToggleFollow();
  const handleShare = async () => {
    const url = `${window.location.origin}/profile/${username}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out my Esomaz profile",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Profile link copied!");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Profile link copied!");
      } catch {
        toast.error("Unable to share profile");
      }
    }
  };

  if (isMe) {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-6">
       <button
  onClick={onEdit}
  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
>
  <Pencil size={18} />
  Edit Profile
</button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-5 py-2 rounded-xl border hover:bg-gray-50 transition"
        >
          <Share2 size={18} />
          Share Profile
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 mt-6">
   <button
 
   onClick={() => {
    console.log("Profile userId:", userId);
    toggleFollow(userId);
  }}
  className={`flex items-center gap-2 px-5 py-2 rounded-xl transition cursor-pointer  ${
    isFollowing
      ? "border hover:bg-gray-100 "
      : "bg-blue-600 text-white hover:bg-blue-700 hover:bg-blue-400"
  }`}
>
  <UserPlus size={18} />
  {isFollowing ? "Following" : "Follow"}
</button>

     <button
    onClick={onMessage}
    className="flex items-center gap-2 px-5 py-2 rounded-xl border hover:bg-gray-50 transition cursor-pointer hover:bg-gray-200"
>
    <MessageCircle size={18}/>
    Message
</button>
    </div>
  );
};

export default ProfileAction;