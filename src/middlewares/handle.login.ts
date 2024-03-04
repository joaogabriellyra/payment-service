import { query } from "express-validator";
import UserService from "../service/UserService";

export const handleLogin = () => (
    [query('password').notEmpty().isStrongPassword().withMessage('Invalid password format!'),
    query('login')
        .notEmpty()
        .isEmail()
        .withMessage('Invalid email format!')
        .custom(async (value) => {
            const user = await new UserService().findOneUser(value);
            if (user && user.deleted) {
                throw new Error();
            }
  }).withMessage('Usuário removido!')]
)