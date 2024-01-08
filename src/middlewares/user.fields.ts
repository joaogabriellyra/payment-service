import { body } from "express-validator"

export const userFields = () => (
    [body('email').notEmpty().isEmail().withMessage('Invalid email format!'),
    body('password').notEmpty().isStrongPassword().withMessage('Invalid password format!'),
    body('firstName').notEmpty(),
    body('lastName').notEmpty()]
)