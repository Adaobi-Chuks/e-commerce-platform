"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createSchema = joi_1.default.object({
    fullName: joi_1.default.string().required().min(3).max(100).trim(),
    userName: joi_1.default.string().required().min(8).max(25).trim(),
    email: joi_1.default.string().email().required().lowercase().trim(),
    password: joi_1.default.string().required().min(6).max(50),
    imageURL: joi_1.default.string().optional(),
    role: joi_1.default.string().valid('seller', 'buyer', 'delivery', 'admin').default("user").trim().lowercase().optional()
});
exports.createSchema = createSchema;
const loginSchema = joi_1.default.object({
    userName: joi_1.default.string().required().min(8).max(25).trim(),
    password: joi_1.default.string().required().min(6).max(50),
});
exports.loginSchema = loginSchema;
