import { prisma } from "../../config/prisma.js";

export const toggleReactionService = async (

    userId: string,

    postId: string

) => {

    const exist = await prisma.reaction.findUnique({

        where: {

            userId_postId: {

                userId,

                postId,

            },

        },

    });

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

    await prisma.reaction.create({

        data: {

            userId,

            postId,

            type: "LIKE",

        },

    });

    return {

        message: "Reaction added",

        data: true,

    };

};

export const getPostByIdService = async (
  postId: string
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },

    include: {
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          profilePicture: true,
        },
      },

      media: true,

      reactions: {
        select: {
          id: true,
          userId: true,
        },
      },

      comments: {
        select: {
          id: true,
        },
      },
    },
  });

  return post;
};