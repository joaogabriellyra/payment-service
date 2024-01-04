import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import UserService from "../service/UserService";
import { HttpCodes } from "../utils/httpCodes";
import { User } from "../database/entity/User";
import { hash } from "bcrypt";

export default class UserController {
    async newUser(req: Request, res: Response) {
        const { firstName, lastName, email, password }: IUser = req.body;
        try {
            const user: User = await new UserService().findOneUser(email);
            if (user) {
                return res.status(HttpCodes.BAD_REQUEST).json({ message: "User already exists" })
            } 
            const newPassword = await hash(password, 10);
            const { id, createdAt }: User = await new UserService().newUser(firstName, lastName, email, newPassword);
            return res.status(HttpCodes.CREATED).json({ newUser: { email, firstName, lastName, id, createdAt } });
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error.message })
        }
    }
}