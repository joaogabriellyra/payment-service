import { param } from "express-validator";

export const handleEmail = () => (
    param('email').notEmpty().isEmail().withMessage('Invalid email format!')
)