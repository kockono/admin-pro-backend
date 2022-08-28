const { Router } = require('express');

// Controllers
const { getMedicos, createMedico, updateMedico, deleteMedico } = require('../controllers/medicos-controller');

// Validadors de body, formularios, post
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validate-fields');  

const router = Router();

/**
 * ----------------------------- Apis -----------------------------------
 * @api_hospital GET  http://localhost:3501/api/hospital/  
 * 
 * ------------------ Explicaciones De Controllers -----------------------
 * @hospital -
 */
 

 router.get('/',  getMedicos );

 router.post('/create', 
   [

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
