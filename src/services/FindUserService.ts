import { prismaClient } from '../prisma';

class FindUserService {
  async execute() {
    const users = await prismaClient.user.findMany();
    return users;
  }
}

export { FindUserService };