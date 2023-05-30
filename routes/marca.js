const express = require('express')
const router = express.Router()

const {getMarcas, getMarca, addMarca, updateMarca, deleteMarca} = require('../controllers/marca')

router.get('/',getMarcas)
router.get('/:id',getMarca)
router.post('/',addMarca)
router.put('/:id',updateMarca)
router.delete('/:id', deleteMarca)

module.exports = router