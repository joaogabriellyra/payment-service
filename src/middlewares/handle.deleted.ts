import { body } from "express-validator";
import UserService from "../service/UserService";

export const handleDeleted = () => (
  body('email').custom(async (value) => {
      const user = await new UserService().findOneUser(value);
      if (user.deleted) {
        throw new Error();
      }
    }).withMessage('Usuário removido!')
)