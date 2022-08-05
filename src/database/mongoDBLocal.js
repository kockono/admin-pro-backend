const mongoose = require('mongoose');
const server = require('../config/properties');

/*
  "mongoose": "^6.0.0"
   Ya no soporta: usefindandmodify, usecreateindex 
*/

const Conexion = () => {
    mongoose.connect(server.DB, { useNewUrlParser: true, useUnifiedTopology: true, }, (e) =>{
        if(e) { console.log(e); return; }
            console.log("Base de datos conectada");
    });
}

module.exports = Conexion;