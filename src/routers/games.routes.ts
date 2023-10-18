import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { gamesSchema } from '@/schemas';
import { createGame } from '@/controllers';

const gamesRouter = Router();

gamesRouter
    .post('/', validateBody(gamesSchema), createGame)

export { gamesRouter };