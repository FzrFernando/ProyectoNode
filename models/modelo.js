const {Schema, model} = require('mongoose');
const ModeloSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    caballos: {
        type: String,
        required: [true, 'Los caballos son obligatorios']
    },
    anno_modelo: {
        type: String,
        required: [true, 'El año del modelo es obligatorio']
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: [true, 'El modelo debe pertenecer a una marca']
    }
});

ModeloSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Modelo',ModeloSchema);