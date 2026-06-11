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

    const isMe = username === data.data.username;
    console.log("Isme",isMe)
    console.log("username", username);
    console.log("isme", data.data.username)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div>
    <ProfileCover
  coverPhoto={
    data.data.coverPhoto
  }
/>

<ProfileAvatar
  avatar={data.data.avatar}
  name={data.data.name}
/>

<ProfileInfo
  name={data.data.name}
  username={data.data.username}
  bio={data.data.bio}
  location={data.data.location}
  website={data.data.website}
/>

<ProfileStats
  followers={
    data.data.followersCount
  }
  following={
    data.data.followingCount
  }
  posts={data.data.postsCount}
/>

<ProfileAction
  isMe={isMe}
  isFollowing={
    data.data.isFollowing
  }
/>
    </div>
  );
};

export default ProfilePage;