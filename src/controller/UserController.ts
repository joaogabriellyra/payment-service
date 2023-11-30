import { Request, Response } from "express";
import UserService from "../service/UserService";

export default class UserController {
    async newUser(req: Request, res: Response) {
        const { firstName, lastName, email, password } = req.body;
        const newUser = await new UserService().newUser(firstName, lastName, email, password);
        return res.status(201).json(newUser);
    }
}