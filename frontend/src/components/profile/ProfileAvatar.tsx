type Props = {
  name?: string;
  avatar?: string | null;
};

const ProfileAvatar = ({
  name,
  avatar,
}: Props) => {
  const initials =
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  return (
    <div className="-mt-20 flex justify-center">
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
    </div>
  );
};

export default ProfileAvatar;