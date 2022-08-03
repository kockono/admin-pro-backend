const { Router } = require('express');

// Controllers
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users-controller');

// Validators
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validate-fields');  

const router = Router();

/**
 * @Route  http://localhost:3501/api/usuarios/
 * @validateForms - Siempre debe ser el ultimo argumento del [] las validaciones
 * 
 * ---------------- Controllers ------------
 * @getUsers   - Nos trae todos los usuarios
 * @createUser - Dirección del controlador para crear un usuario
 */

router.get('/', getUsers );

router.post('/create', 
  [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      validateForms // Last Param Always
  ],
createUser  // Dirección de la ruta
);

router.put('/:id', 
    [
      check('name', 'El name es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').not().isEmpty(),
      check('role', 'El role es obligatorio').not().isEmpty(),
      validateForms 
    ],
  updateUser 
);

router.put('/delete/:id', 
  deleteUser
);


module.exports = router;