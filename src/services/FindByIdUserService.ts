class FindByIdUserService {
  async execute(prismaClient, id) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: id
      }
    });
    return user;
  }
}

export { FindByIdUserService };