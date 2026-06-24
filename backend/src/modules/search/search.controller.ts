import type { Request, Response } from "express";
import { getPostByIdService, searchService } from "./search.service.js";

export const searchController = async (
  req: Request,
  res: Response
) => {

  const currentUserId = req.user.id;

  const q = req.query.q as string;

  const type = (req.query.type as string) || "all";

  const result = await searchService(
    currentUserId,
    q,
    type
  );

  res.status(200).json({

    success: true,

    data: result,

  });

};

export const getPostById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const post = await getPostByIdService(id as string);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch post",
    });
  }
};