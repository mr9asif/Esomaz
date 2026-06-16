import { useUpdateAvatar } from "@/features/profile/hooks/useUpdateAvatar";
import { queryClient } from "@/lib/react_query";
import { Camera } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";

type Props = {
  name?: string;
  avatar?: string | null;
  isMe: boolean;
  username: string;
};

const ProfileAvatar = ({
  name,
  avatar,
  isMe,
  username,
}: Props) => {
  const fileRef =
    useRef<HTMLInputElement>(null);

  const { mutate } =
    useUpdateAvatar();

  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  const handleClick = () => {
    if (!isMe) return;

    fileRef.current?.click();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "avatar",
      file
    );

    mutate(formData, {
      onSuccess: () => {
        toast.success(
          "Avatar updated!"
        );

        queryClient.invalidateQueries({
          queryKey: [
            "profile",
            username,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      },

      onError: () => {
        toast.error(
          "Upload failed"
        );
      },
    });
  };

  return (
    <div className="-mt-20 flex justify-center">

      <div
        onClick={handleClick}
        className={`relative ${
          isMe
            ? "cursor-pointer"
            : ""
        }`}
      >

        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-36 w-36 rounded-full border-4 border-white object-cover shadow-lg"
          />
        ) : (
          <div className="h-36 w-36 rounded-full border-4 border-white bg-blue-600 text-white text-5xl font-bold flex items-center justify-center shadow-lg">
            {initials}
          </div>
        )}

        {isMe && (
          <div className="absolute bottom-2 right-2 h-9 w-9 rounded-full bg-white shadow flex items-center justify-center">
            <Camera size={18} />
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          hidden
          accept="image/*"
          onChange={handleChange}
        />

      </div>

    </div>
  );
};

export default ProfileAvatar;