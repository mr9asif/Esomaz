import type { Request, Response } from "express";
import { toggleBookmarkService } from "./bookmark,service.js";

export const toggleBookmarkController = async (
  req: Request,
  res: Response
) => {

  const userId = req.user.id;

  const postId = req.params.postId as string;

  const result = await toggleBookmarkService(
    userId,
    postId
  );

  res.status(200).json({
    success: true,
    message: result.message,
    data: result.data,
  });

};