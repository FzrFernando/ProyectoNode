const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const {getMarcas, getMarca, addMarca, updateMarca, deleteMarca} = require('../controllers/marca')

router.get('/',getMarcas)

router.get('/:id',[
    check('id','No es un id correcto').isMongoId()
], getMarca)

router.post('/',[
    check('nombre','El nombre es requerido').not().isEmpty(),
    check('anno_fundacion','El año de fundacion es requerido').not().isEmpty(),
    check('fundador','El fundador es requerido').not().isEmpty()
],addMarca)

router.put('/:id', [
    check('id','No es un id correcto').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty()
], updateMarca)

router.delete('/:id',[
    check('id','No es un id correcto').isMongoId()
], deleteMarca)

module.exports = router