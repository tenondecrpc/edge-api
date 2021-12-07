import { Request, Response } from "express";
import validator from 'validator';
import { FindByIdUserService } from "../services/FindByIdUserService";

class FindByIdUserController {
  async handle(request: Request, response: Response) {
    const { params } = request || {};
    const { id } = params || {};
    if (!id || !validator.isUUID(id)) return response.status(400).send({ message: "INVALID_ID" });
    
    const service = new FindByIdUserService();
    try {
      const user = await service.execute(id);
      if (!user) {
        response.status(404).send({message: 'USER_NOT_FOUND'});
        return;
      }
      response.status(200).send(user);
    } catch (error) {
      response.status(400).send({message: error.message});
    }
  }
}
export { FindByIdUserController };