class RemoveUserService {
  async execute(prismaClient, id) {
    const user = await prismaClient.user.delete({
      where: {
        id: id
      }
    });
    return user;
  }
}

export { RemoveUserService };