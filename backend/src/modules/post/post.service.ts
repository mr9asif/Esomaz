// post.service.ts

import { prisma } from "../../config/prisma.js";

export const createPostService = async (
  authorId: string,
  content?: string
) => {
  return prisma.post.create({
    data: {
      content:content ?? null,
      authorId,
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