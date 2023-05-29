const Marca = require('../models/marca')

async function getMarcas(req, res){
    const {nombre} = req.query
    const query = {nombre}
    for (const key in query) {
        if (query[key] === undefined){
            delete query[key];
        }
    }
    const marcas = await Marca.find(query)
    res.json(marcas)
}

async function getMarca(req, res) {
    const id = req.params.id
    const marca = await Marca.find({_id:id});
    if (marca.length) {
        res.json(marca);
    } else {
        res.json({ message: `La marca ${id} no existe`})
    }
}

async function addMarca(req, res) {
    const {nombre,anno_fundacion,fundador} = req.body;
    const marca = new Marca({nombre,anno_fundacion,fundador})
    await marca.save();
    res.json({marca});
}

async function updateMarca(req,res) {
    const id = req.params.id
    const findMarca = await Marca.find({_id:id})
    const newMarca = req.body
    if (findMarca.length){
        await Marca.updateOne({_id:id},newMarca)
        res.json(newMarca);
    } else {
        res.status(404).json({mensaje:`No se ha encontrado la marca con el id ${id}`})
    }
}

async function deleteMarca(req,res) {
    const id = req.params.id
    const marca = await Marca.find({_id:id})
    if (marca.length){
        await Marca.deleteOne({_id:id})
        res.json(marca);
    } else {
        res.status(404).json({mensaje:`No se ha encontrado la marca con el id ${id}`})   
    }
}

module.exports={getMarcas,getMarca,addMarca,updateMarca,deleteMarca};