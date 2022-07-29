import { checkJwt } from "../middlewares/jwt";
import { DomiController } from "../controller/DomiController";
import { Router } from "express";

const router = Router();

// Buscar CP
router.get("/:cp", [checkJwt], DomiController.getDom);

export default router;