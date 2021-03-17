import categoria from "../models/categoria.js"

const ExisteCategoriaById=async(id)=>{
    const existe=await categoria.findById(id);

    if(!existe){
        throw new Error(`El Id no existe ${id}`);
    }
    
}
const ExisteCategoriaByNombre=async(nombre)=>{
    const existe= await categoria.findOne({nombre});
    if(existe){throw new Error(`Ya existe categoria con ese nombre `);
    }
}

export {ExisteCategoriaById,ExisteCategoriaByNombre}