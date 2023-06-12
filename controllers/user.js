const User = require('../models/user')

async function getUsuarios(req, res){
    const {nombre} = req.query
    const query = {nombre}
    for (const key in query) {
        if (query[key] === undefined){
            delete query[key];
        }
    }
    const user = await User.find(query)
    res.json(user)
}

async function getUsuario(req, res) {
    const id = req.params.id
    const user = await User.find({_id:id});
    if (user.length) {
        res.json(user);
    } else {
        res.json({ message: `El usuario ${id} no existe`})
    }
}

async function addUsuario(req, res) {
    const {nombre,email,password} = req.body;
    const user = new User({nombre,email,password});
    await user.save();
    res.json({user});
}

async function updateUsuario(req,res) {
    const id = req.params.id
    const findUser = await User.find({_id:id})
    const newUser = req.body
    if (findUser.length){
        await User.updateOne({_id:id},newUser)
        res.json(newUser);
    } else {
        res.status(404).json({mensaje:`No se ha encontrado el usuario con el id ${id}`})
    }
}

async function deleteUsuario(req,res) {
    const id = req.params.id
    const user = await User.find({_id:id})
    if (user.length){
        await User.deleteOne({_id:id})
        res.json(user);
    } else {
        res.status(404).json({mensaje:`No se ha encontrado el usuario con el id ${id}`})   
    }
}

module.exports={getUsuarios,getUsuario,addUsuario,updateUsuario,deleteUsuario};