import Joi from 'joi';

export const participantsSchema = Joi.object({
    name: Joi.string().required(),
    balance: Joi.number().required().min(1000),
});