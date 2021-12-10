import { CreateUserService } from "../services/CreateUserService";
import { UpdateUserService } from "../services/UpdateUserService";
import { v4 as uuidv4 } from "uuid";
import { prismaClient } from "../prisma";

beforeAll(async () => {
  await prismaClient.user.deleteMany({});
});

afterAll(async () => {
  await prismaClient.user.deleteMany({});
  await prismaClient.$disconnect();
});

describe("UpdateUserService() - unit", () => {
  it("should update user correctly", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    const {user: newUser} = await createService.execute(prismaClient, user);
    expect(newUser.email).toBe(user.email);

    const updateService = new UpdateUserService();
    const updateUser = await updateService.execute(prismaClient, {id: newUser.id, name: 'Ramon'});
    expect(newUser.name).not.toBe('Ramon');
  });

  it("fails if tries to create update when id does not exist", async () => {
    const user = {
      name: "Cristian", 
      role: "ADMIN", 
      email: `${uuidv4()}@gmail.com`, 
      password: "hola1234"
    };

    const createService = new CreateUserService();
    const {user: newUser} = await createService.execute(prismaClient, user);
    expect(newUser.email).toBe(user.email);

    const updateService = new UpdateUserService();
    await expect(() => updateService.execute(prismaClient, {id: uuidv4(), name: 'Ramon'})).rejects.toThrow(
      "Record to update not found"
    );
  });
});