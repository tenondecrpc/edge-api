class CreateUserService {
  async execute(prismaClient, data) {
    const user = await prismaClient.user.create({
      data: {
        ...data
      }
    });
    return { user };
  }
}

export { CreateUserService };