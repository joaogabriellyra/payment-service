import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import UserService from "../service/UserService";
import { HttpCodes } from "../utils/httpCodes";
import { User } from "../database/entity/User";

export default class UserController {
    async newUser(req: Request, res: Response) {
        const { firstName, lastName, email, password }: IUser = req.body;
        const newUser: User = await new UserService().newUser(firstName, lastName, email, password);
        return res.status(HttpCodes.CREATED).json(newUser);
    }
}