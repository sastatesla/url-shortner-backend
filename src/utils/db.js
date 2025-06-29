import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log('[Prisma] Connected to the database');
  } catch (error) {
    console.error('[Prisma] Connection failed:', error);
  }
})();

export default prisma;
