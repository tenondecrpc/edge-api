import { FindUserService } from "../services/FindUserService";
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

describe("FindService() - unit", () => {
  it("should find record of user correctly", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    await createService.execute(prismaClient, user);

    const authService = new FindUserService();
    expect(authService.execute(prismaClient)).toBeTruthy();
  });
});