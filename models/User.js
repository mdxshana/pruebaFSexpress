const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const task = require('./Task')

let Schema = mongoose.Schema;

let user = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El correo es necesario"],
    },
    password: {
        type: String,
        required: [true, "Le contraseña es obligatoria"],
    },
    task:[
        { type: Schema.Types.ObjectId, ref:"Task"}
    ]
});

user.methods.toJSON = function () {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password; 
    return userObject;
}

user.plugin(uniqueValidator, {
    message: '{PATH} debe de ser único'
})

module.exports = mongoose.model('User', user)