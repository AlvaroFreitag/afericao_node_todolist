import Joi from 'joi';

const createSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(255)
        .required(),
});

const updateSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(255)
        .required(),
});

export default {
    createSchema,
    updateSchema,
};