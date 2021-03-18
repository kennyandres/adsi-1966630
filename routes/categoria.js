import Router from 'express'

import validador from 'express-validator';
const {check}=validador

import { categoriaDelete, categoriaGet, categoriaGetByID, categoriaPost, categoriaPut, categoriaPutActivar, categoriaPutDesactivar } from '../controlers/categoria.js';
import { ExisteCategoriaById, ExisteCategoriaByNombre } from '../helpers/categoria.js';
import validarcampos from '../middlewares/validarCampos.js';
import { validarRol } from '../middlewares/validarRol.js';
import { validarJWT } from '../middlewares/validarToken.js';


const router = Router();


router.get('/', [
    validarJWT,
    validarRol ('ALMACENISTA_ROL'),
    validarcampos
],categoriaGet);
    

router.get('/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarcampos
] ,categoriaGetByID);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteCategoriaByNombre),
    validarcampos
],categoriaPost);

router.put('/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    check('nombre').custom(ExisteCategoriaByNombre),
    validarcampos
], categoriaPut);

router.put('/activar/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarcampos
] ,categoriaPutActivar);

router.put('/desactivar/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarcampos
] ,categoriaPutDesactivar);

router.delete('/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExisteCategoriaById), 
    validarcampos
] ,categoriaDelete);

export default router;

