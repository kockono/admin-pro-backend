// Modelos
const UsuarioModel = require('../models/user');
const { response } = require('express');

//Encryptamiento de contraseñas
const bcrypt = require('bcryptjs');

/**  
 * @status_400  - Bad Request
 * 
 * @var { salt } - Data aleatoria
 */

const getUsers = async(req, res ) => {

  const usuario = await UsuarioModel.find({}, 'nombre email role google');

    res.json({
      ok:true,
      mg: 'Get Usuario',
      usuarios: [usuario]
    });
}

const createUser = async(req, res=response ) => {
  const { email, password, name } = req.body;
  
  try {
    const existeEmail = await UsuarioModel.findOne({email})

    if ( existeEmail ) { return res.status(400).json({ msg: 'Correo Ya registrado' }); }

    const usuario = new UsuarioModel( req.body ); // Creamos una instancea de nuestra clase con sus propiedades
    const salt = bcrypt.genSaltSync();            // Ya no es necesario el await con Sync()
    usuario.password = bcrypt.hashSync(password, salt);

    // Guardar Usuario
    await usuario.save(); 

    res.json({ok: true, usuario})

  } catch (error) {
    console.log( error );
    res.status(500).json({ ok: false, msg: 'Error inesperado... ' });

  }

  res.json({ ok:true, usuario: usuario });
}



module.exports = {
  getUsers,
  createUser,
  updateUser
}