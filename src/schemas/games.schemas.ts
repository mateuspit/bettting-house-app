import Joi from 'joi';

export const gamesSchema = Joi.object({
    homeTeamName: Joi.string().required(),
    awayTeamName: Joi.string().required(),
    date: Joi.date().iso().required()
});