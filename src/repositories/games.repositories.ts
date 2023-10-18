import { prisma } from '@/config/database';
import { PostGame } from '../protocols';

async function createGame(gameData: PostGame) {
    return prisma.game.create({ data: gameData });
}

const gamesRepository = {
    createGame,
};

export default gamesRepository;