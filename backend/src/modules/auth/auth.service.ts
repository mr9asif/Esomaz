import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.js";
import { generateToken } from "../../util/jwt.js";
import type { RegisterUserPayload } from "./auth.type.js";


const registerUser = async (
  payload: RegisterUserPayload
) => {
  const existingUser =
    await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: payload.email,
          },
          {
            username: payload.username,
          },
        ],
      },
    });

  if (existingUser) {
    if (existingUser.email === payload.email) {
      throw new Error("Email already exists");
    }

    if (
      existingUser.username === payload.username
    ) {
      throw new Error("Username already exists");
    }
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    10
  );

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      username: payload.username,
      email: payload.email,
      password: hashedPassword,
    },
  });


  const token = generateToken({
    id: user.id,
      username: user.username,
    email: user.email,
  });

  

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  };
};

const loginUser = async (
  identifier: string,
  password: string
) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: identifier,
        },
        {
          username: identifier,
        },
      ],
    },
  });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatched =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken({
    id: user.id,
      username: user.username,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  };
};


const logoutUser = async()=>{
   return {
     success:true,
     message:"logout successfully!"
   }
}
export const AuthService = {
  registerUser,
  loginUser,
  logoutUser
};