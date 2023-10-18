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

export async function getGames(req: Request, res: Response) {
    try {
        const result = await gamesService.getGames();
        return res.status(result.status).send(result.data);
    } catch (err) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function getGameById(req: Request, res: Response) {
    try {
        const result = await gamesService.getGameById(parseInt(req.params.id, 10));
        return res.status(result.status).send(result.data);
    } catch (err) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}