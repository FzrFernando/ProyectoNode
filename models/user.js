const {Schema, model} = require('mongoose');
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
    },
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        emun: ['ADMIN', 'USER']
    },
    state:{
        type: Boolean,
        default:true
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, ...data} = this.toObject();
    return data;
}

module.exports = model('User',UserSchema)