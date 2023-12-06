import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import UserService from "../service/UserService";
import bcrypt from 'bcrypt';
import { HttpCodes } from "../utils/httpCodes";
import { User } from "../database/entity/User";

export default class UserController {
    async newUser(req: Request, res: Response) {
        const { firstName, lastName, email, password }: IUser = req.body;
        const newPassword: string = await bcrypt.hash(password, 10);
        const newUser: User = await new UserService().newUser(firstName, lastName, email, newPassword);
        return res.status(HttpCodes.CREATED).json(newUser);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await new UserService().login(email);
        if(user && await bcrypt.compare(password, user.password)) {
            return res.status(HttpCodes.OK).json(user);
        }
        return res.status(HttpCodes.NOT_FOUND).json( { message: "User not found" })
    }
}