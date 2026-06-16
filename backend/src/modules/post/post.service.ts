// post.service.ts

import { prisma } from "../../config/prisma.js";


import uploadToCloudinary from "../../util/uploadToCloudinary.js";

// post.service.ts
export const createPostService = async (
  authorId: string,
  content?: string,
  image?: Express.Multer.File,
  video?: Express.Multer.File
) => {

  // Don't allow empty post
  if (!content && !image && !video) {
    throw new Error(
      "Post cannot be empty"
    );
  }

  // Don't allow image + video together
  if (image && video) {
    throw new Error(
      "Upload either an image or a video."
    );
  }

  const mediaData: {
    url: string;
    type: "IMAGE" | "VIDEO";
  }[] = [];

  // Upload image
  if (image) {
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

export const getPostsService = async () => {
  return prisma.post.findMany({
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
        },
      },
      media: true,
      reactions: true,
    },
  });
};


export const getPostByIdService = async (
  postId: string
) => {
  return prisma.post.findUnique({
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
        },
      },
      media: true,
      reactions: true,
    },
  });
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