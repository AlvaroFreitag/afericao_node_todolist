import Joi from 'joi';

const createSchema = Joi.object({
    cpf: Joi.string()
        .length(11)
        .required(),
    name: Joi.string()
        .trim()
        .min(2)
        .max(255)
        .required(),
    email: Joi.string()
        .trim()
        .email()
        .min(2)
        .max(255)
        .required(),
    password: Joi.string()
        .trim()
        .min(2)
        .max(25)
        .required(),
});

const updateSchema = Joi.object({
    cpf: Joi.string()
        .length(11),
    name: Joi.string()
        .trim()
        .min(2)
        .max(255),
    email: Joi.string()
        .trim()
        .email()
        .min(2)
        .max(255),
    password: Joi.string()
        .trim()
        .min(2)
        .max(25),
});

export default {
    createSchema,
    updateSchema
};