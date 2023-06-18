const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields');

const {getMarcas, getMarca, addMarca, updateMarca, deleteMarca} = require('../controllers/marca')

router.get('/',getMarcas)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validarCampos
], getMarca)

router.post('/',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('anno_fundacion','El año de fundacion es requerido').not().isEmpty(),
    check('fundador','El fundador es requerido').not().isEmpty(),
    validarCampos
],addMarca)

router.put('/:id', [
    check('id','No es un id correcto').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], updateMarca)

router.delete('/:id',[
    check('id','No es un id correcto').isMongoId(),
    validarCampos
], deleteMarca)

module.exports = router