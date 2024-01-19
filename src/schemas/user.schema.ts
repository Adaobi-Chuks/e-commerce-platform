import Joi from "joi";

const createSchema = Joi.object({
    fullName: Joi.string().required().min(3).max(100).trim(),
    userName: Joi.string().required().min(8).max(25).trim(),
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().min(6).max(50),
    imageURL: Joi.string().optional(),
    role: Joi.string().valid('seller', 'buyer', 'delivery', 'admin').default("user").trim().lowercase().optional()
});

const loginSchema = Joi.object({
    userName: Joi.string().required().min(8).max(25).trim(),
    password: Joi.string().required().min(6).max(50),
});

export {
    createSchema,
    loginSchema
}