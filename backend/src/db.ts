import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient | null = null;

const getPrismaClient = (): PrismaClient => {
  if (!prismaInstance) {
    console.log('Creating Prisma client instance'); // Log the creation of the Prisma client
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};

const prisma = getPrismaClient();

export { prisma };
