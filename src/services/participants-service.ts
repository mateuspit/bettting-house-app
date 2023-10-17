import httpStatus from 'http-status';
import { Participant, PostParticipant } from '../protocols';
import { invalidDataError } from '@/errors';
//import { invalidDataError, noContentError } from '@/errors';
import participantsRepository from '@/repositories/participants-repository';

//// Interface para a resposta da API de participantes
//interface ApiResponse<Participant> {
//    status: number;
//    data: Participant[] | null;
//}

//// Função para obter todos os participantes
//async function getParticipants(): Promise<ApiResponse<Participant>> {
//    const participants = await participantsRepository.fetchParticipants();
//    if (!participants || !participants.length) {
//        throw noContentError("No have participants")
//    }
//    return {
//        status: httpStatus.OK,
//        data: participants,
//    };
//}

// Função para criar um novo participante
async function createParticipant(
    participantData: Omit<PostParticipant, 'createdAt' | 'updatedAt'>,
): Promise<Participant> {
    const now = new Date();
    const participant = await participantsRepository.createParticipant({
        ...participantData,
        createdAt: now,
        updatedAt: now,
    });

    if (!participant) {
        throw invalidDataError(["error on participant creation"])
    }
    return participant;
}

export const participantsService = {
    //getParticipants,
    createParticipant
};