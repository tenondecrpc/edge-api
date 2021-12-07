import { Router } from 'express';
import { AuthUserController } from './controllers/AuthUserController';
import { CreateUserController } from './controllers/CreateUserController';

const router = Router();

router.post('/auth', new AuthUserController().handle);
router.post('/create', new CreateUserController().handle);

export { router };