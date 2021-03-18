const validarRol=(...roles)=>{
    return (req,res,next)=>{
        if(! (roles.includes(req.usuario.rol) || req.usuario.rol==='ADMIN_ROL')){
           return res. status(401).json ({
            msg:'El servicio requiere uno de estod roles ${roles}'
           })
           
        }
        next();
    }
}
export {validarRol}