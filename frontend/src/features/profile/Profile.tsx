import ProfileAction from "@/components/profile/ProfileAction";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileCover from "@/components/profile/ProfileCover";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStates";
import { useParams } from "react-router-dom";
import { useProfile } from "./useProfile";

const ProfilePage = () => {
  const { username } = useParams();


  const { data, isLoading } =
    useProfile(username!);
    console.log(data)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div>
    <ProfileCover
  coverPhoto={
    data.coverPhoto
  }
/>

<ProfileAvatar
  avatar={data.avatar}
  name={data.name}
/>

<ProfileInfo
  name={data.name}
  username={data.username}
  bio={data.bio}
  location={data.location}
  website={data.website}
/>

<ProfileStats
  followers={
    data.followersCount
  }
  following={
    data.followingCount
  }
  posts={data.postsCount}
/>

<ProfileAction
  isMe={data.isMe}
  isFollowing={
    data.isFollowing
  }
/>
    </div>
  );
};

export default ProfilePage;