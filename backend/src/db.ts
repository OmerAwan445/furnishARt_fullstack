import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

const initializePrisma = () => {
  if (!prisma) {
    console.log('Initializing Prisma Client...');
    prisma = new PrismaClient({
      // log: ['query', 'info', 'warn', 'error'], // Optional logging for debugging
    });
  }
  return prisma;
};

const prismaClient = initializePrisma();

const handleExit = async (signal: string) => {
  console.log(`Received signal: ${signal}. Closing Prisma connection...`);
  try {
    await prismaClient.$disconnect();
    console.log('Prisma Client disconnected successfully.');
  } catch (error) {
    console.error('Error while disconnecting Prisma:', error);
  } finally {
    process.exit(0); // Ensure process exits cleanly
  }
};

// Handle graceful shutdown for various signals
process.on('SIGINT', () => handleExit('SIGINT')); // Ctrl+C
process.on('SIGTERM', () => handleExit('SIGTERM')); // Termination signal
process.on('uncaughtException', async (error) => {
  console.error('Uncaught exception:', error);
  await handleExit('uncaughtException');
});

export { prismaClient as prisma };
