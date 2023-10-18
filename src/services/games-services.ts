import httpStatus from 'http-status';
import gamesRepository from '@/repositories/games.repositories';
import participantsRepository from '@/repositories/participants-repository';
//import betsRepository from '@/repositories/bets-repository';
import { Game, PostGame } from '../protocols';
//import { noContentException, notFoundError } from '@/errors';
import { noContentException, notFoundException } from '@/errors';
//import roundDown from '@/utils/roundDown';

// Interface para a resposta da API de jogos
interface ApiResponse<Game> {
    status: number;
    data: Game[] | Game | null;
}


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

async function getGames(): Promise<ApiResponse<Game>> {
    const games = await gamesRepository.fetchGames();
    if (!games || !games.length) {
        throw noContentException("No have games posted.")
    }
    return {
        status: httpStatus.OK,
        data: games,
    };
}

async function getGameById(id: number): Promise<ApiResponse<Game>> {
    const game = await gamesRepository.getGameById(id);
    if (!game) {
        // Retorna o status 404 (Not Found) quando nenhum jogo é encontrado
        throw notFoundException();
    }
    return {
        status: httpStatus.OK,
        data: game,
    };
}

export const gamesService = {
    createGame,
    getGames,
    getGameById,
};