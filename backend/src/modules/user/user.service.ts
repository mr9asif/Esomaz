import { prisma } from "../../config/prisma.js";



export const getMeService = async (userId:string) => {
  const user = await prisma.user.findUnique({
    where: {
      id:userId,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      bio: true,
      avatar: true,
      coverPhoto: true,
      isVerified: true,
      createdAt: true,
    },
  });
// console.log(user)
  return user;
};


// get profile by username


const getUserProfileService = async (
  username: string,
  currentUserId?: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      avatar: true,
      coverPhoto: true,
      location: true,
      website: true,
      isVerified: true,

      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  let isFollowing = false;

  if (currentUserId) {
    const follow = await prisma.follow.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.id,
      },
    });

    isFollowing = !!follow;
  }

  return {
    ...user,

    followersCount: user._count.followers,
    followingCount: user._count.following,
    postsCount: user._count.posts,

    isFollowing,
    isMe: currentUserId === user.id,
  };
};

const updateProfile = async (
  userId: string,
  payload: {
    name?: string;
    bio?: string;
    location?: string;
    website?: string;
  }
) => {
  const data = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== undefined
    )
  );

  return prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
};

export const UserService = {
  getUserProfileService,
  updateProfile
};