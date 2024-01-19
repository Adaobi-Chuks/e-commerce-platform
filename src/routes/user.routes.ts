import { Router } from "express";
const router = Router();
import UserController from '../controllers/user.controller';
import validate from "../middlewares/validate.middleware";
import { createSchema, loginSchema } from "../schemas/user.schema";
import upload from "../configs/multer.config";
const {
    createUser,
    login,
    logout
} = new UserController();

//create a user or signup
router.post("/", upload.single('imageUrl'), validate(createSchema), createUser);
//create a user or signup
router.post("/login", validate(loginSchema), login);
//logout a user
router.post("/logout", logout);

export default router;