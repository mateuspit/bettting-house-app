import { prisma } from '@/config/database';
import { Game, PostGame } from '../protocols';

async function createGame(gameData: PostGame) {
    return prisma.game.create({ data: gameData });
}

async function fetchGames() {
    return prisma.game.findMany();
}

async function getGameById(id: number) {
    return prisma.game.findUnique({
        where: {
            id,
        },
        include: {
            Bet: true,
        },
    });
}

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
    return prisma.game.update({
        where: {
            id,
        },
        data: {
            homeTeamScore,
            awayTeamScore,
            isFinished: true,
            updatedAt: new Date(),
        },
    });
}

export const getGameByHomeTeamAndAwayTeam = (
    gameData: Omit<PostGame, 'createdAt' | 'updatedAt' | 'homeTeamScore' | 'awayTeamScore' | 'isFinished'>
) => {
    return prisma.game.findFirst({
        where: {
            homeTeamName: gameData.homeTeamName,
            awayTeamName: gameData.awayTeamName,
        },
    });
};

const gamesRepository = {
    createGame,
    fetchGames,
    getGameById,
    finishGame,
    getGameByHomeTeamAndAwayTeam
};

export default gamesRepository;