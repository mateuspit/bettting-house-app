import Joi from 'joi';

export const postBetSchema = Joi.object({
    homeTeamScore: Joi.number().required(),
    awayTeamScore: Joi.number().required(),
    gameId: Joi.number().required(),
    participantId: Joi.number().required(),
    amountBet: Joi.number().required(),
});