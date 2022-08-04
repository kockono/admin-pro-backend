const { Router } = require('express');

// Controllers
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users-controller');

// Validadors de body, formularios, post
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validate-fields');  
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

/**
 * ----------------------------- Apis -----------------------------------
 * @api_getUsers   GET  http://localhost:3501/api/usuarios/               
 * @api_createUser POST http://localhost:3501/api/usuarios/create               
 * @api_updateUser PUT  http://localhost:3501/api/usuarios/:id              
 * @api_deleteUser PUT  http://localhost:3501/api/usuarios/delete/:id               
 * 
 * --------------------- Direcciones De Controllers -----------------------
 * @getUsers   - Traer todos los usuarios 
 * @createUser - Crear un usuario nuevo
 * @updateUser - Actualizar un usuario ya existente
 * @deleteUser - Elimina un usuario cambiando el status a -1
 *
 * ------------------------------- Middlewares --------------------------------
 * @check - Argumentos que recibe: (Campo, Mensaje, Validaciones al Campo)
 * @validateJwt   - Valida el JsonWebToken
 * @validateForms - Siempre debe ser el ultimo parametro del [] de validaciones
 */

router.get('/', validateJwt, getUsers );

router.post('/create', 
  [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      validateForms // Last Param Always
  ],
createUser // Dirección de la ruta
);

router.put('/:id',
    [
      validateJwt,
      check('name', 'El name es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').not().isEmpty(),
      check('role', 'El role es obligatorio').not().isEmpty(),
      validateForms 
    ],
  updateUser 
);

router.put('/delete/:id', validateJwt, deleteUser);


module.exports = router;