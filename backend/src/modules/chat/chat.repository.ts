import { prisma } from "../../config/prisma.js";
import type { UploadedAttachment } from "./chat.type.js";

export class ChatRepository {

   constructor() {
    console.log("🔥 ChatRepository created");
  }

  hello() {
    return "hello";
  }
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
  const conversations =
    await prisma.conversation.findMany({
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

  return conversations.map((conversation) => ({
    ...conversation,

    messages: conversation.messages.map(
      (message) => ({
        ...message,

        attachments:
          message.attachments.map(
            (attachment) => ({
              ...attachment,

              fileSize:
                attachment.fileSize != null
                  ? Number(
                      attachment.fileSize
                    )
                  : null,
            })
          ),
      })
    ),
  }));
}

  /**
 * Create message
 */
async createMessage(data: {
  conversationId: string;
  senderId: string;
  content?: string;
  replyToId?: string;
  attachments?: UploadedAttachment[];
}) {
  const message = await prisma.message.create({
    data: {
      conversationId: data.conversationId,

      senderId: data.senderId,

      content: data.content ?? null,

      replyToId: data.replyToId ?? null,

      ...(data.attachments?.length
        ? {
            attachments: {
              create: data.attachments.map(
                (attachment) => ({
                  ...attachment,

                  fileSize:
                    attachment.fileSize != null
                      ? BigInt(
                          attachment.fileSize
                        )
                      : null,
                })
              ),
            },
          }
        : {}),
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
  });

  return {
    ...message,

    attachments: message.attachments.map(
      (attachment) => ({
        ...attachment,

        fileSize:
          attachment.fileSize != null
            ? Number(attachment.fileSize)
            : null,
      })
    ),
  };
}
  /**
 * Get Messages
 */
async getMessages(conversationId: string) {
  const messages = await prisma.message.findMany({
    where: {
      conversationId,
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

  return messages.map((message) => ({
    ...message,

    attachments: message.attachments.map(
      (attachment) => ({
        ...attachment,

        fileSize:
          attachment.fileSize != null
            ? Number(attachment.fileSize)
            : null,
      })
    ),
  }));
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
 * Soft Delete
 */
async deleteMessage(messageId: string) {
  return prisma.message.update({
    where: {
      id: messageId,
    },

    data: {
      deletedAt: new Date(),
      content: "🚫 This message was deleted."
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
  });
}
  
/**
 * Update conversation timestamp
 */
async touchConversation(conversationId: string) {
  return prisma.conversation.update({
    where: {
      id: conversationId,
    },
   data: {
      updatedAt: new Date(),
}
  });
}
}

export const chatRepository = new ChatRepository();