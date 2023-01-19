const { Router } = require('express');

const { login, googleSignIn, renewToken } = require('../controllers/auth-controller');

// Validadors de body, formularios, post
const { validateForms } = require('../middlewares/validate-fields');  
const { check } = require('express-validator'); // Version  6.14.1
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();



router.post('/', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateForms
  ],
  login
)

router.post( '/google',
    [
        check('token', 'El Token de google es obligatorio').not().isEmpty(),
        validateForms
    ],
    googleSignIn
)

router.post( '/renew',
    validateJwt,
    renewToken
)

module.exports = router;