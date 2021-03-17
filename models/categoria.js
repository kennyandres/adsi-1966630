import Mongoose  from "mongoose";

const categoriaSchema = Mongoose.Schema({

    nombre:{type:String,required:true,maxlength:50,unique:true},
    descripcion:{type:String, maxlength:255},
    estado:{type:Number, default:1},
    createdAt:{type:Date,default:Date.now}
   
})


export default Mongoose.model('categoria',categoriaSchema)