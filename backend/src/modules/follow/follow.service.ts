import { prisma } from "../../config/prisma.js";
import { NotificationType } from "../../generated/prisma/index.js";
import notificationService from "../notification/notification.service.js";

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

// Create notification
await notificationService.createNotification({
  receiverId: followingId,
  senderId: followerId,
  type: NotificationType.FOLLOW,
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
  const posts = await prisma.post.findMany({
    where: {
      author: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,

          followers: {
            where: {
              followerId: userId,
            },
            select: {
              id: true,
            },
          },
        },
      },

      media: true,

      reactions: true,

      bookmarks: {
        where: {
          userId,
        },
        select: {
          id: true,
        },
      },

      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return posts.map((post) => ({
    ...post,

    author: {
      ...post.author,
      isFollowing:
        post.author.followers.length > 0,
    },

    isBookmarked:
      post.bookmarks.length > 0,
  }));
};



// get top 3 follwing user 
export const getWhoToFollowService = async (
  currentUserId: string
) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: currentUserId,
      },

      followers: {
        none: {
          followerId: currentUserId,
        },
      },
    },

    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      isVerified: true,

      _count: {
        select: {
          followers: true,
        },
      },
    },

    orderBy: {
      followers: {
        _count: "desc",
      },
    },

    take: 3,
  });

  return users;
};