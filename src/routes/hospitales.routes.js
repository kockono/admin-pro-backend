const { Router } = require('express');

// Controllers
const { getHospitals, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitals-controller');

// Validadors de body, formularios, post
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validate-fields');  
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

/**
 * ----------------------------- Apis -----------------------------------
 * @api_hospital GET  http://localhost:3501/api/hospital/  
 * 
 * ------------------ Explicaciones De Controllers -----------------------
 * @hospital -
 */
 

 router.get('/',  getHospitals );

 router.post('/create', 
   [
    validateJwt,
    check('name','El nombre del hospital es necesario').not().isEmpty(),
    validateForms
   ],
   createHospital
 );
 
 router.put('/:id',
     [
        validateJwt,
        check('name','El nombre del hospital es necesario').not().isEmpty(),
        validateForms
     ],
     updateHospital
 );
 
 router.delete('/:id', deleteHospital);

//  router.put('/delete/:id', deleteHospital);


module.exports = router;
