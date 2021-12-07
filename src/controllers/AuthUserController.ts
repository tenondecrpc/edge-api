import { Request, Response } from 'express';
import { AuthUserService } from '../services/AuthUserService';
import validator from 'validator';

class AuthUserController {
  async handle(request: Request, response: Response) {
    const {
      body
    } = request || {};
    const {
        email,
        password
    } = body || {};
    if (!email || !validator.isEmail(email)) return response.status(400).send({ message: "INVALID_EMAIL" });
    if (!password || !validator.isLength(password, { min: 8 })) return response.status(400).send({ message: "INVALID_PASSWORD" });
    
    const service = new AuthUserService();
    try {
      const {user, accessToken, refreshToken} = await service.execute(email);
      if (!user) {
        response.status(404).send({ message: 'USER_NOT_FOUND' });
        return;
      }
      if (user.password !== password) {
        response.status(400).send({ message: 'INVALID_PASSWORD' });
        return;
      }
      response.status(200).send({name: user.name, accessToken, refreshToken});
    } catch (error) {
      response.status(400).send({message: error.message});
    }
  }
}

export { AuthUserController };