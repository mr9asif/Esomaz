import { prisma } from "../../config/prisma.js";
import { NotificationType } from "../../generated/prisma/index.js";
import notificationService from "../notification/notification.service.js";

export const toggleReactionService = async (
  userId: string,
  postId: string
) => {
  // Find the post
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  // Check existing reaction
  const exist = await prisma.reaction.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  // Unlike
  if (exist) {
    await prisma.reaction.delete({
      where: {
        id: exist.id,
      },
    });

    return {
      message: "Reaction removed",
      data: false,
    };
  }

  // Like
  await prisma.reaction.create({
    data: {
      userId,
      postId,
      type: "LIKE",
    },
  });

  // Notify post owner
  await notificationService.createNotification({
    receiverId: post.authorId,
    senderId: userId,
    type: NotificationType.LIKE,
    postId: post.id,
  });

  return {
    message: "Reaction added",
    data: true,
  };
};