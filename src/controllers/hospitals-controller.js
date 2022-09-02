const { response } = require('express');

const HospitalModel = require('../models/hospital-model');

/** ----------------------------------- Controllers -----------------------------------
* @function {@link getHospitals()}   - Traer todos los usuarios 
* @function {@link createHospital()} - Crear un usuario
* @function {@link updateHospital()} - Actualizar un usuario
* @function {@link deleteHospital()} - Eliminar un usuario ( Cambia el status a 0 )
* 
*/

const getHospitals = async(req, res = response ) => {

    const hospitales = await HospitalModel.find() // populate nos trae la informacion del usuario por su Id
                                          .populate('usuario', 'name email');

  res.json( { msg: 'Todo bien', Hospitales: hospitales } );

}

const createHospital = async (req, res = response ) => {

    const uid = req.uid;

    const hospital = new HospitalModel({
    usuario:uid,
    ...req.body
  });


  try {

    const hospitalDB = await hospital.save();

    res.json({ 
        ok: true,
        hospital: hospitalDB,
        msg: 'Hospital creado con existo'
    })
    
  } catch (error) {
    res.status(500).json({
        ok:false,
        msg:'Habl con el administrador'
    })
  }

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