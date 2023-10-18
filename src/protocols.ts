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
export type Game = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
};

export type PostGame = {
    createdAt: Date;
    updatedAt: Date;
    date: Date;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore: number;
    awayTeamScore: number;
    isFinished: boolean;
};