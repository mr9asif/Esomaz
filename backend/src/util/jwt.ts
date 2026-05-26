import jwt from "jsonwebtoken";
import type { JwtUserPayload } from "../modules/user/user.type.js";

export const generateToken = (
  payload: {
    id: string;
    email: string;
  }
) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};
export const verifyToken = (token: string): JwtUserPayload => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtUserPayload;
};