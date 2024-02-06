import { Router } from "express";
import UserController from "../controller/UserController";
import { handleError } from "../middlewares/validation.result";
import { userFields } from "../middlewares/user.fields";
import { removeToken } from "../middlewares/remove.token";
import { handleLogin } from "../middlewares/handle.login";

const router = Router();

router.post('/users/new-user', userFields(), handleError, new UserController().newUser);

router.post('/users/confirm-email', removeToken(), new UserController().confirmEmail);

router.post('/users/login', handleLogin(), new UserController().login);

export default router;
