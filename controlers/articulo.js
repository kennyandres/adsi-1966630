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


const articuloGet = async (req, res) => {
    const { value } = req.query;
    const articulo = await Articulo
        .find({
            $or: [
                { nombre: new RegExp(value, 'i') },
                { descripcion: new RegExp(value, 'i') }
            ]
        })
        .sort({ "createAt": -1 })
    res.json({
        articulo
    })
}

const articuloGetByID = async (req, res) => {
    const { id } = req.params;
    const articulo = await Articulo.findOne({ _id: id })

    res.json({
        articulo
    })
}

const articuloPost = async (req, res) => {

    const { categoria, codigo, nombre, descripcion, precioventa, stock } = req.body;
    const articulo = new Articulo({ categoria, codigo, nombre, descripcion, precioventa, stock });

    detalles.map((articulo)=> aumentarStock(articulo._id,articulo.cantidad))

    await articulo.save();

    

    res.json({
        articulo
    })
}

const articuloPut = async (req, res) => {
    const { id } = req.params;

    const { _id, createAt, estado, __v, ...resto } = req.body

    const articulo = await Articulo.findByIdAndUpdate(id, resto)

    res.json({
        articulo
    })


}

const articuloPutActivar = async (req, res) => {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, { estado: 1 })

    detalles.map((articulo)=> aumentarStock(articulo._id,articulo.cantidad))

    res.json({
        articulo
    })
}

const articuloPutDesactivar = async (req, res) => {
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, { estado: 0 })

    detalles.map((articulo)=> descontarStock(articulo._id,articulo.cantidad))

    res.json({
        articulo
    })
}
const articuloDelete = async (req, res) => {
    const { id } = req.params;

    const articulo = await Articulo.findByIdAndDelete(id)
    res.json({
        articulo
    })

}




export { articuloGet, articuloGetByID, articuloPost, articuloPut, articuloPutActivar, articuloPutDesactivar, articuloDelete,aumentarStock,descontarStock }