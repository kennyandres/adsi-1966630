import Router from 'express'
import validador from 'express-validator';
const { check } = validador
import { usuarioGet, usuarioGetById, usuarioPost, usuarioPut, usuarioPutActivar, usuarioPutDesactivar, usuarioDelete, login } from '../controlers/usuario.js';
import { ExisteUsuarioById, ExisteUsuarioByNombre } from '../helpers/usuario.js';
import validarcampos from '../middlewares/validarCampos.js';
import { validarRol } from '../middlewares/validarRol.js';
import { validarJWT } from '../middlewares/validarToken.js';

const router = Router();

router.get('/', [
    validarJWT,
    validarRol('ALMACENISTA_ROL'),
    validarcampos

], usuarioGet)

router.get('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    validarcampos
], usuarioGetById)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre debe ser valido').not().isEmpty(),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarcampos
], usuarioPost)

router.post('/login', login)

router.put('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarcampos
], usuarioPut)

router.put('/activar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarcampos
], usuarioPutActivar)

router.put('/desactivar/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarcampos
], usuarioPutDesactivar)

router.delete('/:id', [
    validarJWT,
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom(ExisteUsuarioById),
    check('nombre').custom(ExisteUsuarioByNombre),
    validarcampos
], usuarioDelete);

export default router;