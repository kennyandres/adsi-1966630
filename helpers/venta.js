import venta from "../models/venta.js"

const ExisteVentaById=async(id)=>{
    const existe=await venta.findById(id);

    if(!existe){
        throw new Error(`El Id no existe ${id}`);
    }
    
}
const ExisteByNumcomprobante=async(numerocomprobante)=>{
    const existe= await venta.findOne({numerocomprobante});
    if(existe){throw new Error(`Ya existe ese comprobante de venta `);
    }
}

export {ExisteVentaById,ExisteByNumcomprobante}