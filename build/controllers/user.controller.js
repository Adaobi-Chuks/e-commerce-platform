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
const cloudinary_config_1 = __importDefault(require("../configs/cloudinary.config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const constants_config_1 = require("../configs/constants.config");
const user_service_1 = __importDefault(require("../services/user.service"));
const user_model_1 = __importDefault(require("../models/user.model"));
const UserModel = user_model_1.default;
// Create an instance of the UserService class
const UserService = new user_service_1.default(UserModel);
const { CREATED, DUPLICATE_EMAIL, DUPLICATE_IMAGE, INVALID_USERNAME, INVALID_PASSWORD, LOGGEDIN, LOGGEDOUT } = constants_config_1.MESSAGES.USER;
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            //checks if another user with email exists
            if (yield UserService.findOne({ email })) {
                //sends an error if the email exists
                return res.status(409)
                    .send({
                    success: false,
                    message: DUPLICATE_EMAIL
                });
            }
            let imageUrl;
            if (req.file) {
                // Upload file to Cloudinary
                const result = yield cloudinary_config_1.default.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
                //checks if another user with imageUrl exists
                if (yield UserService.findOne({ imageUrl })) {
                    //sends an error if the email exists
                    return res.status(409)
                        .send({
                        success: false,
                        message: DUPLICATE_IMAGE
                    });
                }
            }
            //create a new user
            const createdUser = yield UserService.create(Object.assign(Object.assign({}, req.body), { imageUrl: imageUrl }));
            const token = UserService.generateAuthToken(createdUser);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: constants_config_1.MAXAGE * 1000
            });
            // Return success message
            return res.status(201)
                .send({
                success: true,
                message: CREATED,
                createdUser,
                token
            });
        });
    }
    //logs in an existing user
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userName, password } = req.body;
            const _user = yield UserService.findOne({ userName });
            if (!_user) {
                return res.status(400)
                    .send({
                    success: false,
                    message: INVALID_USERNAME
                });
            }
            const validPassword = yield bcrypt_1.default.compare(password, _user.password);
            if (!validPassword) {
                return res.status(400)
                    .send({
                    success: false,
                    message: INVALID_PASSWORD
                });
            }
            const token = UserService.generateAuthToken(_user);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: constants_config_1.MAXAGE * 1000
            });
            return res.status(200).send({
                success: true,
                message: LOGGEDIN,
                user: _user,
                token
            });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.cookie("token", '', {
                httpOnly: true, maxAge: 1
            });
            return res.status(200).send({
                success: true,
                message: LOGGEDOUT
            });
        });
    }
}
exports.default = UserController;
