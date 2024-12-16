import { prisma } from "@src/db";
import { AppError } from "@src/errors/AppError";
import BcryptSvs from "@src/services/auth/bcryptSvs";
import { prismaExclude } from "@src/utils/prisma/prismaExclude";

async function checkEmailUniqueAndCreateCustomer(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    username: string,
    address: string | undefined,
) {
  return await prisma.$transaction(async (tx) => {
    const existingCustomer = await tx.user.findFirst({
      where: {
        OR: [
          { email },
          { username },
        ],
      },
    });

    if (existingCustomer ) {
      const existingField = existingCustomer.email === email ? "email" : "username";
      throw new AppError(`${existingField} already exists`, 409);
    }

    const hashedPassword = await BcryptSvs.hashPassword(password);

    return await tx.user.create({
      data: {
        first_name,
        last_name,
        email,
        username,
        customer: {
          create: {
            address,
          },
        },
        password: hashedPassword,
      },
      select: prismaExclude("User", ["password"]),
    });
  });
}

async function makeUserVerifiedAndDeleteTokenen(user_id: number) {
  return await prisma.$transaction(async (tx) => {
    await tx.userToken.delete({
      where: {
        user_id_tokenType: {
          user_id, tokenType: "EMAIL_VERIFICATION",
        },
      },
    });
    return await tx.user.update({
      where: { id: user_id },
      data: { is_verified: true },
      select: prismaExclude("User", ["password"]),
    });
  });
}

async function updatePasswordAndDeleteToken(user_id: number, password: string) {
  return await prisma.$transaction(async (tx)=> {
    await tx.userToken.delete({
      where: {
        user_id_tokenType: {
          user_id,
          tokenType: "PASSWORD_RESET",
        },
      },
    });
    return await tx.user.update({
      data: { password },
      where: { id: user_id },
      select: { email: true },
    });
  });
}

async function checkCustomerEmailUniqueness(email: string) {
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

async function findUserById(user_id: number) {
  return await prisma.user.findUnique({
    where: { id: user_id },
  });
}

async function findStripeCustomerId(user_id: number) {
  return await prisma.customer.findUnique({ where: {
    id: user_id,
  },
  select: {
    stripe_customer_id: true,
  },
  });
}

async function updateStripeCustomerId(user_id: number, cus_id: string) {
  return await prisma.customer.update({
    where: { id: user_id },
    data: { stripe_customer_id: cus_id },
  });
}

export {
  checkCustomerEmailUniqueness,
  checkEmailUniqueAndCreateCustomer,
  makeUserVerifiedAndDeleteTokenen,
  updatePasswordAndDeleteToken,
  findUserByEmail,
  findUserById,
  findStripeCustomerId,
  updateStripeCustomerId,
};

