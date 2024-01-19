import { Router } from "express";
import UserController from "../controller/UserController";
import { handleError } from "../middlewares/validation.result";
import { userFields } from "../middlewares/user.fields";
import { removeToken } from "../middlewares/remove.token";

const router = Router();

router.post('/users/new-user', userFields(), handleError, new UserController().newUser);

router.post('/users/confirm-email', removeToken(), handleError, new UserController().confirmEmail);

export default router;
