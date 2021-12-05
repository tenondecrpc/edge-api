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
    const result = service.execute(email, password);
    response.status(200).send(result);
  }
}

export { AuthUserController };