import { tokenType } from "@prisma/client";
import { prisma } from "@src/db";
import { getEnv } from "@src/utils/getEnv";

async function deleteTokenFromDb(userId: number, tokenType: tokenType) {
  await prisma.userToken.delete({
    where: {
      userId_tokenType: {
        userId,
        tokenType,
      },
    },
  });
}

async function saveTokenToDbIfExistUpdate(
    token: string,
    userId: number,
    tokenType: tokenType,
) {
  let expiryTime: Date;
  switch (tokenType) {
    case "EMAIL_VERIFICATION":
      expiryTime = new Date(Date.now() + Number(getEnv("tokenExpiry.EMAIL_VERIFICATION")) * 1000,
      );
      break;
    case "PASSWORD_RESET":
      expiryTime = new Date(Date.now() + Number(getEnv("tokenExpiry.PASSWORD_RESET")) * 1000,
      );
      break;
  }
  return await prisma.userToken.upsert({
    create: {
      token,
      userId,
      tokenType,
      expiry: expiryTime,
    },
    update: {
      token,
      userId,
      tokenType,
      expiry: expiryTime,
    },
    where: {
      userId_tokenType: {
        userId,
        tokenType,
      },
    },
  });
}

async function findUserToken(userId: number, tokenType: tokenType) {
  return await prisma.userToken.findUnique({
    where: {
      userId_tokenType: {
        userId,
        tokenType,
      },
    },
  });
}

export {
  findUserToken,
  deleteTokenFromDb,
  saveTokenToDbIfExistUpdate,
};
