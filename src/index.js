const express = require('express');
const cors = require('cors');
const connectLocalDB = require('./database/mongoDBLocal');

// Conexion con la base de datos
connectLocalDB();
// const connectAtlas    = require('./config/mongoDBAtlas');
// connectAtlas(); // Conexion con la base de datos

const app = express();

const { PORT } = require('./config/properties');

// peticiones a backend, personalizado: app.use(cors({ localhost:4200 }));
app.use(cors());

app.use(express.json()); // Read and parse application/json

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Routes
app.use('/api/users', require('./routes/users.routes') );
app.use('/api/hospital', require('./routes/hospitales.routes') );
app.use('/api/medicos', require('./routes/medicos.routes') );
app.use('/api/login', require('./routes/auth.routes') );
app.use('/api/uploads', require('./routes/uploads.routes') );
app.use('/api/todo', require('./routes/busquedas.routes') );

// Server
app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );

