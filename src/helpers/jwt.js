const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

console.log( process.env.JWT_SECRET )
// console.log( dotenv )

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