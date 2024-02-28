import { Router } from "express";
import UserController from "../controller/UserController";
import { handleError } from "../middlewares/validation.result";
import { userFields } from "../middlewares/user.fields";
import { removeToken } from "../middlewares/remove.token";
import { handleLogin } from "../middlewares/handle.login";
import { handleToken } from "../middlewares/handle.token";
import { handleEmail } from "../middlewares/handle.email";
import { handleUpdatePassword } from "../middlewares/handle.update.password";

const router = Router();

router.post('/users/new-user', userFields(), handleError, new UserController().newUser);

router.post('/users/confirm-email', removeToken(), handleError, new UserController().confirmEmail);

router.get('/users/login', handleLogin(), handleError, new UserController().login);

router.get('/users/logout', handleToken(), handleError, new UserController().logout);

router.get('/users/:email', handleEmail(), handleError, new UserController().getUserByEmail);

router.patch('/users/:email', handleUpdatePassword(), handleError, new UserController().updateUserPassword);

export default router;
