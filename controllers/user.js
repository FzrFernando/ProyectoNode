const User = require('../models/user')
const bcryptjs = require('bcryptjs')

/* async function getUsuarios(req, res){
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
} */

async function addUsuario(req, res) {
    const {nombre,email,password,rol} = req.body;
    const user = new User({nombre,email,password,rol});

    const repetido = await User.findOne({email})
    if(repetido){
        return res.status(400).json({mensage: 'Ya existe un usuario con ese correo'})
    }
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);
    user.state;
    await user.save();
    res.json({user});
}

async function updateUsuario(req,res) {
    const id = req.params.id
    const findUser = await User.find({_id:id})

    const newUser = req.body
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(newUser.password,salt);
    const email = newUser.email;
    const repetido = await User.findOne({email})

    if(newUser.rol !='ADMIN'&& newUser.rol !='USER'){
        res.status(400).send(`El rol debe de ser ADMIN o USER`)
    } 
    else {
        if(repetido!=null && findUser[0].email != email){
            res.status(400).send(`Ya existe un usuario con el correo ${email}`)
        }else if(findUser.length){
            await User.updateOne({_id:id},newUser)
            res.json(newUser)
        }else{
            res.status(400).send(`No existe el usuario con id ${id}`)
        }
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

async function login(req, res){
    const{email, password}=req.body
    try{
        const user = await User.findOne({email})
        const validarPassword = bcryptjs.compareSync(password,user.password)
        if(!user||!validarPassword){
            return res.status(400).json({mensage:`No has introducido bien el correo o la contraseña`})
        }else{
            if(!user.state){
                return res.status(400).json({msg:'El usuario fue eliminado'})
            }else{   
            res.status(200).json({mensage:'Has iniciado sesión'})
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).json({msg:'Ha ocurrido un error'})
    }
}

module.exports={addUsuario,updateUsuario,deleteUsuario,login};