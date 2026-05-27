import type { Response } from "express";

import { prisma } from "../../config/prisma.js";
import type { AuthRequest } from "../../middleware/protect.js";
import uploadToCloudinary from "../../util/uploadToCloudinary.js";
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




export const updateAvatar = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "avatars"
    );

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: (result as any).secure_url,
      },
      select: {
        id: true,
        name: true,
        username: true,
        avatar: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Avatar updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update avatar error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload avatar",
    });
  }
};


export const updateCoverPhoto = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    if (!req.file.mimetype.startsWith("image/")) {
      return res.status(400).json({
        success: false,
        message: "Only image files are allowed",
      });
    }

    const result = await uploadToCloudinary(
      req.file.buffer,
      "coverPhoto"
    );

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        coverPhoto: (result as any).secure_url,
      },
      select: {
        id: true,
        name: true,
        username: true,
        coverPhoto: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "coverPhoto updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Update coverPhoto error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload coverPhoto",
    });
  }
};