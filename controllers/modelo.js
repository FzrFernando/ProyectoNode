const Modelo = require('../models/modelo')

async function getModelos(req, res){
    const {nombre} = req.query
    let modelo;
    if(!nombre) {
        modelo = await Modelo.find({})
    } else if (nombre) {
        modelo = await Modelo.find({nombre})
    }

    if (modelo.length){
        res.status(200).json(modelo)
    } else {
        res.status(404).json(`No hay ningún dato`)
    }
}

async function getModelo(req, res) {
    const id = req.params.id
    const modelo = await Modelo.find({_id:id});
    if (modelo.length) {
        res.status(200).json(modelo)
    } else {
        res.status(404).json(`No se ha encontrado el modelo con el id ${id}`)
    }
}

async function addModelo(req, res) {
    const {nombre,caballos,anno_modelo,marca} = req.body;
    const modelo = new Modelo({nombre,caballos,anno_modelo,marca})
    const newModelo = await Modelo.findOne({nombre})
    if(newModelo){
        return res.status(400).json({msg:"Ya existe un modelo con el mismo nombre"})
    }
    await modelo.save();
    res.json({modelo})
}

async function updateModelo(req,res) {
    const id = req.params.id
    const findModelo = await Modelo.find({_id:id})

    const newModelo = req.body
    const nombre = newModelo.nombre;
    const repetido = await Modelo.findOne({nombre})
    if(repetido!=null && findModelo[0].nombre != nombre){
        res.status(400).send(`Ya existe un modelo con el nombre ${nombre}`)
    }else if(findModelo.length){
        await Modelo.updateOne({_id:id},newModelo)
        res.json(newModelo)
    }else{
        res.status(400).send(`No existe el modelo con id ${id}`)
    }
}

async function deleteModelo(req,res) {
    const id = req.params.id
    const modelo = await Modelo.find({_id:id})
    if (modelo.length){
        await Modelo.deleteOne({_id:id})
        res.json(modelo);
    } else {
        res.status(404).json({mensaje:`No se ha encontrado el modelo con el id ${id}`})   
    }
}

module.exports={getModelos,getModelo,addModelo,updateModelo,deleteModelo};