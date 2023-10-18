import { Router } from 'express';
import { validateBody, validateParams } from '@/middlewares';
import { gamesSchema, gameWithIdOnParams } from '@/schemas';
import { createGame, getGames, getGameById } from '@/controllers';

const gamesRouter = Router();

gamesRouter
    .post('/', validateBody(gamesSchema), createGame)
    .get('/', getGames)
    .get('/:id', validateParams(gameWithIdOnParams), getGameById)

export { gamesRouter };