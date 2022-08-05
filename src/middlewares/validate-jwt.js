const jwt = require('jsonwebtoken');

require('dotenv').config();

const validateJwt = (req, res ,next) => {

  // Leer el Token
  const token = req.header('x-token');
  
  if( !token ) return res.status(401).json({ msg: ' No hay token en la peticion' });

  try {
    const { uid } = jwt.verify( token, process.env.JWT_SECRET )

    // La request ahora tendra de la nueva uid
    req.uid = uid;

    next();

  } catch (error) {
    return res.status(401).json({ msg: 'Token no válido' })
  }

}

module.exports = {
  validateJwt
}