class FindUserService {
  async execute(prismaClient) {
    const users = await prismaClient.user.findMany();
    return users;
  }
}

export { FindUserService };