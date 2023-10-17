import { Router } from 'express';
import { validateBody } from '@/middlewares';
//import { createParticipant, getParticipants } from '@/controllers';
import { createParticipant } from '@/controllers';
import { participantsSchema } from '@/schemas';

const participantsRouter = Router();

participantsRouter
    //.get('/', getParticipants)
    .post('/', validateBody(participantsSchema), createParticipant);

export { participantsRouter };