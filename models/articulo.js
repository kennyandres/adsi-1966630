import Mongoose  from "mongoose";

const articuloSchema = Mongoose.Schema ({
    categoria:{type:Mongoose .Schema.Types.ObjectId,ref:'Articulo',required:true},
    codigo:{type:String,required:true,maxlength:64,unique:true},
    nombre:{type:String,required:true,maxlength:50,unique:true},
    descripcion:{type:String, maxlength:255},
    precioventa:{type:Number, default:0,required:true},
    stock:{ type:Number,default:1,required:true},
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number, default:1}
   

})

export default Mongoose.model('articulo', articuloSchema)