import { query } from "express-validator"
import TokenService from "../service/TokenService"

export const removeToken = () => (
    [query('authorization').isJWT().custom(async value => {
        const { token } = await new TokenService().getToken(value);
        if (!token) {
            throw new Error();
        }
        await new TokenService().removeToken(token);
    })
    .withMessage("Invalid Token!")
    ]
)