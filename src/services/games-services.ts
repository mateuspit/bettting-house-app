import httpStatus from 'http-status';
import gamesRepository from '@/repositories/games.repositories';
import participantsRepository from '@/repositories/participants-repository';
//import betsRepository from '@/repositories/bets-repository';
import { Game, PostGame } from '../protocols';
//import { noContentError, notFoundError } from '@/errors';
//import roundDown from '@/utils/roundDown';


async function createGame(
    gameData: Omit<PostGame, 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>,
): Promise<Game> {
    const now = new Date();
    const game = await gamesRepository.createGame({
        ...gameData,
        createdAt: now,
        updatedAt: now,
        homeTeamScore: 0,
        awayTeamScore: 0,
        isFinished: false,
    });

    return game;
}

export const gamesService = {
    createGame,
};