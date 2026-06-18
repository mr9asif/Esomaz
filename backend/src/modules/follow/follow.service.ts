import { prisma } from "../../config/prisma.js";

export const toggleFollowService = async (
  followerId: string,
  followingId: string
) => {

  // Prevent self follow
  if (followerId === followingId) {
    throw new Error("You cannot follow yourself.");
  }

  // Check target user exists
  const targetUser = await prisma.user.findUnique({
    where: {
      id: followingId,
    },
  });

  if (!targetUser) {
    throw new Error("User not found.");
  }

  // Check existing follow
  const exist = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId,
        followingId,
      },
    },
  });

  // Unfollow
  if (exist) {

    await prisma.follow.delete({
      where: {
        id: exist.id,
      },
    });

    return {
      following: false,
      message: "Unfollowed successfully",
    };

  }

  // Follow
  await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });

  return {
    following: true,
    message: "Followed successfully",
  };

};

export const getFollowersService = async (
  userId: string
) => {

  return prisma.follow.findMany({

    where: {
      followingId: userId,
    },

    include: {

      follower: {

        select: {

          id: true,
          name: true,
          username: true,
          avatar: true,
          isVerified: true,

        },

      },

    },

    orderBy: {

      createdAt: "desc",

    },

  });

};

export const getFollowingService = async (
  userId: string
) => {

  return prisma.follow.findMany({

    where: {
      followerId: userId,
    },

    include: {

      following: {

        select: {

          id: true,
          name: true,
          username: true,
          avatar: true,
          isVerified: true,

        },

      },

    },

    orderBy: {

      createdAt: "desc",

    },

  });

};