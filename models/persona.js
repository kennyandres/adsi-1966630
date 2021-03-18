import Mongoose  from "mongoose";

const personaSchema = Mongoose.Schema({
    tipopersona:{type:String,required:true,maxlength:50},
    nombre:{type:String,required:true,maxlength:50,unique:true},
    tipodocumento:{type:String, maxlength:20},
    numerodocumento:{type:Number, maxlength:20,unique:true},
    direccion:{type:String, maxlength:70},
    telefono:{type:Number, maxlength:15},
    email:{type:String, maxlength:50,unique:true,required:true},
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number, default:1}
   

})

export default Mongoose.model('persona', personaSchema)