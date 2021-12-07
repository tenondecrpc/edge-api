import { prismaClient } from "../prisma";

class UpdateUserService {
  async execute(id: string, name: string) {
    const user = await prismaClient.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
    },
    });
    return user;
  }
}

export { UpdateUserService };