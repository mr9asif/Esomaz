import type {
  NextFunction,
  Request,
  Response,
} from "express";

import { verifyToken } from "../utils/jwt";

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =req.headers.authorization;
    console.log("token auth", token)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded =
      verifyToken(token);

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};