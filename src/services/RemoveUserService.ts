import { prismaClient } from '../prisma';

class RemoveUserService {
  async execute(id: string) {
    const user = await prismaClient.user.delete({
      where: {
        id: id
      }
    });
    return user;
  }
}

export { RemoveUserService };