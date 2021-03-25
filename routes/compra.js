import Router from 'express'

import validador from 'express-validator'
const { check } = validador

import {compraGet, compraGetByID, compraPost, compraPut, compraPutActivar, compraPutDesactivar } from "../controlers/compra.js";
import { ExisteCompraById } from "../helpers/compra.js";
import { ExisteByNumcomprobante } from '../helpers/venta.js';
import validarcampos from "../middlewares/validarCampos.js";
import { validarRol } from '../middlewares/validarRol.js';
import { validarJWT } from "../middlewares/validarToken.js";




const router = Router();

router.get('/', [

    validarJWT,
    validarRol('ALMACENISTA_ROL,ADMIN_ROL'),
    validarcampos

], compraGet)

router.get('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteCompraById),
    validarcampos
], compraGetByID)

router.post('/', [
    validarJWT,
    check('numerocomprobante', 'El numero de comprabante debe ser valido').not().isEmpty(),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], compraPost)


router.put('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteCompraById),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], compraPut)

router.put('/activar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteCompraById),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], compraPutActivar)

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteCompraById),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], compraPutDesactivar)


export default router;

