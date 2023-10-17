import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { participantsService } from '@/services';

export async function createParticipant(req: Request, res: Response) {
    try {
        const result = await participantsService.createParticipant(req.body);
        return res.status(httpStatus.CREATED).send(result);
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
}

//export async function getParticipants(res: Response) {
//    try {
//        const result = await participantsService.getParticipants();
//        return res.status(result.status).send(result.data);
//    } catch (err) {
//        return res.sendStatus(httpStatus.NO_CONTENT)
//    }
//}