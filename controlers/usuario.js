import Usuario from "../models/usuario.js"
import bcryptjs  from "bcryptjs"
import { generarJWT } from "../middlewares/validarToken.js";


const usuarioGet = async(req, res) => {
    const usuarios=await Usuario.find();

    res.json({
        usuarios
    })

    
}

const usuarioGetById = async(req,res) =>{
    const {id}=req.params

    const usuarios=await Usuario.findById(id)

    res.json({
        usuarios
    })
    
}

const usuarioPost = async (req, res) => {
    const{nombre,email,password,rol}=req.body
    const usuario= Usuario({nombre,email,password,rol})

    //encriptar
    const salt=bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt)

    usuario.save();

    res.json({
        usuario
    })
} 

const login = async (req,res)=>{
    const{email,password}=req.body
    try {
        const usuario= await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Password no es correcto '
            })
        }
        if(usuario.estado===0){
            return res.status(400).json({
                msg:'Usuario/Password no es correcto '
            })
        }
        const validarpassword=bcryptjs.compareSync(password,usuario.password)
        if(!validarpassword){
            return res.status(400).json({
                msg:'Usuario/Password no es correcto '
            })
        }

        const token= await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })


    } catch (error) {
        return res.status(500).json({
            error,
            msg:'comuniquese con el admistrador'
        })
        
    }
}

const usuarioPut= async(req,res) =>{
    const {id}=req.params

    const {_id,email, estado,createdAt, __v,password,...resto}=req.body
    if(password){
        const salt=genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    res.json({
        usuario
    })
    
}

const usuarioPutActivar = async(req,res) =>{
    const {id}=req.params

    const usuarios=await Usuario.findByIdAndUpdate(id,{estado:1})

    res.json({
        usuarios
    })
    
}

const usuarioPutDesactivar = async(req,res) =>{
    const {id}=req.params

    const usuarios=await Usuario.findByIdAndUpdate (id,{estado:0})

    res.json({
        usuarios
    })
    
}

const usuarioDelete = async(req,res) =>{
    const {id}=req.params

    const usuarios=await Usuario.findByIdAndDelete(id)

    res.json({
        usuarios
    })
    
}



    
export {login, usuarioGet,usuarioGetById,usuarioPost,usuarioPut, usuarioPutActivar, usuarioPutDesactivar,usuarioDelete}
