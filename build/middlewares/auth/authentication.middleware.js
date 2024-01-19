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
const constants_config_1 = require("../../configs/constants.config");
const user_service_1 = __importDefault(require("../../services/user.service"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const UserModel = user_model_1.default;
// Create an instance of the UserService class
const UserService = new user_service_1.default(UserModel);
// check if json web token exists & is verified
function authenticate(req, res, next) {
    let token = req.cookies.token;
    if (!token) {
        return res.status(401)
            .send({
            success: false,
            message: constants_config_1.MESSAGES.AUTH.TOKENERROR
        });
    }
    jsonwebtoken_1.default.verify(token, constants_config_1.SECRET, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
        if (err) {
            return res.status(401)
                .send({
                success: false,
                message: constants_config_1.MESSAGES.AUTH.INVALIDTOKEN
            });
        }
        else {
            const user = yield UserService.findOne({ id: decoded.id });
            if (!user) {
                return res.status(401)
                    .send({
                    success: false,
                    message: constants_config_1.MESSAGES.USER.INVALID_ID
                });
            }
            // Add the decoded token to the request object for future use
            req.user = decoded;
            next();
        }
    }));
}
exports.default = authenticate;
