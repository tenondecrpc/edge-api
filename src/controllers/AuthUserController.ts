import { Request, Response } from 'express';
import { AuthUserService } from '../services/AuthUserService';

class AuthUserController {
  async handle(request: Request, response: Response) {
    const service = new AuthUserService();
    const {
      body: {
        email,
        password
      }
     } = request || {};
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