import { query } from "express-validator";

export const handleLogin = () => (
    [query('login').notEmpty().isEmail().withMessage('Invalid email format!'),
    query('password').notEmpty().isStrongPassword().withMessage('Invalid password format!')]
)