import { body } from "express-validator";

export const handleEmail = () => (
    body('email').notEmpty().isEmail().withMessage('Invalid email format!')
)