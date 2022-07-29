import { checkRole } from "./../middlewares/role";
import { checkJwt } from "../middlewares/jwt";
import { UserController } from "../controller/UserController";
import { Router } from "express";

const router = Router();

// Ver todos los usuarios. // Cuando metemos el checkJwt le estamos diciendo que solo funcione cuando este en uso el Token. // Cuando metemos el checkRole y especificamos que role deberá buscar, le estamos diciendo que si no es ese rol, no le permita usar ese método. En este caso, el rol es admin.
router.get("/", [checkJwt, checkRole(["admin"])], UserController.getAll);

// Ver un solo usuario
router.get("/:id", [checkJwt, checkRole(["admin"])], UserController.getById);

// Crear un nuevo usuario
router.post("/", [checkJwt, checkRole(["admin"])], UserController.new);

// Editar usuario
router.patch("/:id", [checkJwt, checkRole(["admin"])], UserController.edit);

// Eliminar usuario
router.delete("/:id", [checkJwt, checkRole(["admin"])], UserController.delete);

export default router;
