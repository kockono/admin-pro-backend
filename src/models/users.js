const { Schema, model } = require('mongoose');


let usuariosSchema = new Schema({
        email: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        password: {
            type:String,
            required: true
        },
        type_user:{
            type:String,
            default:'usuario'
        },
}, {timestamps: true});

module.exports = model('usuario', usuariosSchema);