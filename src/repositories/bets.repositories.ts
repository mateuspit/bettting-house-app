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

async function fetchBets() {
    return prisma.bet.findMany();
}

async function modifyBet(id: number, status: string, amountWon: number) {
    return await prisma.bet.update({
        where: {
            id,
        },
        data: {
            status,
            amountWon,
            updatedAt: new Date(),
        },
    });
}


const betsRepository = {
    createBet,
    fetchBets,
    modifyBet,
};

export default betsRepository;