require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateJWT = async ( uid ) => {

  return new Promise((resolve, reject) => {

    const payload = {
      uid: uid,
    };
  
    jwt.sign( payload, process.env.JWT_SECRET, {
      expiresIn: '12h'
    }, ( err, token ) => {
      if(err) {
        console.log( err )
        reject('No se pudo generar el jwt')
      }
      else {
        resolve(token)
      }
    });
  });

}

module.exports = {
  generateJWT
}