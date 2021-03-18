import persona from "../models/persona.js"
import bcryptjs  from "bcryptjs"



const personaGet = async(req, res) => {
    const usuarios=await Persona.find();

    res.json({
        persona
    })

    
}

const personaGetById = async(req,res) =>{
    const {id}=req.params

    const usuarios=await Persona.findById(id)

    res.json({
        persona
    })
    
}

const personaPost = async (req, res) => {
    const{tipopersona,nombre,tipodocumento,numdocumento,direccion,telefono,email}=req.body
    const persona= Persona({tipopersona,nombre,tipodocumento,numdocumento,direccion,telefono,email})

    //encriptar
    const salt=bcryptjs.genSaltSync();
    persona.password=bcryptjs.hashSync(password,salt)

    persona.save();

    res.json({
        persona
    })
} 



const personaPut= async(req,res) =>{
    const {id}=req.params

    const {_id,email, estado,createdAt, __v,...resto}=req.body
   
    const persona = await Persona.findByIdAndUpdate(id,resto)
    res.json({
        persona
    })
    
}

const personaPutActivar = async(req,res) =>{
    const {id}=req.params

    const persona=await Persona.findByIdAndUpdate(id,{estado:1})

    res.json({
        persona
    })
    
}

const personaPutDesactivar = async(req,res) =>{
    const {id}=req.params

    const persona=await Persona.findByIdAndUpdate (id,{estado:0})

    res.json({
        persona
    })
    
}

const personaDelete = async(req,res) =>{
    const {id}=req.params

    const persona=await Persona.findByIdAndDelete(id)

    res.json({
        persona
    })
    
}



    
export {personaGet,personaGetById,personaPost,personaPut,personaPutActivar,personaPutDesactivar,personaDelete}
