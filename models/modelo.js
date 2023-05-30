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
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    }
});

ModeloSchema.methods.toJSON = function() {
    const { __v, caballos, anno_modelo, ...data } = this.toObject();
    return data;
}

module.exports = model('Modelo',ModeloSchema);