const { Router } = require('express');

// Middlewares
const { validateJwt } = require('../middlewares/validate-jwt');

// Controllers
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas-controller');

// Validadors de body, formularios, post, put, delete, update
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validate-fields');  

const router = Router();

/**
 * ----------------------------- Apis -----------------------------------
 * @api_busqueda GET http://localhost:3501/api/todo/:busqueda 
 * @api GET: getDocumentosColeccion : Me trae elementos de hospitales, medicos o usuarios
 * 
 */
 
 router.get('/:busqueda',  validateJwt, getTodo );

 router.get('/coleccion/:tabla/:busqueda',  validateJwt, getDocumentosColeccion );



module.exports = router;
