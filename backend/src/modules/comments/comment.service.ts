import { prisma } from "../../config/prisma.js";
import { NotificationType } from "../../generated/prisma/index.js";
import notificationService from "../notification/notification.service.js";

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
const comment = await prisma.comment.create({
  data: {
    content: payload.content,
    userId,
    postId: payload.postId,
    parentId: payload.parentId ?? null,
  },
});

await notificationService.createNotification({
  receiverId: post.authorId,
  senderId: userId,
  type: NotificationType.COMMENT,
  postId: post.id,
  commentId: comment.id,
});

return comment;

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
const reply = await prisma.comment.create({

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

  await notificationService.createNotification({
    receiverId: parent.userId,
    senderId: userId,
    type: NotificationType.REPLY,
    postId: parent.postId,
    commentId: reply.id,

  });
  return reply;

};