import { query } from "express-validator";

export const handleToken = () => [
  query("authorization")
    .notEmpty()
    .isJWT()
    .withMessage("Invalid Token!"),
];
