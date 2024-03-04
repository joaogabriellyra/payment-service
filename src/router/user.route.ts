import { Router } from "express";
import UserController from "../controller/UserController";
import { handleError } from "../middlewares/validation.result";
import { userFields } from "../middlewares/user.fields";
import { removeToken } from "../middlewares/remove.token";
import { handleLogin } from "../middlewares/handle.login";
import { handleToken } from "../middlewares/handle.token";
import { handleEmail } from "../middlewares/handle.email";
import { handleUpdatePassword } from "../middlewares/handle.update.password";
import { handleDeleted } from "../middlewares/handle.deleted";

const router = Router();

router.post('/users/new-user', userFields(), handleError, new UserController().newUser);

router.post('/users/confirm-email', removeToken(), handleError, new UserController().confirmEmail);

router.get('/users/login', handleLogin(), handleDeleted(), handleError, new UserController().login);

router.get('/users/logout', handleToken(), handleError, new UserController().logout);

router.get('/users/:email', handleEmail(), handleDeleted(), handleError, new UserController().getUserByEmail);

router.patch('/users/:email', handleUpdatePassword(), handleError, new UserController().updateUserPassword);

router.patch('/users/deleteUser/:email', handleEmail(), handleError, new UserController().deleteUser);

export default router;
