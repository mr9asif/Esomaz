import { prisma } from "../../config/prisma.js";

export const createCommentService = async (
  userId: string,
  payload: {
    postId: string;
    content: string;
    parentId?: string;
  }
) => {

  const post = await prisma.post.findUnique({
    where: {
      id: payload.postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  return prisma.comment.create({

    data: {

      content: payload.content,

      userId,

      postId: payload.postId,

      parentId: payload.parentId ?? null,

    },

  });

};

export const getCommentsService = async (
  postId: string
) => {

  return prisma.comment.findMany({

    where: {

      postId,

      parentId: null,

    },

    include: {

      user: {

        select: {

          id: true,
          name: true,
          username: true,
          avatar: true,

        },

      },

      replies: {

        include: {

          user: {

            select: {

              id: true,
              name: true,
              username: true,
              avatar: true,

            },

          },

        },

        orderBy: {

          createdAt: "asc",

        },

      },

    },

    orderBy: {

      createdAt: "desc",

    },

  });

};

export const updateCommentService = async (
  userId: string,
  commentId: string,
  payload: {
    content: string;
  }
) => {

  const comment = await prisma.comment.findUnique({

    where: {

      id: commentId,

    },

  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.comment.update({

    where: {

      id: commentId,

    },

    data: {

      content: payload.content,

    },

  });

};

export const deleteCommentService = async (
  userId: string,
  commentId: string
) => {

  const comment = await prisma.comment.findUnique({

    where: {

      id: commentId,

    },

  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.userId !== userId) {
    throw new Error("Unauthorized");
  }

  await prisma.comment.delete({

    where: {

      id: commentId,

    },

  });

};

export const replyCommentService = async (
  userId: string,
  payload: {
    parentId: string;
    content: string;
  }
) => {

  const parent = await prisma.comment.findUnique({

    where: {

      id: payload.parentId,

    },

  });

  if (!parent) {

    throw new Error("Comment not found");

  }

  return prisma.comment.create({

    data: {

      content: payload.content,

      userId,

      postId: parent.postId,

      parentId: parent.id,

    },

    include: {

      user: {

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