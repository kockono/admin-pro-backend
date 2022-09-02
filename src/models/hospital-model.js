const { Schema, model } = require('mongoose');

/**
 * @var trim    - Elimina los espacios      
 * @var type    - Tipado del dato   
 * @var default - Dato asignado por default
 * @var Schema.Types.ObjectId - Esto le dice a mongoose que hara una refererencia a una id de un schema
 * @var collection - Nos permite renombrar en la base de datos el nombre de la tabla ( Siempre agrega una 'S')
 */

let HospitalSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        img: {
          type: String
        }, 
        usuario: { 
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Users'
        },
        status:{
          type: Number,
          default: 1
        }
}, { collection: 'hospitales', timestamps: true });  // Timestamps tiempos de creacion del dato


// Elimina el __v a la hora de guardar en mongodb
HospitalSchema.method('toJSON', function(){
  const {__v, ...object } = this.toObject();
  return object;
});

module.exports = model('Hospitales', HospitalSchema);