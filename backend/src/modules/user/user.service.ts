import { prisma } from "../../config/prisma.js";




export const getMeService = async () => {
  const user = await prisma.user.findUnique({
    where: {
      id:"2c432336-5d52-4dbd-8f16-3deadd43668b",
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      bio: true,
      avatar: true,
      coverPhoto: true,
      isVerified: true,
      createdAt: true,
    },
  });
console.log(user)
  return user;
};