import Mongoose  from "mongoose";

const ventaSchema = Mongoose.Schema({
    usuario:{type:Mongoose.Schema.Types.ObjectId,ref:'usuario',required:true},
    persona:{type:Mongoose.Schema.Types.ObjectId,ref:'persona',required:true},
    tipocomprobante:{type:String,required:true,maxlength:20},
    numerocomprobante:{type:String,required:true,maxlength:10},
    impuesto:{type:Number,required:true},
    total:{type:Number,required:true},
    detalles:[{
        _id:{type:String,required:true},
        articulo:{type:String,required:true},
        cantidad:{type:Number,required:true},
        precio:{type:Number,required:true},
        descuento:{type:Number,required:true},
    }],
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number, default:1} 
   

})

export default Mongoose.model('venta', ventaSchema)