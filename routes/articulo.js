import Router from 'express'

import validador from 'express-validator';
const { check } = validador
import { articuloDelete, articuloGet, articuloGetByID, articuloPost, articuloPut, articuloPutActivar, articuloPutDesactivar } from "../controlers/articulo.js";
import { login } from "../controlers/usuario.js";
import { ExisteArticuloById, ExisteArticuloByNombre } from '../helpers/articulo.js';
import validarcampos from "../middlewares/validarCampos.js";
import { validarRol } from '../middlewares/validarRol.js';
import { validarJWT } from "../middlewares/validarToken.js";

const router = Router();

router.get('/', [

    validarJWT,
    validarRol('ALMACENISTA_ROL'),
    validarcampos

], articuloGet)

router.get('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteArticuloById),
    validarcampos
], articuloGetByID)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteArticuloByNombre),
    validarcampos
], articuloPost)

router.post('/login', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteArticuloByNombre),
    validarcampos
], login)

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteArticuloByNombre),
    validarcampos
], articuloPut)

router.put('/activar/:id', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteArticuloByNombre),
    validarcampos
], articuloPutActivar)

router.put('/desactivar/:id', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteArticuloByNombre),
    validarcampos
], articuloPutDesactivar)

router.delete('/:id', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteArticuloByNombre),
    validarcampos
], articuloDelete);

export default router;