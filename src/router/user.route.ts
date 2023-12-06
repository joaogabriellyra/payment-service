import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router();

router.post('/users/new-user', new UserController().newUser);

router.post('/users/login', new UserController().login);

export default router;
