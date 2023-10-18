import { prisma } from '@/config/database';
import { Participant, PostBet } from '../protocols';

async function createBet(betData: PostBet, participant: Participant) {
    return prisma.$transaction(async (prismaClient) => {
        const newBalance = participant.balance - betData.amountBet;

        await prismaClient.user.update({
            where: { id: betData.userId },
            data: {
                balance: newBalance,
                updatedAt: new Date(),
            },
        });

        const createdBet = await prismaClient.bet.create({ data: betData });

        return createdBet;
    });
}


const betsRepository = {
    createBet,
};

export default betsRepository;