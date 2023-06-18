const User = require('../models/user')

async function getUsuarios(req, res){
    const {nombre} = req.query
    let user;
    if(!nombre) {
        user = await User.find({})
    } else if (nombre) {
        user = await User.find({nombre})
    }

    if (user.length){
        res.status(200).json(user)
    } else {
        res.status(404).json(`No hay ningún dato`)
    }
}

async function getUsuario(req, res) {
    const id = req.params.id
    const user = await User.find({_id:id});
    if (user.length) {
        res.status(200).json(user)
    } else {
        res.status(404).json(`No se ha encontrado el usuario con el id ${id}`)
    }
}

async function addUsuario(req, res) {
    const {nombre,email,password} = req.body;
    const user = new User({nombre,email,password});

    const repetido = await User.findOne({email})
    if(repetido){
        return res.status(400).json({mensage: 'Ya existe un usuario con ese correo'})
    }
    await user.save();
    res.json({user});
}

async function updateUsuario(req,res) {
    const id = req.params.id
    const findUser = await User.find({_id:id})

    const newUser = req.body
    const email = newUser.email;
    const repetido = await User.findOne({email})
    if(repetido!=null && findUser[0].email != email){
        res.status(400).send(`Ya existe un usuario con el correo ${email}`)
    }else if(findUser.length){
        await User.updateOne({_id:id},newUser)
        res.json(newUser)
    }else{
        res.status(400).send(`No existe el usuario con id ${id}`)
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