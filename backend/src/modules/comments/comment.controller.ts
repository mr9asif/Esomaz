import type { Request, Response } from "express";

import {
    createCommentService,
    deleteCommentService,
    getCommentsService,
    updateCommentService,
} from "./comment.service.js";

export const createCommentController = async (
  req: Request,
  res: Response
) => {

  const userId = req.user.id;

  const result = await createCommentService(
    userId,
    req.body
  );

  res.status(201).json({
    success: true,
    data: result,
  });

};

export const getCommentsController = async (
  req: Request,
  res: Response
) => {

  const result = await getCommentsService(
    req.params.postId as string
  );

  res.json({
    success: true,
    data: result,
  });

};

export const updateCommentController = async (
  req: Request,
  res: Response
) => {

  const result = await updateCommentService(
    req.user.id,
    req.params.id as string,
    req.body
  );

  res.json({
    success: true,
    data: result,
  });

};

export const deleteCommentController = async (
  req: Request,
  res: Response
) => {

  await deleteCommentService(
    req.user.id,
    req.params.id as string
  );

  res.json({
    success: true,
    message: "Comment deleted",
  });

};