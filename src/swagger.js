// Documentación: https://swagger.io/docs/specification/about/
// Estructura   : https://swagger.io/docs/specification/basic-structure/

// Swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const { PORT } = require('./config/properties');

// Metada info about our Apis
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: 'Administraciones de Hospitales', version: '1.0.0'}
    },
    servers: [
        {
          url: "http://localhost:3501",
        },
      ],
    // Escucha por todos estos archivos
    apis: [
        'src/routes/*.js', 
        'src/docs/schemas/*.yaml', 
        'src/docs/apis/*.yaml', 
        'src/src/swagger.js', 
    ],
    components: {
        securitySchemes: {
          basicAuth: {
            type: "http",
            scheme: "basic",
          },
        },
      }
}

// Documentación en JSON Formato
const swaggerSpec = swaggerJSDoc(options);

// Function para configurar tu documentación
const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec) );
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec)
    });

    console.log( `Version 1 Documentacion disponible en http://localhost:${PORT}/api/v1/docs` )
};

module.exports = { 
    swaggerDocs
}