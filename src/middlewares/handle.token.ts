import { query } from "express-validator";

export const removeToken = () => [
  query("authorization")
    .isJWT()
    .withMessage("Invalid Token!"),
];
