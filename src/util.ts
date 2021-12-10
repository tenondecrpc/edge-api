import { CreateUserService } from './services/CreateUserService';
import { prismaClient, prisma } from './prisma';

async function initData() {
  const service = new CreateUserService();
  const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: 'tenondecrpc@gmail.com', 
      password: "hola1234"
    };
  try {
    await service.execute(prismaClient, user);
    console.log("Super admin created!");
  } catch (error) {
    if (error instanceof prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === 'P2002') {
        console.log("Super admin already created!");
        return;
      }
    }
    console.log(error.message);
  }
}

export { initData };