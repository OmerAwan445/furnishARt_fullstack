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
    const existingCustomer = await tx.customer.findFirst({
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

    return await tx.customer.create({
      data: {
        first_name,
        last_name,
        email,
        username,
        address,
        password: hashedPassword,
      },
      select: prismaExclude("Customer", ["password"]),
    });
  });
}

async function makeCustomerVerifiedAndDeleteToken(customer_id: number) {
  return await prisma.$transaction(async (tx) => {
    await tx.customerToken.delete({
      where: {
        customer_id_tokenType: {
          customer_id, tokenType: "EMAIL_VERIFICATION",
        },
      },
    });
    return await tx.customer.update({
      where: { id: customer_id },
      data: { is_verified: true },
      select: prismaExclude("Customer", ["password"]),
    });
  });
}

async function updatePasswordAndDeleteToken(customer_id: number, password: string) {
  return await prisma.$transaction(async (tx)=> {
    await tx.customerToken.delete({
      where: {
        customer_id_tokenType: {
          customer_id,
          tokenType: "PASSWORD_RESET",
        },
      },
    });
    return await tx.customer.update({
      data: { password },
      where: { id: customer_id },
      select: { email: true },
    });
  });
}

async function checkCustomerEmailUniqueness(email: string) {
  const isEmailUnique = await prisma.customer.findUnique({
    where: {
      email,
    },
  });
  return isEmailUnique == null;
}

async function findCustomerByEmail(email: string) {
  return await prisma.customer.findUnique({
    where: { email },
  });
}

async function findCustomerById(customer_id: number) {
  return await prisma.customer.findUnique({
    where: { id: customer_id },
  });
}

async function findStripeCustomerId(customer_id: number) {
  return await prisma.customer.findUnique({ where: {
    id: customer_id,
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
  makeCustomerVerifiedAndDeleteToken,
  updatePasswordAndDeleteToken,
  findCustomerByEmail,
  findCustomerById,
  findStripeCustomerId,
  updateStripeCustomerId,
};

