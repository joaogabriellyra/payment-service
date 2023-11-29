import { Request, Response } from "express";

export default class UserController {
    async newUser(req: Request, res: Response) {
        const { firstName, lastName, login, password, cpf, cell } = req.body;
        const newUser = await UserService.newUser(firstName, lastName, login, password, cpf, cell);
        return res.status(201).json(newUser);
    }
}