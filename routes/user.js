const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields');

const {login, addUsuario, updateUsuario, deleteUsuario} = require('../controllers/user')

/* router.get('/',getUsuarios)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validarCampos
], getUsuario) */

router.get('/',[
    check('email','El email es requerido').not().isEmpty(),
    check('password','El password es requerido').not().isEmpty(),
    validarCampos
],login)

router.post('/',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('email','El email es requerido').not().isEmpty(),
    check('password','El fundador es requerido').not().isEmpty(),
    check('email','El email debe de ser valido').isEmail(),
    check('rol','El rol es requerido').not().isEmpty(),
    check('rol','El rol solo admite los valores ADMIN o USER').isIn(['ADMIN','USER']),
    validarCampos
],addUsuario)

router.put('/:id', [
    check('id','No es un id correcto').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es requerido').not().isEmpty(),
    validarCampos
], updateUsuario)

router.delete('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validarCampos
], deleteUsuario)

module.exports = router