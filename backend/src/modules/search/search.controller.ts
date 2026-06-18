import type { Request, Response } from "express";
import { searchService } from "./search.service.js";

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