const { response } = require('express');

/** ----------------------------------- Controllers -----------------------------------
* @function {@link getHospitals()}   - Traer todos los usuarios 
* @function {@link createHospital()} - Crear un usuario
* @function {@link updateHospital()} - Actualizar un usuario
* @function {@link deleteHospital()} - Eliminar un usuario ( Cambia el status a 0 )
*/

const getHospitals = (req, res = response ) => {

  res.json( { msg: 'Todo bien' } );

}

const createHospital = (req, res = response ) => {

  res.json( { msg: 'Todo bien' } );

}

const updateHospital = (req, res = response ) => {

  res.json( { msg: 'Todo bien' } );

}

const deleteHospital = (req, res = response ) => {

  res.json( { msg: 'Todo bien' } );

}



module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}