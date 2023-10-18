import httpStatus from 'http-status';
import { Participant, PostParticipant } from '../protocols';
import { invalidDataException, noContentException } from '@/errors';
import participantsRepository from '@/repositories/participants.repositories';

interface ApiResponse<Participant> {
    status: number;
    data: Participant[] | null;
}

async function getParticipants(): Promise<ApiResponse<Participant>> {
    const participants = await participantsRepository.fetchParticipants();
    if (!participants || !participants.length) {
        throw noContentException("No have participants")
    }
    return {
        status: httpStatus.OK,
        data: participants,
    };
}


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
        throw invalidDataException(["error on participant creation"])
    }
    return participant;
}

export const participantsService = {
    getParticipants,
    createParticipant
};