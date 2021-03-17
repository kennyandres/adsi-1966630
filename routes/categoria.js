import Router from 'express'

import validador from 'express-validator';
const {check}=validador

import { categoriaDelete, categoriaGet, categoriaGetByID, categoriaPost, categoriaPut, categoriaPutActivar, categoriaPutDesactivar } from '../controlers/categoria.js';
import { ExisteCategoriaById, ExisteCategoriaByNombre } from '../helpers/categoria.js';
import validarcampos from '../middlewares/validarCampos.js';


const router = Router();


router.get('/', categoriaGet);

router.get('/:id',[
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarcampos
] ,categoriaGetByID);

router.post('/', [
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteCategoriaByNombre),
    validarcampos
],categoriaPost);

router.put('/:id',[
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarcampos
], categoriaPut);

router.put('/activar/:id', categoriaPutActivar);

router.put('/desactivar/:id', categoriaPutDesactivar);

router.delete('/:id', categoriaDelete);

export default router;

