import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/provider/UseAuth";

import EditProfileModel from "@/components/profile/EditProfileModel";
import ProfileAction from "@/components/profile/ProfileAction";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import ProfileCover from "@/components/profile/ProfileCover";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileStats from "@/components/profile/ProfileStates";

import MainLayout from "@/layouts/MainLayout";
import { useCreateDirectConversation } from "../chat/hooks/useCreateDirectConversation";
import { useProfile } from "./useProfile";

const ProfilePage = () => {
  const { username } = useParams();
   const navigate = useNavigate();

const {
    mutate: createConversation
} = useCreateDirectConversation();

  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  console.log(open)

  const { data, isLoading } = useProfile(username!);

  const profile = data?.data;

  if (isLoading || !profile) {
    return (
      <div className="flex justify-center py-20">
        Loading...
      </div>
    );
  }

  const isMe = user?.id === profile.id;

 

  return (
    <MainLayout>
    <div className="pb-10">

     <ProfileCover
  coverPhoto={profile.coverPhoto}
  isMe={isMe}
  username={profile.username}
/>

      <ProfileAvatar
  avatar={profile.avatar}
  name={profile.name}
  isMe={isMe}
  username={profile.username}
/>
      <ProfileInfo
        name={profile.name}
        username={profile.username}
        bio={profile.bio}
        location={profile.location}
        website={profile.website}
      />

      <ProfileStats
        followers={profile.followersCount}
        following={profile.followingCount}
        posts={profile.postsCount}
      />

<ProfileAction
  isMe={isMe}
  userId={profile.id}
  isFollowing={profile.isFollowing}
  username={profile.username}
  onEdit={() => setOpen(true)}
  onMessage={() =>
    createConversation(profile.id, {
      onSuccess: (conversation) => {
        navigate(`/messages/${conversation.id}`);
      },
    })
  }
/>

      {open && (
        <EditProfileModel
          profile={profile}
          onClose={() => setOpen(false)}
        />
      )}

    </div>
    </MainLayout>
  );
};

export default ProfilePage;