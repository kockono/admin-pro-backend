const express = require('express');
const cors = require('cors');
const connectLocalDB = require('./database/mongoDBLocal');
connectLocalDB();
// const connectAtlas    = require('./config/mongoDBAtlas');
// connectAtlas(); // Conexion con la base de datos
const app = express();

const { PORT } = require('./config/properties');
// peticiones a backend, personalizado: app.use(cors({ localhost:4200 }));
app.use(cors());

app.use(express.json()); // Read and parse application/json

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Rutas
app.use('/api/usuarios', require('./routes/users.routes') );
app.use('/api/hospital', require('./routes/hospitals.routes') );
app.use('/api/login', require('./routes/auth.routes') );

// Servidor
app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );

