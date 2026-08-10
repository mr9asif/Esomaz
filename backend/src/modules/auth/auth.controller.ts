import type { Request, Response } from "express";
import { cookieOptions } from "../../util/cookieOption.js";
import { AuthService } from "./auth.service.js";

const register = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.registerUser(req.body);

    res.cookie("token", result.token, cookieOptions);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const result = await AuthService.loginUser(identifier, password);
    console.log(result.token);
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

const googleLogin = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Google ID token is required",
      });
    }

    const result = await AuthService.loginWithGoogle(idToken);

    res.cookie("token", result.token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      data: result,
    });
  } catch (error: any) {
    console.error("Google login error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Google login failed",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const result = await AuthService.logoutUser();

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
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
  googleLogin,
};
