import { prismaClient } from '../prisma';

class FindByIdUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id
      }
    });
    return user;
  }
}

export { FindByIdUserService };