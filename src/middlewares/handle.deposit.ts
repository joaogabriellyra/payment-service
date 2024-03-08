import { body } from "express-validator";
import UserService from "../service/UserService";

export const handleDeposit = () => (
  [
    body('amount').notEmpty().isNumeric().withMessage('Valor inválido!'),
    body('receiverEmail').notEmpty().isEmail().withMessage('Formato inválido').custom(async value => {
      const user = await new UserService().findOneUser(value);
      if (!user) {
        throw new Error();
      } 
    }).withMessage('Destinatário não encontrado.')
  ]
)