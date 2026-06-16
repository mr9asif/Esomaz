import { Camera } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";

import { useUpdateCoverPhoto } from "@/features/profile/hooks/useUpdateCover";
import { queryClient } from "@/lib/react_query";

type Props = {
  coverPhoto?: string | null;
  isMe: boolean;
  username: string;
};

const ProfileCover = ({
  coverPhoto,
  isMe,
  username,
}: Props) => {
  const fileRef =
    useRef<HTMLInputElement>(null);

  const { mutate } =
    useUpdateCoverPhoto();

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
      "coverPhoto",
      file
    );

    mutate(formData, {
      onSuccess: () => {
        toast.success(
          "Cover photo updated!"
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
    <div
      onClick={handleClick}
      className={`relative h-72 bg-gray-200 overflow-hidden ${
        isMe ? "cursor-pointer" : ""
      }`}
    >
      {coverPhoto ? (
        <img
          src={coverPhoto}
          alt="cover"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600" />
      )}

      {isMe && (
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition flex items-center justify-center">

          <div className="bg-white px-4 py-2 rounded-full flex items-center gap-2 shadow">

            <Camera size={18} />

            <span className="font-medium">
              Change Cover
            </span>

          </div>

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
  );
};

export default ProfileCover;