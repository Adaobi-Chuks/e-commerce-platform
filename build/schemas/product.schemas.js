"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSchema = exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3).max(100).trim(),
    description: joi_1.default.string().allow('').optional().trim(),
    price: joi_1.default.number().required().positive(),
    quantity: joi_1.default.number().required().integer().positive(),
    imageUrl: joi_1.default.string().allow('').optional().trim(),
});
exports.createSchema = createSchema;
const editSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3).max(100).trim(),
    description: joi_1.default.string().allow('').optional().trim(),
    price: joi_1.default.number().required().positive(),
    quantity: joi_1.default.number().required().integer().positive(),
    imageUrl: joi_1.default.string().allow('').optional().trim(),
});
exports.editSchema = editSchema;
