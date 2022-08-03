const { response } = require('express');

// Encriptador
const bcrypt = require('bcryptjs');

const UsuarioModel = require('../models/user-model');

/**
 *
 * ----------------------------------- Controllers ------------------------------------
 * @login - Dirección del controlador para verificar si el email y password son iguales 
 * 
 * @var usuarioDB - Nos trae el usuario con todas sus propiedades desde la base de datos
 */

const login = async(req, res = response ) => {

  const { email, password } = req.body;

  try {

    // Verificar Email
    const usuarioDB =  await UsuarioModel.findOne({email});
    if ( !usuarioDB ) { return res.status(404).json({ msg: 'Email no encontrado' }) }

    // Verificar Contraseña
    const validPassword = bcrypt.compareSync( password, usuarioDB.password );
    if( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña no valida'
      });
    }

    res.json({ ok: true, msg: `Bienvenido ${usuarioDB.name}`})

  } catch (error) {
    console.log( error );
    res.status(500).json({ ok: false, msg: 'Hable con el administrador'})
  }

}




module.exports = {
  login,
}