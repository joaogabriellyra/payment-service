import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import UserService from "../service/UserService";
import { HttpCodes } from "../utils/httpCodes";
import { User } from "../database/entity/User";

export default class UserController {
    async newUser(req: Request, res: Response) {
        const { firstName, lastName, email, password }: IUser = req.body;
        try {
            const user: User = await new UserService().findOneUser(email);
            if (user) {
                return res.status(HttpCodes.BAD_REQUEST).json({ message: "User already exists" })
            } 
            const { id, createdAt }: User = await new UserService().newUser(firstName, lastName, email, password);
            return res.status(HttpCodes.CREATED).json({ email, firstName, lastName, id, createdAt });
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error.message })
        }
    }
}