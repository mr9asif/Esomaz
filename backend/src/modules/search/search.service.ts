import { prisma } from "../../config/prisma.js";

export const searchService = async (
  currentUserId: string,
  q: string,
  type: string
) => {

  const keyword = q.trim();

  if (!keyword) {

    return {
      users: [],
      posts: [],
    };

  }

  // ================= USERS =================

  const users =
    type === "users" || type === "all"
      ? await prisma.user.findMany({

          where: {

            id: {
              not: currentUserId,
            },

            OR: [

              {
                name: {
                  contains: keyword,
                  mode: "insensitive",
                },
              },

              {
                username: {
                  contains: keyword,
                  mode: "insensitive",
                },
              },

            ],

          },

          select: {

            id: true,
            name: true,
            username: true,
            avatar: true,
            bio: true,
            isVerified: true,

            _count: {

              select: {

                followers: true,
                posts: true,

              },

            },

            followers: {

              where: {

                followerId: currentUserId,

              },

              select: {

                id: true,

              },

            },

          },

          take: 10,

        })
      : [];

  // ================= POSTS =================

  const posts =
    type === "post" || type === "all"
      ? await prisma.post.findMany({

          where: {

            content: {

              contains: keyword,
              mode: "insensitive",

            },

          },

          include: {

            author: {

              select: {

                id: true,
                name: true,
                username: true,
                avatar: true,
                isVerified: true,

              },

            },

            media: true,

            _count: {

              select: {

                reactions: true,
                comments: true,

              },

            },

          },

          orderBy: {

            createdAt: "desc",

          },

          take: 10,

        })
      : [];

  return {

    users: users.map((user) => ({

      id: user.id,
      name: user.name,
      username: user.username,
      avatar: user.avatar,
      bio: user.bio,
      isVerified: user.isVerified,

      followersCount: user._count.followers,
      postsCount: user._count.posts,

      isFollowing: user.followers.length > 0,

    })),

    posts,

  };

};