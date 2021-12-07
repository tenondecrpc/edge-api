import { Router } from 'express';
import { AuthUserController } from './controllers/AuthUserController';
import { CreateUserController } from './controllers/CreateUserController';
import { FindUserController } from './controllers/FindUserController';

const router = Router();

router.post('/auth', new AuthUserController().handle);
router.post('/create', new CreateUserController().handle);
router.get('/find', new FindUserController().handle);

export { router };