const { response } = require('express');

// Encriptador
const bcrypt = require('bcryptjs');

const UsuarioModel = require('../models/user-model');
const { generateJWT } = require('../helpers/jwt');

/**
 * ----------------------------------- Controllers ------------------------------------
 * @function {@link login()}  - Verifica si el email y password son iguales
 * @function {@link logout()} - Cierra sesión y elimina la Jwt del usuario
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

    // Retorna una promesa así que se ocupa el await
    const token = await generateJWT(usuarioDB.id);

    res.json({ ok: true, msg: `Bienvenido ${usuarioDB.name}`, token})

  } catch (error) {
    console.log( error );
    res.status(500).json({ ok: false, msg: 'Hable con el administrador'})
  }

};

const logout = async(req, res = response ) => {

};

const googleSignIn = async( req, res = response ) => {

    try {
        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        // Si el usuario no existe lo guarda en la base de datos, tomando a consideración los datos que te otorga google
        if ( !usuarioDB ) {
            usuario = new Usuario({
                name: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@';
        }

        // Guardar Usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generateJWT( usuario.id );


        res.json({
            ok: true,
            email, name, picture,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });
    }
    
}

const renewToken = async (req, res = response ) => {

    const uid = req.uid
    // Obtener el usuario por UID
    const usuarioDB = await UsuarioModel.findById(uid);
    

    // Generar el TOKEN - JWT
    const token = await generateJWT( uid );

    res.json({
        ok:true,
        token,
        usuarioDB
    })
}




module.exports = {
  login,
  logout,
  googleSignIn,
  renewToken
}