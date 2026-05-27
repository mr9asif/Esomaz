import type { Request, Response } from "express";
import { cookieOptions } from "../../util/cookieOption.js";
import { AuthService } from "./auth.service.js";


const register = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await AuthService.registerUser(
        req.body
      );

      res.cookie("token", result.token, cookieOptions);
    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    
    });
  
  }
};

const login = async (
  req: Request,
  res: Response
) => {
  try {
    const result =
      await AuthService.loginUser(
        req.body.email,
        req.body.password
      );

    
res.cookie("token", result.token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const logout = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await AuthService.logoutUser();

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const AuthController = {
  register,
  login,
};