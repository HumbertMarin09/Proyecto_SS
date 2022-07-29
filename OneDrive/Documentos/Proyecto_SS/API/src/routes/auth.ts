import { checkJwt } from "../middlewares/jwt";
import { Router } from "express";
import AuthController from "../controller/AuthController";

const router = Router();

// Login:
router.post("/login", AuthController.login);

// Cambiar contraseña:
router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
