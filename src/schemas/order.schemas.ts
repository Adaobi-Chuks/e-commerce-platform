import Joi from "joi";

const createSchema = Joi.object({
    userId: Joi.number().required().integer().positive(),
    productIds: Joi.array().items(Joi.number().required().integer().positive()).required(),
});

const editSchema = Joi.object({
    userId: Joi.number().required().integer().positive(),
    productIds: Joi.array().items(Joi.number().required().integer().positive()).required(),
    totalPrice: Joi.number().required().positive(),
    status: Joi.string().required().trim(),
});

export {
    createSchema,
    editSchema
};