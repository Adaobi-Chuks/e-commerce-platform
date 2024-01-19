"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const user_schema_1 = require("../schemas/user.schema");
const multer_config_1 = __importDefault(require("../configs/multer.config"));
const { createUser, login, logout } = new user_controller_1.default();
//create a user or signup
router.post("/", multer_config_1.default.single('imageUrl'), (0, validate_middleware_1.default)(user_schema_1.createSchema), createUser);
//create a user or signup
router.post("/login", (0, validate_middleware_1.default)(user_schema_1.loginSchema), login);
//logout a user
router.post("/logout", logout);
exports.default = router;
