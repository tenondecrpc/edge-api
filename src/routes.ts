import { Router } from 'express';
import { AuthUserController } from './controllers/AuthUserController';
import { CreateUserController } from './controllers/CreateUserController';
import { FindByFilterUserController } from './controllers/FindByFilterUserController';
import { FindByIdUserController } from './controllers/FindByIdUserController';
import { FindUserController } from './controllers/FindUserController';
import { RemoveUserController } from './controllers/RemoveUserController';
import { UpdateUserController } from './controllers/UpdateUserController';
import { ensureAuth, requireRole, requireVersion } from './middleware/ensureAuth';

const router = Router();

// Public routers
router.post('/auth', new AuthUserController().handle);

// Private routers
router.use(ensureAuth);
router.post('/create', requireRole(['ADMIN']), requireVersion(1), new CreateUserController().handle);
router.get('/find', requireRole(['ADMIN']), requireVersion(1), new FindUserController().handle);
router.get('/find', requireRole(['ADMIN', 'BUSINESSADMIN']), requireVersion(2), new FindByFilterUserController().handle);
router.get('/find/:id', requireRole(['ADMIN']), requireVersion(1), new FindByIdUserController().handle);
router.put('/update/:id', requireRole(['ADMIN']), requireVersion(1), new UpdateUserController().handle);
router.delete('/remove/:id', requireRole(['ADMIN']), requireVersion(1), new RemoveUserController().handle);

export { router };