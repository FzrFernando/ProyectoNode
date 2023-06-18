const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields');

const {getModelos, getModelo, addModelo, updateModelo, deleteModelo} = require('../controllers/modelo')

router.get('/',getModelos)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validarCampos
], getModelo)

router.post('/',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('caballos','Los caballos son requeridos').not().isEmpty(),
    check('anno_modelo','El anno_modelo es requerido').not().isEmpty(),
    check('marca','La marca es requerida').not().isEmpty(),
    validarCampos
],addModelo)

router.put('/:id', [
    check('id','No es un id correcto').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('caballos','Los caballos son requeridos').not().isEmpty(),
    check('anno_modelo','El anno_modelo es requerido').not().isEmpty(),
    check('marca','La marca es requerida').not().isEmpty(),
    validarCampos
], updateModelo)

router.delete('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validarCampos
], deleteModelo)

module.exports = router