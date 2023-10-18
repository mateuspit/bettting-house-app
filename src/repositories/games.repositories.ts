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

const gamesRepository = {
    createGame,
    fetchGames,
    getGameById,
};

export default gamesRepository;