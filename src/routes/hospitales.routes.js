const { Router } = require('express');

// Controllers
const { getHospitals, createHospital, updateHospital, deleteHospital, getHospitalById} = require('../controllers/hospitals-controller');

// Validadors de body, formularios, post
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validate-fields');  
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

/**
 * @version 0.2.0
 * 
 * @api_getHospitals GET: http://localhost:3501/api/hospital
 * - Obtiene todos los hospitales
 * @api_updateHospital PUT: http://localhost:3501/api/hospital/:id
 * - Obtiene un hospital por medio de la id
 * @api_createHospital POST: http://localhost:3501/api/hospital/create
 * - Crea un hospital
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

  router.get('/:id',
  [
     validateJwt,
     check('name','El nombre del hospital es necesario').not().isEmpty(),
     validateForms
  ],
  getHospitalById
);
 
 router.delete('/:id', deleteHospital);

//  router.put('/delete/:id', deleteHospital);


module.exports = router;
