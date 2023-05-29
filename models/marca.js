const {Schema, model} = require('moongose');
const MarcaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    anno_fundacion: {
        type: String
    },
    fundador: {
        type: String
    }
})

module.exports = model('Marca',MarcaSchema)