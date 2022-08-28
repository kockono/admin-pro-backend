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
    const usuario = await MedicoModel.find({ status: 1}, 'name email role google');

    res.json({
      ok:true,
      mg: 'Get Usuario',
      usuarios: [usuario]
    });


}

const createMedico = async (req, res = response ) => {

    const { email, password } = req.body;
  
    try {
      const existeEmail = await MedicoModel.findOne({email})
  
      if ( existeEmail ) { return res.status(400).json({ msg: 'Correo ya registrado' }); }
  
      const usuario    = new MedicoModel( req.body ); // Creamos una instancea de nuestra clase con sus propiedades
      const salt       = bcrypt.genSaltSync();         // Ya no es necesario el await con Sync()
      usuario.password = bcrypt.hashSync(password, salt);
  
      // Guarda el Usuario
      await usuario.save(); 
  
      res.json({ok: true, usuario})
  
    } catch (error) {
      console.log( error );
      res.status(500).json({ ok: false, msg: 'Error inesperado... ' });
  
    }
  
    res.json({ ok:true, usuario: usuario });

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