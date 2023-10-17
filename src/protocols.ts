export type ApplicationError = {
    name: string;
    message: string;
};

export type Participant = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    balance: number;
};
export type PostParticipant = {
    name: string;
    balance: number;
    createdAt: Date;
    updatedAt: Date;
};