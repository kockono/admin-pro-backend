const { response } = require('express');

// Validators
const { validationResult } = require('express-validator');

/**  
 * @validationResult
 * @var { errors } - Contiene los mensajes de errores escritos en  "src/routes/users.routes.js
 * 
 * @req  - Los valores que recibe la ruta, la peticion
 * @res  - La respuesta a tu peticiones
 * @next - Si es valido continuar la petición, si no terminala
 * @status_400 - Bad Request
 */


const validateForms = ( req, res = response, next ) => {
 
  // Arreglo de errores
  const errors = validationResult( req );   

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