type Props = {
  followers: number;
  following: number;
  posts: number;
};

const ProfileStats = ({
  followers,
  following,
  posts,
}: Props) => {
  return (
    <div className="flex justify-center gap-10 mt-8">

      <div>
        <h3 className="font-bold text-xl">
          {followers}
        </h3>
        <p className="text-gray-500">
          Followers
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl">
          {following}
        </h3>
        <p className="text-gray-500">
          Following
        </p>
      </div>

      <div>
        <h3 className="font-bold text-xl">
          {posts}
        </h3>
        <p className="text-gray-500">
          Posts
        </p>
      </div>

    </div>
  );
};

export default ProfileStats;