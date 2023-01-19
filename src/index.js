require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectLocalDB = require('./database/mongoDBLocal');

// Conexion con la base de datos
connectLocalDB();
// const connectAtlas    = require('./config/mongoDBAtlas');
// connectAtlas(); // Conexion con la base de datos

const app = express();

// Puerto del servidor
const { PORT } = require('./config/properties');

// Swagger
const { swaggerDocs: V1SwaggerDocs } = require('./swagger.js');

// peticiones a backend, personalizado: app.use(cors({ localhost:4200 }));
app.use(cors());


app.use(express.json()); // Read and parse application/json

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// Carpeta pública
app.use( express.static('src/public') );

// Routes
app.use('/api/users', require('./routes/users.routes') );
app.use('/api/hospital', require('./routes/hospitales.routes') );
app.use('/api/medicos', require('./routes/medicos.routes') );
app.use('/api/todo', require('./routes/busquedas.routes') );
app.use('/api/login', require('./routes/auth.routes') );
app.use('/api/uploads', require('./routes/uploads.routes') ); // Subida de archivos

// Server
app.listen(PORT, () => {
    console.log(`Escuchando por el puerto ${ PORT }`);
    V1SwaggerDocs(app, PORT);
});

