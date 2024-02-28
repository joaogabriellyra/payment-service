import { body, param } from "express-validator"

export const handleUpdatePassword = () => (
    [param('email').notEmpty().isEmail().withMessage('Invalid email format!'),
    body('password').notEmpty().isStrongPassword().withMessage('Invalid password format!')]
)