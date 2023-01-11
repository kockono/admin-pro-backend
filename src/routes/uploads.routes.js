const { Router } = require('express');

// Controllers
const { fileUpload } = require('../controllers/upload-controller');

// Validadors de body, formularios, post
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();


router.put('/:tipo/:id', validateJwt, fileUpload);

module.exports = router;
