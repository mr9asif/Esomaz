import { prisma } from "../../config/prisma.js";

export const toggleBookmarkService = async (
  userId: string,
  postId: string
) => {

  // Check post exists

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  // Already bookmarked?

  const exist = await prisma.bookmark.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (exist) {

    await prisma.bookmark.delete({
      where: {
        id: exist.id,
      },
    });

    return {
      message: "Bookmark removed",
      data: false,
    };

  }

  await prisma.bookmark.create({
    data: {
      userId,
      postId,
    },
  });

  return {
    message: "Bookmark added",
    data: true,
  };

};