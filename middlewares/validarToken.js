import JwT from "jsonwebtoken"
import { usuarioGetById } from "../controlers/usuario.js"
import Usuario from "../models/usuario.js"

const generarJWT = (id) => {
    return new Promise((resolve, reject) => {

        const payload = { uid: id }
  
        JwT.sign(payload, process.env.SECRETKEY, {
            expiresIn: '4h'

        }, (err, token) => {
            if (err) {
                reject('No se pudo guenerar el token')
            } else {
                resolve(token)
            }
        })
    })
}

const validarJWT = async (req,res,next) => {

    const token = req.header('token')

    if (!token) {
        return res.status(401).json(({
            msg: 'No hay Token en la petición'
        }))
    }

    try {
  
        const {uid}=JwT.verify(token,process.env.SECRETKEY)

        const usuario = await Usuario.findById(uid)

        if(!usuario){
            return res.status(401).json(({
                msg: 'Token no valido'
            }))

        }
        if(usuario.estado===0){
            return res.status(401).json(({
                msg: 'Token no valido'
            }))
        }
        req.usuario=usuario

        next();




    } catch (error) {
        return res.status(401).json(({
            msg: 'Token no valido'
        }))
        
    }



}

export { generarJWT, validarJWT }

