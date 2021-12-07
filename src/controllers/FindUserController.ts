import { Request, Response } from "express";
import { FindUserService } from "../services/FindUserService";

class FindUserController {
  async handle(request: Request, response: Response) {
    const service = new FindUserService();
    try {
      const users = await service.execute();
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
export { FindUserController };