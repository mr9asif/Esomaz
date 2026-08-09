import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.js";
import { generateToken } from "../../util/jwt.js";
import type { RegisterUserPayload } from "./auth.type.js";
import { verifyGoogleToken } from "./google.service.js";

const generateUniqueUsername = async (name: string, email: string) => {
  const emailUsername = email.split("@")[0] ?? "";

  let baseUsername = emailUsername.toLowerCase().replace(/[^a-z0-9_]/g, "");

  if (baseUsername.length < 3) {
    baseUsername = name
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "")
      .slice(0, 20);
  }

  if (baseUsername.length < 3) {
    baseUsername = "user";
  }

  let username = baseUsername;
  let counter = 1;

  while (
    await prisma.user.findUnique({
      where: {
        username,
      },
    })
  ) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  return username;
};

const registerUser = async (payload: RegisterUserPayload) => {
  const existingUser = await prisma.user.findFirst({
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

    if (existingUser.username === payload.username) {
      throw new Error("Username already exists");
    }
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

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

const loginUser = async (identifier: string, password: string) => {
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

  if (!user.password) {
    throw new Error(
      "This account uses Google login. Please continue with Google.",
    );
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

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

const loginWithGoogle = async (idToken: string) => {
  const googleUser = await verifyGoogleToken(idToken);

  let user = await prisma.user.findUnique({
    where: {
      googleId: googleUser.googleId,
    },
  });

  // Google account already connected
  if (!user) {
    user = await prisma.user.findUnique({
      where: {
        email: googleUser.email,
      },
    });
  }

  // Existing user
  if (user) {
    user = await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        // Connect Google account if not already connected
        googleId: user.googleId ?? googleUser.googleId,

        // Keep email verification status
        isVerified: googleUser.emailVerified ? true : user.isVerified,

        // Use Google avatar if user doesn't
        // already have an avatar
        avatar: user.avatar ?? googleUser.avatar,
      },
    });
  }

  // New Google user
  if (!user) {
    const username = await generateUniqueUsername(
      googleUser.name,
      googleUser.email,
    );

    user = await prisma.user.create({
      data: {
        name: googleUser.name,

        username,

        email: googleUser.email,

        password: null,

        googleId: googleUser.googleId,

        avatar: googleUser.avatar,

        isVerified: googleUser.emailVerified,
      },
    });
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

const logoutUser = async () => {
  return {
    success: true,
    message: "logout successfully!",
  };
};
export const AuthService = {
  registerUser,
  loginUser,
  logoutUser,
  loginWithGoogle,
};
