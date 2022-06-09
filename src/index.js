const express = require('express');
const cors = require('cors');
const connectLocalDB = require('./config/mongoDBLocal');
connectLocalDB();
// const connectAtlas    = require('./config/mongoDBAtlas');
// connectAtlas(); // Conexion con la base de datos
const app = express();

const { PORT } = require('./config/properties');
// peticiones a backend, personalizado: app.use(cors({ localhost:4200 }));
app.use(cors());

app.use(express.json()); // parse application/json

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Rutas
app.use('/api', require('./routes/login.routes'));
app.use('/api/___nombreApi', require('./controllers/___nombreApi'));

// Servidor
app.listen(PORT, () => console.log(`Escuchando por el puerto ${PORT}`) );

