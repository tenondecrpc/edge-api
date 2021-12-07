import { Request, Response } from "express";
import { FindUserService } from "../services/FindUserService";

class FindUserController {
  async handle(request: Request, response: Response) {
    const service = new FindUserService();
    try {
      const users = await service.execute();
      response.status(200).send(users);
    } catch (error) {
      response.status(400).send({message: error.message});
    }
  }
}
export { FindUserController };