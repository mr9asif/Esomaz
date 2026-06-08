type Props = {
  coverPhoto?: string | null;
};

const ProfileCover = ({
  coverPhoto,
}: Props) => {
  return coverPhoto ? (
    <img
      src={coverPhoto}
      alt="cover"
      className="h-72 w-full object-cover rounded-b-3xl"
    />
  ) : (
    <div className="h-72 w-full rounded-b-3xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600" />
  );
};

export default ProfileCover;