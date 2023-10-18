import { prisma } from '@/config/database';
import { PostGame } from '../protocols';

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

const gamesRepository = {
    createGame,
    fetchGames,
    getGameById,
    finishGame
};

export default gamesRepository;