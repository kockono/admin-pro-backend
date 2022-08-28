const { Router } = require('express');
// Controllers

// Validadors de body, formularios, post
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validate-fields');  
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();


router.get('/tipo/:id', validateJwt, );

module.exports = router;
