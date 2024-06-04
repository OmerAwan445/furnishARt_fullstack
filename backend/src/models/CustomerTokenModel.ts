import { tokenType } from "@prisma/client";
import { prisma } from "@src/db";
import { getEnv } from "@src/utils/getEnv";

async function deleteTokenFromDb(customer_id: number, tokenType: tokenType) {
  await prisma.customerToken.delete({
    where: {
      customer_id_tokenType: {
        customer_id,
        tokenType,
      },
    },
  });
}

async function saveTokenToDbIfExistUpdate(
    token: string,
    customer_id: number,
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
  return await prisma.customerToken.upsert({
    create: {
      token,
      customer_id,
      tokenType,
      expiry: expiryTime,
    },
    update: {
      token,
      customer_id,
      tokenType,
      expiry: expiryTime,
    },
    where: {
      customer_id_tokenType: {
        customer_id,
        tokenType,
      },
    },
  });
}

async function findCustomerToken(customer_id: number, tokenType: tokenType) {
  return await prisma.customerToken.findUnique({
    where: {
      customer_id_tokenType: {
        customer_id,
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
