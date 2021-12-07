import { PrismaClient, Prisma } from '@prisma/client';

const prismaClient = new PrismaClient();
const prisma = Prisma;

export { prismaClient, prisma };