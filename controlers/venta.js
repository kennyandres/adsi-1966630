import Venta from '../models/venta.js'
import Articulo from '../models/articulo.js'


const aumentarStock=async(id,cantidad)=>{
    let {stock}=await Articulo.findById(id);
    stock=parseInt(stock)+parseInt(cantidad)
    await Articulo.findByIdAndUpdate({id},{stock})
}

const descontarStock=async(id,cantidad)=>{
    let {stock}=await Articulo.findById(id);
    stock=parseInt(stock)-parseInt(cantidad)
    await Articulo.findByIdAndUpdate({id},{stock})
}

const ventaGet = async (req, res) => {
    const {value}=req.query;
    const venta = await Venta
        .find({
            $or:[
                {numerocomprobante: new RegExp(value,'i')},
                {tipocomprobante:new RegExp(value,'i')}
            ]
        })
        .sort({ "createdAt": -1 })
    res.json({
        venta
    })    
}


const ventaGetByID = async (req, res) => {
    const {id}=req.params;
    const venta = await Venta.findOne({_id:id})
       
    res.json({
        venta
    })    
}

const ventaPost = async (req, res) => {
    const { usuario,persona,tipocomprobante,numerocomprobante,impuesto,total,detalles} = req.body;
    const venta= new Venta({ usuario,persona,tipocomprobante,numerocomprobante,impuesto,total,detalles });

    await venta.save();

    detalles.map((articulo)=> descontarStock(articulo._id,articulo.cantidad))

    res.json({
        venta
    })
}

const ventaPut = async (req,res)=>{
    const {id}=req.params;

    const{_id,createAt,estado,__v,...resto}=req.body

    const venta= await Venta.findByIdAndUpdate(id,resto)

    res.json({
        venta
    })


}

const ventaPutActivar=async(req,res)=>{
    const{id}=req.params;
    const venta= await Venta.findByIdAndUpdate(id,{estado:1})

    detalles.map((articulo)=> descontarStock(articulo._id,articulo.cantidad))

    res.json({
        venta
    })
}

const ventaPutDesactivar=async(req,res)=>{
    const{id}=req.params;
    const venta= await Venta.findByIdAndUpdate(id,{estado:0})

    detalles.map((articulo)=> aumentarStock(articulo._id,articulo.cantidad))

    res.json({
        venta
    })
}



export {ventaGet,ventaGetByID,ventaPost,ventaPut,ventaPutActivar,ventaPutDesactivar,aumentarStock,descontarStock}