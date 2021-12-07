import { Request, Response } from "express";
import validator from 'validator';
import { prisma } from "../prisma";
import { RemoveUserService } from "../services/RemoveUserService";

class RemoveUserController {
  async handle(request: Request, response: Response) {
    const { params } = request || {};
    const { id } = params || {};
    if (!id || !validator.isUUID(id.toString())) return response.status(400).send({ message: "INVALID_ID" });
    
    const service = new RemoveUserService();
    try {
      await service.execute(id);
      response.sendStatus(200);
    } catch (error) {
      if (error instanceof prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2025') {
          response.status(400).send({ message: 'USER_NOT_FOUND' });
          return;
        }
      }
      response.status(400).send({message: error.message});
    }
  }
}
export { RemoveUserController };