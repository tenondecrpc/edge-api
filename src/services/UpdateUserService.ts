class UpdateUserService {
  async execute(prismaClient, data) {
    const user = await prismaClient.user.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
    },
    });
    return user;
  }
}

export { UpdateUserService };