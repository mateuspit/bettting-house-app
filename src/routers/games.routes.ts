import { Router } from 'express';
import { validateBody, validateParams } from '@/middlewares';
import { gamesSchema, gameWithIdOnParams, finishGameSchema } from '@/schemas';
import { createGame, getGames, getGameById, finishGame } from '@/controllers';

const gamesRouter = Router();

gamesRouter
    .post('/', validateBody(gamesSchema), createGame)
    .get('/', getGames)
    .get('/:id', validateParams(gameWithIdOnParams), getGameById)
    .post('/:id/finish', validateParams(gameWithIdOnParams), validateBody(finishGameSchema), finishGame);

export { gamesRouter };