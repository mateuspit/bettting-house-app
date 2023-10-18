import { prisma } from '@/config/database';
import { PostGame } from '../protocols';

async function createGame(gameData: PostGame) {
    return prisma.game.create({ data: gameData });
}

async function fetchGames() {
    return prisma.game.findMany();
}

const gamesRepository = {
    createGame,
    fetchGames,
};

export default gamesRepository;