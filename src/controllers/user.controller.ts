import { Request, Response } from "express";
import cloudinary from "../configs/cloudinary.config";
import bcrypt from "bcrypt";
import { MAXAGE, MESSAGES } from "../configs/constants.config";
import Service from "../services/user.service";
import User from '../models/user.model';
import { IUser } from "../interfaces/user.interface";
const UserModel = User;
// Create an instance of the UserService class
const UserService = new Service(UserModel);
const {
    CREATED,
    DUPLICATE_EMAIL,
    DUPLICATE_PHONENUMBER,
    DUPLICATE_IMAGE,
    INVALID_USERNAME,
    INVALID_PASSWORD,
    LOGGEDIN,
    LOGGEDOUT
} = MESSAGES.USER

export default class UserController {

    async createUser(req: Request, res: Response) {
        const {email} = req.body;

        //checks if another user with email exists
        if (await UserService.findOne({email})) {
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
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url;
            
            //checks if another user with imageUrl exists
            if (await UserService.findOne({imageUrl})) {
                //sends an error if the email exists
                return res.status(409)
                .send({
                    success: false,
                    message: DUPLICATE_IMAGE
                });
            }
        }

        //create a new user
        const createdUser = await UserService.create( {
            ...req.body,
            imageUrl: imageUrl
        });
        
        const token = UserService.generateAuthToken(createdUser as any);
        res.cookie("token", token, {
            httpOnly: true, 
            maxAge: MAXAGE * 1000 
        });
    
        // Return success message
        return res.status(201)
        .send({
            success: true,
            message: CREATED,
            createdUser,
            token
        });    
    }

    //logs in an existing user
    async login(req: Request, res: Response) {
        const {userName, password} = req.body;
        const _user = await UserService.findOne({userName});
        if (!_user) {
            return res.status(400)
                .send({ 
                    success: false, 
                    message: INVALID_USERNAME
                });
        }
        
        const validPassword = await bcrypt.compare(password, (_user as unknown as IUser).password);
        if (!validPassword) {
            return res.status(400)
                .send({ 
                    success: false, 
                    message: INVALID_PASSWORD
                });
        }
        const token = UserService.generateAuthToken(_user as unknown as IUser);
        res.cookie("token", token, { 
            httpOnly: true, 
            maxAge: MAXAGE * 1000
        });
        return res.status(200).send({
            success: true,
            message: LOGGEDIN,
            user: _user,
            token 
        });
    }

    async logout(req: Request, res: Response) {
        res.cookie("token", '', {
            httpOnly: true, maxAge: 1 
        });
        return res.status(200).send({
            success: true,
            message: LOGGEDOUT
        });
    }
}