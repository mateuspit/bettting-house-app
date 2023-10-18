import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { gamesService } from '@/services';

export async function createGame(req: Request, res: Response) {
    try {
        const result = await gamesService.createGame(req.body);
        return res.status(httpStatus.CREATED).send(result);
    } catch (err) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}