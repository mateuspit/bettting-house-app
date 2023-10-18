import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { participantsService } from '@/services';

export async function createParticipant(req: Request, res: Response) {
    try {
        const participant = await participantsService.createParticipant(req.body);
        return res.status(httpStatus.CREATED).send(participant);
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
}

export async function getParticipants(res: Response) {
    try {
        const participant = await participantsService.getParticipants();
        return res.status(participant.status).send(participant.data);
    } catch (err) {
        return res.sendStatus(httpStatus.NO_CONTENT)
    }
}