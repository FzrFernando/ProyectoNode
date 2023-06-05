const express = require('express')
const router = express.Router()

const {getModelos, getModelo, addModelo, updateModelo, deleteModelo} = require('../controllers/modelo')

router.get('/',getModelos)
router.get('/:id',getModelo)
router.post('/',addModelo)
router.put('/:id',updateModelo)
router.delete('/:id', deleteModelo)

module.exports = router