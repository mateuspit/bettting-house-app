import httpStatus from 'http-status';
import gamesRepository from '@/repositories/games.repositories';
import participantsRepository from '@/repositories/participants.repositories';
import betsRepository from '@/repositories/bets.repositories';
import { Game, PostGame, Bet } from '../protocols';
import { noContentException, notFoundException, alreadyCreatedException, invalidDataException } from '@/errors';
import roundToDown from '@/utils/roundToDown.function';


interface ApiResponse<Game> {
    status: number;
    data: Game[] | Game | null;
}


async function createGame(
    gameData: Omit<PostGame, 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>,
): Promise<Game> {

    if (gameData.homeTeamName === gameData.awayTeamName) throw invalidDataException(["Same teams"]);

    const registredGame = await gamesRepository.getGameByHomeTeamAndAwayTeam(gameData);
    if (registredGame) throw alreadyCreatedException("Game already created");

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

        throw notFoundException();
    }
    return {
        status: httpStatus.OK,
        data: game,
    };
}

async function finishGame(gameId: number, score: { homeTeamScore: number; awayTeamScore: number }): Promise<Game> {

    const existingGame = await gamesRepository.getGameById(gameId);

    if (!existingGame || existingGame.isFinished) {
        throw notFoundException()
    }

    const updatedGame = await gamesRepository.finishGame(gameId, score.homeTeamScore, score.awayTeamScore);

    const totalWinningAmount = existingGame.Bet.reduce((total: number, bet: Bet) => total + bet.amountBet, 0);
    const houseEdge = 0.3;
    const totalAmountWon = totalWinningAmount * (1 - houseEdge);

    for (const bet of existingGame.Bet) {
        const participant = await participantsRepository.getParticipantById(bet.userId);

        if (bet.status === 'PENDING') {
            if (bet.homeTeamScore === score.homeTeamScore && bet.awayTeamScore === score.awayTeamScore) {
                const betAmount = bet.amountBet;
                const betWinningAmount = roundToDown((betAmount / totalWinningAmount) * totalAmountWon);
                await betsRepository.modifyBet(bet.id, 'WON', betWinningAmount);

                if (participant) {
                    const newBalance = participant.balance + betWinningAmount;
                    await participantsRepository.newParticipantBalance(participant.id, newBalance);
                } else {
                    await betsRepository.modifyBet(bet.id, 'LOST', 0);
                }
            }
        }
    }

    return updatedGame;
}

export const gamesService = {
    createGame,
    getGames,
    getGameById,
    finishGame,
};