import { header } from "express-validator"
import TokenService from "../service/TokenService"
import { verify } from "jsonwebtoken";

export const removeToken = () => (
    header('authorization').isJWT().custom(async value => {
        const token = new TokenService().getToken(value);
        if (token) {
            new TokenService().removeToken(token);
        }
    })
)