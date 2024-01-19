"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSchema = exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const createSchema = joi_1.default.object({
    userId: joi_1.default.number().required().integer().positive(),
    productIds: joi_1.default.array().items(joi_1.default.number().required().integer().positive()).required(),
});
exports.createSchema = createSchema;
const editSchema = joi_1.default.object({
    userId: joi_1.default.number().required().integer().positive(),
    productIds: joi_1.default.array().items(joi_1.default.number().required().integer().positive()).required(),
    totalPrice: joi_1.default.number().required().positive(),
    status: joi_1.default.string().required().trim(),
});
exports.editSchema = editSchema;
