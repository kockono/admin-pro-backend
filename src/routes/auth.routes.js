const { Router } = require('express');

const { login } = require('../controllers/auth-controller');

// Validadors de body, formularios, post
const { validateForms } = require('../middlewares/validate-fields');  
const { check } = require('express-validator'); // Version  6.14.1

const router = Router();

/**
 * @api POST  http://localhost:3501/api/login/  => @login
 * 
 * ----------------------------------- Controllers ------------------------------------
 * @login - Verifica si el email y password son iguales para loguearse
 */

router.post('/', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateForms
  ],
  login
)


module.exports = router;