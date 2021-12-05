import { Router } from 'express';

const router = Router();

router.get('/helloworld', (request, response) => { console.log('Hello World'); response.sendStatus(200) });

export { router };