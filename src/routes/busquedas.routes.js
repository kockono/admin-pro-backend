const { Router } = require('express');

// Middlewares
const { validateJwt } = require('../middlewares/validate-jwt');

// Controllers
const { getTodo } = require('../controllers/busquedas-controller');

// Validadors de body, formularios, post, put, delete, update
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validate-fields');  

const router = Router();

/**
 * ----------------------------- Apis -----------------------------------
 * @api_busqueda GET http://localhost:3501/api/todo/:busqueda  
 * 
 */
 
 router.get('/:busqueda',  validarJWT, getTodo );

 router.post('/create', 
   [
    validateJwt,
    check('name', 'El name es obligatorio').not().isEmpty(),
    check('hospital','La id mandada no es válida').isMongoId(), // Valida el Id de MongoDb
    validateForms 
   ],
   createMedico
 );
 
 router.put('/:id',
     [

     ],
     updateMedico
 );
 
 router.put('/delete/:id', deleteMedico);


module.exports = router;
