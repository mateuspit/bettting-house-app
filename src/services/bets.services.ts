import { unauthorizedException } from '@/errors';
import { Bet, PostBet } from '../protocols';
import betsRepository from '@/repositories/bets.repositories';
import gamesRepository from '@/repositories/games.repositories';
import participantsRepository from '@/repositories/participants.repositories';

// Função para criar uma nova aposta
async function createBet(betData: Omit<PostBet, 'createdAt' | 'updatedAt' | 'status' | 'amountWon'>): Promise<Bet> {
    // Verifique se o jogo existe e não está finalizado
    const game = await gamesRepository.getGameById(betData.gameId);

    if (!game || game.isFinished) {
        throw unauthorizedException();
    }

    // Verifique se o participante existe e tem saldo suficiente para a aposta
    const participant = await participantsRepository.getParticipantById(betData.userId);

    if (!participant || participant.balance < betData.amountBet) {
        throw unauthorizedException();
    }

    const now = new Date();

    // Crie a aposta com os dados fornecidos
    const bet = await betsRepository.createBet(
        {
            ...betData,
            createdAt: now,
            updatedAt: now,
            status: 'PENDING',
            amountWon: null,
        },
        participant,
    );

    return bet;
}

export const betsService = {
    createBet,
};