import { prisma } from "../../config/prisma.js";




export const getMeService = async (userId:string) => {
  const user = await prisma.user.findUnique({
    where: {
      id:userId,
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
// console.log(user)
  return user;
};