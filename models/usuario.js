import Mongoose  from "mongoose";

const usuarioSchema = Mongoose.Schema({
    nombre:{type:String,required:true,maxlength:50,unique:true},
    email:{type:String, maxlength:70,unique:true},
    password:{type:String,required:true},    
    rol:{type:String,required:true,maxlength:15},
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number, default:1}
    //ADMIN_ROL   //ALMACENISTA_ROL   //VENDEDOR_ROL

})

export default Mongoose.model('usuario', usuarioSchema)