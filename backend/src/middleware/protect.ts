import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../util/jwt.js";


export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

 const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    // 1. Check Authorization Header
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // 2. Check Cookies if no Bearer token
    if (!token) {
      token = req.cookies?.token;
    }

    // 3. No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default protect;