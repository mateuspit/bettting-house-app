import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { gamesSchema } from '@/schemas';
import { createGame, getGames } from '@/controllers';

const gamesRouter = Router();

gamesRouter
    .post('/', validateBody(gamesSchema), createGame)
    .get('/', getGames)

export { gamesRouter };