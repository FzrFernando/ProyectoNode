const {Schema, model} = require('mongoose');
const MarcaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    anno_fundacion: {
        type: String,
        required: [true, 'El año de fundacion es obligatorio']
    },
    fundador: {
        type: String,
        required: [true, 'El fundador de la marca es obligatorio']
    }
})

module.exports = model('Marca',MarcaSchema)