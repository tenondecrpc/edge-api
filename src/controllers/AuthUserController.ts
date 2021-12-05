import { Request, Response } from 'express';
import { AuthUserService } from '../services/AuthUserService';
import validator from 'validator';

class AuthUserController {
  async handle(request: Request, response: Response) {
    const {
      body: {
        email,
        password
      }
    } = request || {};
    if (!validator.isEmail(email)) return response.status(400).send({ message: "INVALID_EMAIL" });
    if (!validator.isLength(password, {min: 8})) return response.status(400).send({ message: "INVALID_PASSWORD" });
    const service = new AuthUserService();
    try {
      const {user, accessToken} = await service.execute(email, password);
      if (!user) {
        response.status(404).send({message: 'USER_NOT_FOUND'});
      }
      response.status(200).send({name: user.name, accessToken: accessToken});
    } catch (error) {
      response.status(400).send({message: error.message});
    }
  }
}

export { AuthUserController };