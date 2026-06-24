// post.service.ts

import { prisma } from "../../config/prisma.js";


import uploadToCloudinary from "../../util/uploadToCloudinary.js";

// post.service.ts
export const createPostService = async (
  authorId: string,
  content?: string,
  images?: Express.Multer.File[],
  video?: Express.Multer.File
) => {

  // Don't allow empty post
  if (!content && !images && !video) {
    throw new Error(
      "Post cannot be empty"
    );
  }

  // Don't allow image + video together
  if (images && video) {
    throw new Error(
      "Upload either an image or a video."
    );
  }

  const mediaData: {
    url: string;
    type: "IMAGE" | "VIDEO";
  }[] = [];

  // Upload image
if (images && images.length > 0) {

  for (const image of images) {

    const uploaded =
      await uploadToCloudinary(
        image.buffer,
        "esomaz/posts",
        "image"
      );

    mediaData.push({
      url: uploaded.secure_url,
      type: "IMAGE",
    });

  }

}
  // Upload video
  if (video) {
    const uploaded =
      await uploadToCloudinary(
        video.buffer,
        "esomaz/posts",
        "video"
      );

    mediaData.push({
      url: uploaded.secure_url,
      type: "VIDEO",
    });
  }

  return prisma.post.create({
    data: {
      content:
        content?.trim() || null,

      authorId,

      media: {
        create: mediaData,
      },
    },

    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },

      media: true,

      reactions: true,
    },
  });
};

export const getPostsService = async (
  userId: string
) => {
  const posts = await prisma.post.findMany({
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
    isBookmarked: post.bookmarks.length > 0,
  }));
};

export const getPostByIdService = async (
  postId: string,
   userId: string
) => {
const post = await prisma.post.findUnique({
    where: {
      id: postId,
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
    },
  });

  if (!post) {
  return null;
}

return {
  ...post,

  author: {
    ...post.author,
    isFollowing:
      post.author.followers.length > 0,
  },
};
};



export const deletePostService = async (
  postId: string,
  userId: string
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.post.delete({
    where: {
      id: postId,
    },
  });
};

// edit or update post
export const updatePostService = async (
  userId: string,
  postId: string,
  payload: {
    content: string;
  }
) => {

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      content: payload.content,
    },
  });

};


// trend oost
export const getTrendingPostsService =
  async () => {

    const posts =
      await prisma.post.findMany({

        include: {

          author: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true,
            },
          },

          _count: {
            select: {
              reactions: true,
              comments: true,
            },
          },

        },

      });

    const trendingPosts = posts
      .map((post) => ({
        ...post,

        score:
          post._count.reactions +
          post._count.comments,
      }))
      .sort(
        (a, b) =>
          b.score - a.score
      )
      .slice(0, 4);

    return trendingPosts;
  };