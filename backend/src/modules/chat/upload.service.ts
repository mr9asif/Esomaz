import { AttachmentType } from "../../generated/prisma/index.js";
import uploadToCloudinary from "../../util/uploadToCloudinary.js";
import type { UploadedAttachment } from "./chat.type.js";

export class UploadService {
  /**
   * Upload chat attachments
   */
  async uploadAttachments(
    files: Express.Multer.File[]
  ): Promise<UploadedAttachment[]> {
    if (!files.length) {
      return [];
    }

    const attachments: UploadedAttachment[] = [];

    for (const file of files) {
      const isVideo =
        file.mimetype.startsWith("video");

      const uploaded =
        await uploadToCloudinary(
          file.buffer,
          "esomaz/chat",
          isVideo ? "video" : "image"
        );

      attachments.push({
        url: uploaded.secure_url,

        type: isVideo
          ? AttachmentType.VIDEO
          : AttachmentType.IMAGE,

        fileName: file.originalname,

        fileSize: file.size,

        mimeType: file.mimetype,
      });
    }

    return attachments;
  }
}

export const uploadService =
  new UploadService();