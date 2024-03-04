import { param } from "express-validator";
import UserService from "../service/UserService";

export const handleDeleted = () => (
  param('email').custom(async (value) => {
      const user = await new UserService().findOneUser(value);
      if (user && user.deleted) {
        throw new Error();
      }
    }).withMessage('Usuário removido!')
)