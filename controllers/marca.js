const Marca = require('../models/marca')

async function getMarcas(req, res){
    const {nombre} = req.query
    let marca;
    if(!nombre) {
        marca = await Marca.find({})
    } else if (nombre) {
        marca = await Marca.find({nombre})
    }

    if (marca.length){
        res.status(200).json(marca)
    } else {
        res.status(404).json(`No hay ningún dato`)
    }
}

async function getMarca(req, res) {
    const id = req.params.id
    const marca = await Marca.find({_id:id});
    if (marca.length) {
        res.status(200).json(marca)
    } else {
        res.status(404).json(`No se encuentra la marca con el id ${id}`)
    }
}

async function addMarca(req, res) {
    const {nombre,anno_fundacion,fundador} = req.body;
    const marca = new Marca({nombre,anno_fundacion,fundador})
    const newMarca = await Marca.findOne({nombre})
    if(newMarca){
        return res.status(400).json({msg:"Ya existe una marca con el mismo nombre"})
    }
    await marca.save();
    res.json({marca})
}

async function updateMarca(req,res) {
    const id = req.params.id
    const findMarca = await Marca.find({_id:id})

    const newMarca = req.body
    const nombre = newMarca.nombre;
    const repetido = await Marca.findOne({nombre})
    if(repetido!=null && findMarca[0].nombre != nombre){
        res.status(400).send(`Ya existe una marca con el nombre ${nombre}`)
    }else if(findMarca.length){
        await Marca.updateOne({_id:id},newMarca)
        res.json(newMarca)
    }else{
        res.status(400).send(`No existe la marca con id ${id}`)
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