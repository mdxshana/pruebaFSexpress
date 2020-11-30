const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let task = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es necesario'],
    },
    priority: {
        type: String,
        enum: ['Alta', 'Media', 'Baja'],
        default:'Baja',
        required: [true, "La prioridad es necesaria"],
    },
    date_expire: {
        type: String,
        required: [true, "Le fecha de caducidad es necesaria"],
    },
    status:{
      type:Boolean,
      default:false  
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Task', task)