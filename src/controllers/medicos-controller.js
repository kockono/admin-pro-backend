const { response } = require('express');

// Modelos
const MedicoModel = require('../models/medicos-model');

/** ----------------------------------- Controllers -----------------------------------
* @function {@link getMedicos()}   - Traer todos los usuarios 
* @function {@link createMedico()} - Crear un usuario
* @function {@link updateMedico()} - Actualizar un usuario
* @function {@link deleteMedico()} - Eliminar un usuario ( Cambia el status a 0 )
*/

const getMedicos = async (req, res = response ) => {

  /**
   * @var {{status: 1}} - En esta peticion buscamos todos los usuarios con status 1 : WHERE status = 1;
   * @populate - Los campos de la base de datos que nos va a traer por medio de la id
   */
  
    const medico = await MedicoModel.find({ status: 1}, 'name email role google')
                                    .populate('hospital', 'name')
                                    .populate('usuario', 'name');

    res.json({
      ok:true,
      msg: 'Get medico',
      medicos: [medico]
    });


}

const createMedico = async (req, res = response ) => {

    const uid = req.uid;
    const medico  = await new MedicoModel( { 
        usuario: uid,
        ...req.body

    } ); 

  
    try {
  
      // Guarda el medico
      await medico.save(); 
  
      res.json({ok: true, medico})
  
    } catch (error) {
      console.log( error );
      res.status(500).json({ ok: false, msg: 'Error inesperado... ' });
  
    }
  
    res.json({ ok:true, medico: medico });

}

const updateMedico = (req, res = response ) => {

  res.json( { msg: 'Todo bien' } );

}

const deleteMedico = (req, res = response ) => {

  res.json( { msg: 'Todo bien' } );

}



module.exports = {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico
}