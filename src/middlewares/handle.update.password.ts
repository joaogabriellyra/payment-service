import { body, param } from "express-validator"
import UserService from "../service/UserService";

export const handleUpdatePassword = () => (
    [param('email').notEmpty().isEmail().withMessage('Invalid email format!'),
    body('password').notEmpty().isStrongPassword().withMessage('Invalid password format!')]
)