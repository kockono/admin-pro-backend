const { Router } = require('express');

// Controllers
const { getUsers, createUser, updateUser } = require('../controllers/users');

// Validators
const { check } = require('express-validator'); // Version  6.14.1
const { validateForms } = require('../middlewares/validar-campos');  

const router = Router();

/**
 * @Route  http://localhost:3501/api/usuarios/
 * @validateForms - Siempre debe ser el ultimo argumento del [] las validaciones
 * 
 * ---------------- Controllers ------------
 * @getUsers - Nos trae 
 */

router.get('/', getUsers );

router.post('/create', 
  [
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'El password es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      validateForms // Last Param Always
  ],
createUser 
);

router.put('/:id', updateUser)



module.exports = router;