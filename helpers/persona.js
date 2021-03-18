import persona from "../models/persona.js"


const ExistePersonaById=async(id)=>{
    const existe=await persona.findById(id);

    if(!existe){
        throw new Error(`El Id no existe ${id}`);
    }
    
}
const ExistePersonaByNombre=async(nombre)=>{
    const existe= await persona.findOne({nombre});
    if(existe){throw new Error(`Ya existe persona con ese nombre `);
    }
}
const ExistePersonaByEmail=async(email)=>{
    const existe= await persona.findOne({email});
    if(existe){throw new Error(`Ya existe ese correo `);
    }

}
export {ExistePersonaById,ExistePersonaByNombre,ExistePersonaByEmail}