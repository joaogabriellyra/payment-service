import { Router } from "express";

const router = Router();
router.post('users/new-user', userController.newUser);

module.exports = router;
