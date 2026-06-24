import type { Request, Response } from "express";
import {
  getFollowersService,
  getFollowingService,
  getWhoToFollowService,
  toggleFollowService,
} from "./follow.service.js";

export const toggleFollowController = async (
  req: Request,
  res: Response
) => {

  const result = await toggleFollowService(
    req.user.id,
    req.params.userId as string
  );

  res.json({
    success: true,
    data: result,
  });

};

export const getFollowersController = async (
  req: Request,
  res: Response
) => {

  const result = await getFollowersService(
    req.params.userId as string
  );

  res.json({
    success: true,
    data: result,
  });

};

export const getFollowingController = async (
  req: Request,
  res: Response
) => {

  const result = await getFollowingService(
    req.params.userId as string
  );

  res.json({
    success: true,
    data: result,
  });

};

// get 3 top follwoing id
export const getWhoToFollow = async (
  req: Request,
  res: Response
) => {
  const users =
    await getWhoToFollowService(
      req.user.id
    );

  res.status(200).json({
    success: true,
    data: users,
  });
};
