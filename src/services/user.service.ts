import { Model } from 'sequelize';
import { ServiceInterface } from '../interfaces/service.interface';
import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import jwt from "jsonwebtoken";
import { MAXAGE, SECRET } from '../configs/constants.config';

export default class UserService implements ServiceInterface<Model> {
    private readonly userModel: typeof User;

    constructor(userModel: typeof User) {
      this.userModel = userModel;
    }

    async create(data: any): Promise<Model> {
      const user = await this.userModel.create(data);
      return user;
    }

    async findOne(filter: any): Promise<Model | null> {
      const user = await this.userModel.findOne({ where: filter });
      return user;
    }

    async generateAuthToken (user: IUser) {
      return jwt.sign({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
      }, SECRET, {
          expiresIn: MAXAGE
      });
  };
}
