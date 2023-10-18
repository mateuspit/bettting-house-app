import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { betsService } from '@/services';

export async function createBet(req: Request, res: Response) {
    try {
        const result = await betsService.createBet(req.body);
        return res.status(httpStatus.CREATED).send(result);
    } catch (err) {
        if (err.name === 'UnauthorizedError') {
            return res.sendStatus(httpStatus.FORBIDDEN);
        }
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}