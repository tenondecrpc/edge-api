import { Router } from 'express';
import { AuthUserController } from './controllers/AuthUserController';
import { CreateUserController } from './controllers/CreateUserController';
import { FindByIdUserController } from './controllers/FindByIdUserController';
import { FindUserController } from './controllers/FindUserController';
import { RemoveUserController } from './controllers/RemoveUserController';
import { UpdateUserController } from './controllers/UpdateUserController';

const router = Router();

router.post('/auth', new AuthUserController().handle);
router.post('/create', new CreateUserController().handle);
router.get('/find', new FindUserController().handle);
router.get('/find/:id', new FindByIdUserController().handle);
router.put('/update/:id', new UpdateUserController().handle);
router.delete('/remove/:id', new RemoveUserController().handle);

export { router };