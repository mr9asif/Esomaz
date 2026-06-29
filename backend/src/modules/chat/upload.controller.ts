import type { Request, Response } from "express";
import { uploadService } from "./upload.service.js";

export const uploadAttachments = async (
  req: Request,
  res: Response
) => {
  try {
    const files =
      (req.files as Express.Multer.File[]) ?? [];

    if (!files.length) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded.",
      });
    }

    const attachments =
      await uploadService.uploadAttachments(
        files
      );

    return res.status(200).json({
      success: true,
      message: "Files uploaded successfully.",
      data: attachments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Upload failed.",
    });
  }
};