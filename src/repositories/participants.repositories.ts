import { prisma } from "../config";
import { PostParticipant } from '../protocols';

async function fetchParticipants() {
    return prisma.user.findMany();
}

async function createParticipant(participantData: PostParticipant) {
    return prisma.user.create({ data: participantData });
}

async function getParticipantById(id: number) {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}

async function newParticipantBalance(id: number, balance: number) {
    return await prisma.user.update({
        where: {
            id,
        },
        data: {
            balance,
            updatedAt: new Date(),
        },
    });
}

const participantsRepository = {
    fetchParticipants,
    createParticipant,
    getParticipantById,
    newParticipantBalance,
};

export default participantsRepository;