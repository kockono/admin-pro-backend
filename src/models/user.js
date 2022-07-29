const { Schema, model } = require('mongoose');

let usuariosSchema = new Schema({
        name: {
            type: String,
            required: true
        },
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
        img: {
          type: String
        },
        role:{
            type:String,
            required: true,
            default:'USER_ROLE'
        },
        google: {
          type: Boolean,
          default: false
        }
}, {timestamps: true}); // Timestamps tiempos de creacion del dato


// Remapear el id a uid, renombrar basicamente el uid de mongodb a id
usuariosSchema.method('toJSON', function(){
  const {__v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
});

module.exports = model('users', usuariosSchema);