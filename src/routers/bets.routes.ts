import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { createBet } from '@/controllers';
import { postBetSchema } from '@/schemas';

const betsRouter = Router();

betsRouter
    .post('/', validateBody(postBetSchema), createBet);

export { betsRouter };