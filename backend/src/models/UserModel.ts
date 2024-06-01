import { prisma } from "@src/db";
import { prismaExclude } from "../utils/prisma/prismaExclude";
import { AppError } from "@src/errors/AppError";
import { hashPassword } from "@src/services/auth/bcryptPasswordSvs";

async function checkEmailUniqueAndCreateUser(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
) {
  return await prisma.$transaction(async (tx) => {
    const existingUser = await tx.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Email already exists', 409);
    }

    const hashedPassword = await hashPassword(password);
    return await tx.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });
  });
}

async function makeUserVerifiedAndDeleteToken(userId: number) {
  return await prisma.$transaction(async (tx) => {
    await tx.userToken.delete({
      where: {
        userId_tokenType: {
          userId, tokenType: "EMAIL_VERIFICATION",
        },
      },
    });
    return await tx.user.update({
      where: { id: userId },
      data: { is_verified: true },
      select: prismaExclude("User", ["password"]),
    });
  });
}

async function updatePasswordAndDeleteToken(userId: number, password: string) {
  return await prisma.$transaction(async (tx)=> {
    await tx.userToken.delete({
      where: {
        userId_tokenType: {
          userId,
          tokenType: "PASSWORD_RESET",
        },
      },
    });
    return await tx.user.update({
      data: { password },
      where: { id: userId },
      select: { email: true },
    });
  });
}

async function checkUserEmailUniquenes(email: string) {
  const isEmailUnique = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return isEmailUnique == null;
}

async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

async function findUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
}

export {
  checkUserEmailUniquenes,
  checkEmailUniqueAndCreateUser,
  makeUserVerifiedAndDeleteToken,
  updatePasswordAndDeleteToken,
  findUserByEmail,
  findUserById,
};

