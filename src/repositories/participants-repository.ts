import { prisma } from "../config";
import { PostParticipant } from '../protocols';

async function fetchParticipants() {
    return prisma.user.findMany();
}

async function createParticipant(participantData: PostParticipant) {
    return prisma.user.create({ data: participantData });
}

const participantsRepository = {
    fetchParticipants,
    createParticipant,
    //retrieveParticipantById,
    //modifyParticipant,
};

export default participantsRepository;