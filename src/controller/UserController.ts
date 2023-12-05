import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import UserService from "../service/UserService";
import bcrypt from 'bcrypt';

export default class UserController {
    async newUser(req: Request, res: Response) {
        const { firstName, lastName, email, password }: IUser = req.body;
        const newPassword: string = await bcrypt.hash(password, 10);
        const newUser = await new UserService().newUser(firstName, lastName, email, newPassword);
        return res.status(201).json(newUser);
    }
}