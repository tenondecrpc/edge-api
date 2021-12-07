import { Request, Response } from "express";
import validator from 'validator';
import { prisma } from "../prisma";
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      body
    } = request || {};
    const {
      name,
      role,
      email,
      password
    } = body || {};
    if (!name || !validator.isAlpha(name)) return response.status(400).send({ message: "INVALID_NAME" });
    if (!role || !validator.isAlpha(role)) return response.status(400).send({ message: "INVALID_ROLE" });
    if (!email || !validator.isEmail(email)) return response.status(400).send({ message: "INVALID_EMAIL" });
    if (!password || !validator.isLength(password, { min: 8 })) return response.status(400).send({ message: "INVALID_PASSWORD" });
    
    const service = new CreateUserService();
    try {
      const {user, accessToken} = await service.execute(name, role, email, password);
      response.status(200).send({name: user.name, accessToken, refreshToken: user.refreshToken});
    } catch (error) {
       if (error instanceof prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          response.status(400).send({ message: 'DUPLICATED_EMAIL' });
          return;
        }
      }
      response.status(400).send({ message: error.message });
    }
  }
}

export { CreateUserController };