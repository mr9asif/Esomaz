import { prisma } from "../../config/prisma.js";

export class ChatRepository {
  /**
   * Find existing DIRECT conversation between two users
   */
  async findDirectConversation(
    currentUserId: string,
    receiverId: string
  ) {
    return prisma.conversation.findFirst({
      where: {
        type: "DIRECT",

        AND: [
          {
            participants: {
              some: {
                userId: currentUserId,
              },
            },
          },

          {
            participants: {
              some: {
                userId: receiverId,
              },
            },
          },
        ],
      },

      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                isVerified: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Create Conversation
   */
 async createDirectConversation(
  currentUserId: string,
  receiverId: string
) {
  return prisma.$transaction(async (tx) => {
    const conversation =
      await tx.conversation.create({
        data: {},
      });

    await tx.conversationParticipant.createMany({
      data: [
        {
          conversationId: conversation.id,
          userId: currentUserId,
        },
        {
          conversationId: conversation.id,
          userId: receiverId,
        },
      ],
    });

    return tx.conversation.findUnique({
      where: {
        id: conversation.id,
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                isVerified: true,
              },
            },
          },
        },
      },
    });
  });
}

  /**
   * Get Conversation By Id
   */
  async getConversationById(conversationId: string) {
    return prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },

      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                isVerified: true,
              },
            },
          },
        },
      },
    });
  }

  /**
   * Check conversation participant
   */
  async isParticipant(
    conversationId: string,
    userId: string
  ) {
    return prisma.conversationParticipant.findFirst({
      where: {
        conversationId,
        userId,
      },
    });
  }

  /**
   * Get all conversations
   */
  async getUserConversations(userId: string) {
    return prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
      },

      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                isVerified: true,
              },
            },
          },
        },

        messages: {
          where: {
            deletedAt: null,
          },

          orderBy: {
            createdAt: "desc",
          },

          take: 1,

          include: {
            sender: {
              select: {
                id: true,
                username: true,
              },
            },

            attachments: true,
          },
        },
      },

      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  /**
   * Create message
   */
  async createMessage(data: {
    conversationId: string;
    senderId: string;
    content?: string;
    replyToId?: string;
  }) {
    return prisma.message.create({
      data,

      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },

        attachments: true,

        replyTo: true,
      },
    });
  }

  /**
   * Get Messages
   */
  async getMessages(conversationId: string) {
    return prisma.message.findMany({
      where: {
        conversationId,
        deletedAt: null,
      },

      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },

        attachments: true,

        replyTo: true,
      },

      orderBy: {
        createdAt: "asc",
      },
    });
  }

  /**
   * Get Message
   */
  async getMessage(messageId: string) {
    return prisma.message.findUnique({
      where: {
        id: messageId,
      },

      include: {
        attachments: true,
      },
    });
  }

  /**
   * Edit Message
   */
  async editMessage(
    messageId: string,
    content: string
  ) {
    return prisma.message.update({
      where: {
        id: messageId,
      },

      data: {
        content,
      },
    });
  }

  /**
   * Soft Delete
   */
  async deleteMessage(messageId: string) {
    return prisma.message.update({
      where: {
        id: messageId,
      },

      data: {
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Seen Conversation
   */
  async markConversationSeen(
    conversationId: string,
    userId: string
  ) {
    return prisma.message.updateMany({
      where: {
        conversationId,

        senderId: {
          not: userId,
        },

        seenAt: null,
      },

      data: {
        seenAt: new Date(),
      },
    });
  }
}

export const chatRepository = new ChatRepository();