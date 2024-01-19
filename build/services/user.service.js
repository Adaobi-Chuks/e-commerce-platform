"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_config_1 = require("../configs/constants.config");
class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.create(data);
            const createdUser = yield this.userModel.findOne({
                where: {},
                attributes: { exclude: ['password'] },
            });
            return createdUser;
        });
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({
                where: filter,
                attributes: { exclude: ['password'] },
            });
            return user;
        });
    }
    generateAuthToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }, constants_config_1.SECRET, {
                expiresIn: constants_config_1.MAXAGE
            });
        });
    }
    ;
}
exports.default = UserService;
