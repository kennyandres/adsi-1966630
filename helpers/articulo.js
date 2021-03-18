import articulo from "../models/articulo.js"

const ExisteArticuloById=async(id)=>{
    const existe=await articulo.findById(id);

    if(!existe){
        throw new Error(`El Id no existe ${id}`);
    }
    
}
const ExisteArticuloByNombre=async(nombre)=>{
    const existe= await articulo.findOne({nombre});
    if(existe){throw new Error(`Ya existe Articulo con ese nombre `);
    }
}

export {ExisteArticuloById,ExisteArticuloByNombre}