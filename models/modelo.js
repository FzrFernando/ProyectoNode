const {Schema, model} = require('moongose');
const ModeloSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    caballos: {
        type: String
    },
    anno_modelo: {
        type: String
    }
})

module.exports = model('Modelo',ModeloSchema)