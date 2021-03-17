import Categoria from '../models/categoria.js'

const categoriaGet = async (req, res) => {
    const {value}=req.query;
    const categoria = await Categoria
        .find({
            $or:[
                {nombre: new RegExp(value,'i')},
                {descripcion:new RegExp(value,'i')}
            ]
        })
        .sort({ "createAt": -1 })
    res.json({
        categoria
    })    
}

const categoriaGetByID = async (req, res) => {
    const {id}=req.params;
    const categoria = await Categoria.findOne({_id:id})
       
    res.json({
        categoria
    })    
}

const categoriaPost = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const categoria = new Categoria({ nombre, descripcion });

    await categoria.save();

    res.json({
        categoria
    })
}

const categoriaPut = async (req,res)=>{
    const {id}=req.params;

    const{_id,createAt,estado,__v,...resto}=req.body

    const categoria= await Categoria.findByIdAndUpdate(id,resto)

    res.json({
        categoria
    })


}

const categoriaPutActivar=async(req,res)=>{
    const{id}=req.params;
    const categoria= await Categoria.findByIdAndUpdate(id,{estado:1})

    res.json({
        categoria
    })
}

const categoriaPutDesactivar=async(req,res)=>{
    const{id}=req.params;
    const categoria= await Categoria.findByIdAndUpdate(id,{estado:0})

    res.json({
        categoria
    })
}
const categoriaDelete=async(req,res)=>{
    const {id}=req.params;

    const categoria=await Categoria.findByIdAndDelete(id)
    res.json({
        categoria
    })

}

export {categoriaGet,categoriaGetByID, categoriaPost,categoriaPut,categoriaPutActivar,categoriaPutDesactivar, categoriaDelete}
