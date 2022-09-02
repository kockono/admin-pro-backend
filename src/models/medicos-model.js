const { Schema, model } = require('mongoose');

/**
 * @var trim    - Elimina los espacios      
 * @var type    - Tipado del dato   
 * @var default - Dato asignado por default
 * @var Schema.Types.ObjectId - Esto le dice a mongoose que hara una refererencia a una id de un schema
 * @var collection - Nos permite renombrar en la base de datos el nombre de la tabla ( Siempre agrega una 'S')
 */

let MedicosSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        img: {
          type: String
        }, 
        usuario: { 
          type: Schema.Types.ObjectId,
          ref:'Users',
          required: true
        },
        hospital: { 
            type: Schema.Types.ObjectId, // La Id del hospital
            ref:'Hospitales', // Al Modelo que hace referencia, Cuentan las Mayusculas y Minusculas
            required: true
        },
        status:{
          type: Number,
          default: 1
        }
}, { collection: 'medicos', timestamps: true }); // Timestamps tiempos de creacion del dato, Collection: nombre de la db


// Elimina el __v a la hora de guardar en mongodb
MedicosSchema.method('toJSON', function(){
  const {__v, ...object } = this.toObject();
  return object;
});

module.exports = model('Medicos', MedicosSchema);