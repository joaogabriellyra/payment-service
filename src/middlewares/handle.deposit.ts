import { body } from "express-validator";
import UserService from "../service/UserService";

export const handleDeposit = () => (
  [
    body('amount').trim().notEmpty().isFloat({min: 1, max: 10000}).isDecimal({ decimal_digits: '2' }).withMessage('Valor inválido!'),
    body('receiverEmail').trim().notEmpty().isEmail().withMessage('Formato inválido').custom(async value => {
      const user = await new UserService().findOneUser(value);
      if (!user) {
        throw new Error();
      } 
    }).withMessage('Destinatário não encontrado.')
  ]
)