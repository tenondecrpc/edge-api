import {prismaClient} from "../prisma";

class CreateUserService {
  async execute(name: string, role: string, email: string, password: string) {
    const accessToken = 'TEST';
    const refreshToken = 'TEST';
    const user = await prismaClient.user.create({
      data: {
        name,
        role,
        email,
        password,
        refreshToken
      }
    });
    return {user, accessToken};
  }
}

export { CreateUserService };