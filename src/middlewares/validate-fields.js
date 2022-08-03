const { response } = require('express');

// Validators
const { validationResult } = require('express-validator');

/**  
 * @validationResult
 * @var { errors } - Contiene los mensajes de errores escritos en  "src/routes/users.routes.js
 * 
 * (req, res, next)
 * @next - Si es valido continuar la petición, si no terminala
 * @status_400 - Bad Request
 */


const validateForms = ( req, res = response, next ) => {

  const errors = validationResult( req );    // Arreglo de errores

  // Reviso si existen errores
  if(!errors.isEmpty()) { 
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();

}

module.exports = {
  validateForms
}