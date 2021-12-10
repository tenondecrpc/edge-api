import { AuthUserService } from "../services/AuthUserService";
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

describe("AuthUserService() - unit", () => {
  it("should auth existing user correctly", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    await createService.execute(prismaClient, user);

    const authService = new AuthUserService();
    expect(authService.execute(prismaClient, user.email)).toBeTruthy();
  });

  it("fails if tries to auth when email does not exist", async () => {
    const user = {
      email: 'unknown@test.com'
    };

    const authService = new AuthUserService();
    expect(await authService.execute(prismaClient, user.email)).toEqual({user: null});
  });
});