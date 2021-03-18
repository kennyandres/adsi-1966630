import usuario from "../models/usuario.js"

const ExisteUsuarioById=async(id)=>{
    const existe=await usuario.findById(id);

    if(!existe){
        throw new Error(`El Id no existe ${id}`);
    }
    
}
const ExisteUsuarioByNombre=async(nombre)=>{
    const existe= await usuario.findOne({nombre});
    if(existe){throw new Error(`Ya existe Usuario con ese nombre `);
    }
}

export {ExisteUsuarioById,ExisteUsuarioByNombre}