import { Request, Response } from "express";
import validator from 'validator';
import { FindByFilterUserService } from "../services/FindByFilterUserService";

class FindByFilterUserController {
  async handle(request: Request, response: Response) {
    const { query } = request || {};
    const { page, role, sortBy, order } = query || {};
    if (page && !validator.isNumeric(page.toString())) return response.status(400).send({ message: "INVALID_PAGE" });
    if (role && !validator.isAlpha(role.toString())) return response.status(400).send({ message: "INVALID_ROLE" });
    if (sortBy && !validator.isAlpha(sortBy.toString())) return response.status(400).send({ message: "INVALID_SORTBY" });
    if (page && !validator.isAlpha(order.toString())) return response.status(400).send({ message: "INVALID_ORDER" });

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