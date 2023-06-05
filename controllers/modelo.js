const Modelo = require('../models/modelo')

async function getModelos(req, res){
    const {nombre} = req.query
    const query = {nombre}
    for (const key in query) {
        if (query[key] === undefined){
            delete query[key];
        }
    }
    const modelo = await Modelo.find(query)
    res.json(modelo)
}

async function getModelo(req, res) {
    const id = req.params.id
    const modelo = await Modelo.find({_id:id});
    if (modelo.length) {
        res.json(modelo);
    } else {
        res.json({ message: `El modelo ${id} no existe`})
    }
}

async function addModelo(req, res) {
    const {nombre,caballos,anno_modelo,marca} = req.body;
    const modelo = new Modelo({nombre,caballos,anno_modelo,marca})
    await modelo.save();
    res.json({modelo});
}

async function updateModelo(req,res) {
    const id = req.params.id
    const findModelo = await Marca.find({_id:id})
    const newModelo = req.body
    if (findModelo.length){
        await Modelo.updateOne({_id:id},newModelo)
        res.json(newModelo);
    } else {
        res.status(404).json({mensaje:`No se ha encontrado el modelo con el id ${id}`})
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