import { Request, Response } from "express";
import validator from 'validator';
import { prisma } from "../prisma";
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const {
      params,
      body
    } = request || {};
    const {
      name
    } = body || {};
    const {
      id,
    } = params || {};
    if (!id || !validator.isUUID(id.toString())) return response.status(400).send({ message: "INVALID_ID" });
    if (!name || !validator.isAlpha(name.toString())) return response.status(400).send({ message: "INVALID_NAME" });
    
    const service = new UpdateUserService();
    try {
      const user = await service.execute(id, name);
      if (!user) {
        response.status(404).send({message: 'USER_NOT_FOUND'});
        return;
      }
      response.sendStatus(200);
    } catch (error) {
       if (error instanceof prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          response.status(400).send({ message: 'DUPLICATED_EMAIL' });
          return;
        }
        if (error.code === 'P2025') {
          response.status(400).send({ message: 'USER_NOT_FOUND' });
          return;
        }
       }
      response.status(400).send({ message: error.message });
    }
  }
}

export { UpdateUserController };