const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const {getUsuarios, getUsuario, addUsuario, updateUsuario, deleteUsuario} = require('../controllers/user')

router.get('/',getUsuarios)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId()
], getUsuario)

router.post('/',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('email','El email es requerido').not().isEmpty(),
    check('password','El fundador es requerido').not().isEmpty(),
    check('email','El email debe de ser valido').isEmail()
],addUsuario)

router.put('/:id', [
    check('id','No es un id correcto').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es requerido').not().isEmpty(),
], updateUsuario)

router.delete('/:id',[
    check('id','No es un id correcto').isMongoId()
], deleteUsuario)

module.exports = router