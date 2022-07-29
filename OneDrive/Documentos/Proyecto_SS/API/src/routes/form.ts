import { checkRole } from './../middlewares/role';
import { checkJwt } from '../middlewares/jwt';
const path = require('path');
const multer = require('multer');
import { FormController } from '../controller/FormController';
import { Router } from 'express';

const router = Router();

// Ver todos los datos guardados.
router.get('/', [checkJwt], FormController.todos);

// Ver un solo dato guardado
router.get('/:folio', [checkJwt], FormController.porFolio);

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/images'),
  filename: (req, file, cb) => {
    // cb(null, file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
});

const upload = multer({ storage });

// Llenar un nuevo formulario
router.post('/', [checkJwt], FormController.nuevo);

// Subir imagen
router.post('/:file', upload.single('file'), [checkJwt], FormController.newFile);

// Editar formulario
router.patch('/:folio', [checkJwt, checkRole(['admin'])],FormController.editar);

// Eliminar formulario
// router.delete('/:formas', [checkJwt, checkRole(['admin'])], FormController.borrar);

export default router;
