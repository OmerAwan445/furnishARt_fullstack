import { tokenType } from "@prisma/client";
import { prisma } from "@src/db";
import { getEnv } from "@src/utils/getEnv";

async function deleteTokenFromDb(user_id: number, tokenType: tokenType) {
  await prisma.userToken.delete({
    where: {
      user_id_tokenType: {
        user_id,
        tokenType,
      },
    },
  });
}

async function saveTokenToDbIfExistUpdate(
    token: string,
    user_id: number,
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
      user_id,
      tokenType,
      expiry: expiryTime,
    },
    update: {
      token,
      user_id,
      tokenType,
      expiry: expiryTime,
    },
    where: {
      user_id_tokenType: {
        user_id,
        tokenType,
      },
    },
  });
}

async function findCustomerToken(user_id: number, tokenType: tokenType) {
  return await prisma.userToken.findUnique({
    where: {
      user_id_tokenType: {
        user_id,
        tokenType,
      },
    },
  });
}

export {
  findCustomerToken,
  deleteTokenFromDb,
  saveTokenToDbIfExistUpdate,
};
