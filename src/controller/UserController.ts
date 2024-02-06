import { Request, Response } from "express";
import IUser from "../interfaces/IUser";
import UserService from "../service/UserService";
import { HttpCodes } from "../utils/httpCodes";
import { User } from "../database/entity/User";
import { compare, hash } from "bcrypt";
import { mail } from "../utils/email.config";
import TokenService from "../service/TokenService";
import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config'

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
            const token = sign({ email }, process.env.JWT_SECRET, { expiresIn: '24h'} )
            new TokenService().insertToken(token);
            mail(email, firstName, token); 
            return res.status(HttpCodes.CREATED).json({ email, firstName, lastName, id, createdAt });
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error.message })
        }
    }

    async confirmEmail(req: Request, res: Response) {
        const { email } = verify(req.query.authorization, process.env.JWT_SECRET);
        await new UserService().confirmEmail(email)
        return res.status(HttpCodes.OK).json({ message: 'E-mail confirmado com sucesso!' })
    }

}