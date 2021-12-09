import { FindByIdUserService } from "../services/FindByIdUserService";
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

describe("FindByIdService() - unit", () => {
  it("find record of user correctly", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    const { user: newUser } = await createService.execute(prismaClient, user);

    const authService = new FindByIdUserService();
    const id = newUser.id;
    expect(authService.execute(prismaClient, id)).toBeTruthy();
  });

  it("fails if tries to find when id does not exist", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    const { user: newUser } = await createService.execute(prismaClient, user);
    const authService = new FindByIdUserService();
    expect(await authService.execute(prismaClient, uuidv4())).toEqual(null);
  });
});