import { FindByFilterUserService } from "../services/FindByFilterUserService";
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

describe("FindByFilterService() - unit", () => {
  it("find record of user correctly", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    await createService.execute(prismaClient, user);

    const authService = new FindByFilterUserService();
    const filter = {
      page: 1,
      role: 'ADMIN',
      sortBy: 'name',
      order: 'asc'
    };
    expect(authService.execute(prismaClient, filter)).toBeTruthy();
  });

  it("fails if tries to find when role does not exist", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    const {user: newUser} = await createService.execute(prismaClient, user);
    expect(newUser.email).toBe(user.email);

    const authService = new FindByFilterUserService();
    const filter = {
      role: 'UNKNOWN'
    };
    expect(await authService.execute(prismaClient, filter)).toEqual([]);
  });
});