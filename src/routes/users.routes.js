const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users');

const router = Router();

/*
    Ruta: api/usuarios/
*/

router.get('/', getUsers );
router.post('/create', createUser );





module.exports = router;