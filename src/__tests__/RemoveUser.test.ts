import { RemoveUserService } from "../services/RemoveUserService";
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

describe("RemoveUserService() - unit", () => {
  it("should remove record of user correctly", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    const { user: newUser } = await createService.execute(prismaClient, user);
    expect(newUser.email).toBe(user.email);

    const authService = new RemoveUserService();
    const id = newUser.id;
    expect(authService.execute(prismaClient, id)).toBeTruthy();
  });

  it("fails if tries to remove when id does not exist", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    const { user: newUser } = await createService.execute(prismaClient, user);
    expect(newUser.email).toBe(user.email);


    const removeService = new RemoveUserService();
    await expect(() => removeService.execute(prismaClient, uuidv4())).rejects.toThrow(
      "Record to delete does not exist"
    );
  });
});