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
  it("should create new user correctly", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const service = new CreateUserService();
    await service.execute(prismaClient, user);

    const newUser = await prismaClient.user.findFirst({
      where: {
        email: user.email
      },
    });
    expect(newUser.email).toBe(user.email);
  });

  it("fails if tries to create records with the same user twice", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const service = new CreateUserService();

    const { user: newUser } = await service.execute(prismaClient, user);
    expect(newUser.email).toBe(user.email);

    await expect(() => service.execute(prismaClient, user)).rejects.toThrow(
      "Unique constraint failed on the fields:"
    );
  });
});