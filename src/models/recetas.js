const { Schema, model } = require('mongoose');


const recetasSchema = new Schema({
    
    nombreReceta : { type: String},
    categoria : { type: String},
    nombreArt : { type: String},
    codigo : { type: String},
    codReceta : { type: String},
    presentacion : { type: Number},
    cantNecesaria : { type: Number},
    nombreCli: { type: String},
    cliente: {
        type: Schema.Types.ObjectId,
        ref: "clientes"},
    cantOz:{ type:Number},
    ingredientes:{type:Array}
})

module.exports = model('receta', recetasSchema);