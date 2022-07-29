import { checkRole } from './../middlewares/role';
import { checkJwt } from '../middlewares/jwt';
import { MenorController } from '../controller/MenorController';
import { Router } from 'express';

const router = Router();

// Llenar un nuevo menor
router.post('/:id', [checkJwt], MenorController.nuevoMenor);

// Editar un nuevo menor
router.patch('/:formas/:id', [checkJwt, checkRole(['admin'])], MenorController.editMenor);

export default router;