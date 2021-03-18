import Router from 'express'
import validador from 'express-validator';
const { check } = validador
import { ventaDelete, ventaGet, ventaGetByID, ventaPost, ventaPut, ventaPutActivar, ventaPutDesactivar } from '../controlers/venta.js';
import { ExisteByNumcomprobante, ExisteVentaById } from '../helpers/venta.js';
import validarcampos from "../middlewares/validarCampos.js";
import { validarRol } from '../middlewares/validarRol.js';
import { validarJWT } from "../middlewares/validarToken.js";




const router = Router();

router.get('/', [

    validarJWT,
    validarRol('VENDEDOR_ROL,ADMIN_ROL'),
    validarcampos

], ventaGet)

router.get('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteVentaById),
    validarcampos
], ventaGetByID)

router.post('/', [
    validarJWT,
    check('numerocomprobante', 'El numero de comprabante debe ser valido').not().isEmpty(),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], ventaPost)


router.put('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteVentaById),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], ventaPut)

router.put('/activar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteVentaById),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], ventaPutActivar)

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteVentaById),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], ventaPutDesactivar)

router.delete('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteVentaById),
    check('numerocomprobante').custom(ExisteByNumcomprobante),
    validarcampos
], ventaDelete);

export default router;

