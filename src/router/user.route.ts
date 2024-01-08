import { Router } from "express";
import UserController from "../controller/UserController";
import { handleError } from "../middlewares/validation.result";
import { userFields } from "../middlewares/user.fields";

const router = Router();

router.post('/users/new-user', userFields(), handleError, new UserController().newUser);

export default router;
