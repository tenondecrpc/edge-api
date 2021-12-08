import { prismaClient } from '../prisma';

interface IFilter {
  skip?: number,
  take?: number,
  where?: object,
  orderBy?: object
}

class FindByFilterUserService {
  async execute(page, role, sortBy, order) {
    const filter: IFilter = {};
    const take = 1;
    filter.take = take;
    const skip = page && page > 1 ? (page - 1) * take : null;
    if (skip) {
      filter.skip = skip;
    }
    const where = role ? {
      role: role
    } : null;
    if (where) {
      filter.where = where;
    }
    const orderBy = sortBy ? {
      [sortBy]: order === 'asc' ? 'asc' : 'desc',
    } : null;
    if (sortBy) {
      filter.orderBy = orderBy;
    }

    const users = await prismaClient.user.findMany(filter);
    return users;
  }
}

export { FindByFilterUserService };