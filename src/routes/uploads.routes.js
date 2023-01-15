const { Router } = require('express');

// Controllers
const { fileUpload, retornarImagen } = require('../controllers/upload-controller');

// Validadors de body, formularios, post
const { validateJwt } = require('../middlewares/validate-jwt');

// Middlewares
const expressFileUpload = require('express-fileupload');

const router = Router();

// default options
router.use(expressFileUpload());

router.put('/:tipo/:id', validateJwt, fileUpload);
router.get('/:tipo/:foto', retornarImagen);

module.exports = router;
