import type { Response } from "express";

import type { AuthRequest } from "../../middleware/protect.js";
import { getMeService } from "./user.service.js";

export const getMe = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;
console.log(userId)

  console.log("Controller reached");
if (!userId) {
  return res.status(401).json({
    success: false,
    message: "Unauthorized",
  });
}
    const user = await getMeService(userId);
    console.log("user", user)
   
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};