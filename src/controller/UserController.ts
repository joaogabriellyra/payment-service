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
        try {            
            const { email } = verify(req.query.authorization, process.env.JWT_SECRET);
            await new UserService().confirmEmail(email)
            return res.status(HttpCodes.OK).json({ message: 'E-mail confirmado com sucesso!' })
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error })
        }
    }

    async login(req: Request, res: Response) {
        const { login, password } = req.query;
        const email = String(login);
        const senha = String(password)
        const user = await new UserService().findOneUser(email);

        if (!user) return res.status(HttpCodes.NOT_FOUND).json({ message: 'Usuário não encontrado'})
        if (!(await compare(senha, user.password))) {
            return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Senha errada' })
        }
        if (!user.confirmed) {
            return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Usuário com e-mail não confirmado!'})
        }

        const token = sign({ login: email }, process.env.JWT_SECRET, { expiresIn: 900 } )
        new TokenService().insertToken(token);
        
        return res.status(HttpCodes.OK).json(token);
    }

    async logout(req: Request, res: Response) {
        const token = String(req.query.authorization);
        try {
            const tokenDB = await new TokenService().getToken(token);            
            const { login } = verify(token, process.env.JWT_SECRET);
            if (!login || !tokenDB) {
                return res.status(HttpCodes.BAD_REQUEST).json({ message: 'Token inválido!' })
            }
            await new TokenService().removeToken(token);
            return res.status(HttpCodes.OK).json({ message: 'Logout realizado com sucesso!' })
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error })
        }
    }

    async getUserByEmail(req: Request, res: Response) {
        const { email } = req.params;
        try {
            const user = await new UserService().findOneUser(email);
            if (!user) {
                return res.status(HttpCodes.NOT_FOUND).json({ message: 'Usuário não encontrado!'});
            } else if (!user.confirmed) {
                return res.status(HttpCodes.UNAUTHORIZED).json({ message: 'Usuário com e-mail não confirmado!'})
            }
            return res.status(HttpCodes.OK).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, balance: user.balance})
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error })
        }
    }

    async updateUserPassword(req: Request, res: Response) {
        const { email } = req.params;
        const { password } = req.body;
        try {
            const user = await new UserService().findOneUser(email);
            if (!user) {
                return res.status(HttpCodes.NOT_FOUND).json({ message: 'Usuário não encontrado!' });
            }
            const newPassword = await hash(password, 10);
            await new UserService().updateUserPassword(email, newPassword);
            return res.status(HttpCodes.NO_CONTENT).send();
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error })
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { email } = req.params;
        try {
            const user = await new UserService().findOneUser(email);
            if (!user) {
                return res.status(HttpCodes.NOT_FOUND).json({ message: 'Usuário não encontrado!' });
            }
            await new UserService().deleteUser(email);
            return res.status(HttpCodes.NO_CONTENT).send();
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error });
        }
    }

    async deposit(req: Request, res: Response) {
        const { amount, senderEmail, receiverEmail} = req.body;
        try {
            await new UserService().deposit(senderEmail, receiverEmail, amount);
            res.status(HttpCodes.CREATED).json({ mensagem: 'Pagamento aprovado!' })
        } catch (error) {
            return res.status(HttpCodes.BAD_REQUEST).json({ message: error });
        }



    }

}