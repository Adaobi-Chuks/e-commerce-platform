import Joi from "joi";

const createSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).trim(),
    description: Joi.string().allow('').optional().trim(),
    price: Joi.number().required().positive(),
    quantity: Joi.number().required().integer().positive(),
    imageUrl: Joi.string().allow('').optional().trim(),
});

const editSchema = Joi.object({
    name: Joi.string().required().min(3).max(100).trim(),
    description: Joi.string().allow('').optional().trim(),
    price: Joi.number().required().positive(),
    quantity: Joi.number().required().integer().positive(),
    imageUrl: Joi.string().allow('').optional().trim(),
});

export {
    createSchema,
    editSchema
};
