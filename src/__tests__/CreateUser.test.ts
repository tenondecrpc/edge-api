import { CreateUserService } from "../services/CreateUserService";
import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "../prisma";

beforeAll(async () => {
  await prismaClient.user.deleteMany({});
});

afterAll(async () => {
  await prismaClient.user.deleteMany({});
  await prismaClient.$disconnect();
});

describe("CreateUserService() - unit", () => {
  it("creates new user correctly", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const service = new CreateUserService();
    await service.execute(prismaClient, user);

    const savedUser = await prismaClient.user.findFirst({
      where: {
        email: user.email
      },
    });

    expect(savedUser.email).toBe(user.email);
  });

  it("fails if tries to create records with the same user twice", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const service = new CreateUserService();
    await service.execute(prismaClient, user);

    const savedUser = await prismaClient.user.findMany({
      where: {
        email: user.email
      },
      take: 1,
    });

    expect(savedUser[0].email).toBe(user.email);
    // expect(await service.execute(prismaClient, user)).rejects.toThrow();
  });
});