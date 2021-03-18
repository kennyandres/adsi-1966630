import Router from 'express'
import validador from 'express-validator';
const {check}=validador
import { personaDelete, personaGet, personaGetById, personaPost, personaPut, personaPutActivar, personaPutDesactivar } from "../controlers/persona.js";
import { ExistePersonaById, ExistePersonaByNombre, ExistePersonaByEmail } from "../helpers/persona.js";
import validarcampos from "../middlewares/validarCampos.js";
import { validarRol } from '../middlewares/validarRol.js';
import { validarJWT } from "../middlewares/validarToken.js";

const router = Router();

router.get('/', [

    validarJWT,
    validarRol ('ALMACENISTA_ROL'),
    validarcampos

], personaGet)

router.get('/:id',[
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExistePersonaById), 
    validarcampos
],personaGetById)

router.post('/',[    
    validarJWT,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'), 
    check('nombre', 'El nombre es obligatorio!').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(ExistePersonaByEmail),
    validarcampos     
],    personaPost);

router.put('/:id', [
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExistePersonaById), 
    check('nombre').custom(ExistePersonaByNombre),
    validarcampos
],personaPut)

router.put('/activar/:id', [
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExistePersonaById), 
    check('nombre').custom(ExistePersonaByNombre),
    validarcampos
],personaPutActivar)

router.put('/desactivar/:id', [
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExistePersonaById), 
    check('nombre').custom(ExistePersonaByNombre),
    validarcampos
],personaPutDesactivar)

router.delete('/:id', [
    validarJWT,
    check('id','no es un ID valido').isMongoId(),
    check('id').custom (ExistePersonaById), 
    check('nombre').custom(ExistePersonaByNombre),
    validarcampos
],personaDelete);

export default router;