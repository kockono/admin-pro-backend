const mongoose = require('mongoose');
const server = require('./properties');

const Conexion = () => {
    mongoose.connect(server.DB, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (e) =>{
        if(e) throw new console.error(e);
            console.log("Base de datos conectada");
    });
}

module.exports = Conexion;