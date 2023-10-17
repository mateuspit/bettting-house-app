import { prisma } from "../database";
import { PostParticipant } from '../protocols';

//async function fetchParticipants() {
//    return prisma.participant.findMany();
//}

async function createParticipant(participantData: PostParticipant) {
    return prisma.user.create({ data: participantData });
}

//async function retrieveParticipantById(id: number) {
//    return prisma.participant.findUnique({
//        where: {
//            id,
//        },
//    });
//}

//async function modifyParticipant(id: number, balance: number) {
//    return await prisma.participant.update({
//        where: {
//            id,
//        },
//        data: {
//            balance,
//            updatedAt: new Date(),
//        },
//    });
//}

const participantsRepository = {
    //fetchParticipants,
    createParticipant,
    //retrieveParticipantById,
    //modifyParticipant,
};

export default participantsRepository;