import { Request, Response } from "express";
import { FindByFilterUserService } from "../services/FindByFilterUserService";

class FindByFilterUserController {
  async handle(request: Request, response: Response) {
    const { query } = request || {};
    const { page, role, sortBy, order} = query || {};

    const service = new FindByFilterUserService();
    try {
      const users = await service.execute(page, role, sortBy, order);
      const filter = [];
      users.forEach(item => {
        const obj = {
          id: item.id,
          name: item.name,
          role: item.role,
          email: item.email
        };
        filter.push(obj);
      });
      response.status(200).send(filter);
    } catch (error) {
      response.status(400).send({message: error.message});
    }
  }
}
export { FindByFilterUserController };