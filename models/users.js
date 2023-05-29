const {Schema, model} = require('moongose');
const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    }
})

module.exports = model('User',UserSchema)