// Modelos
const UsuarioModel = require('../models/user-model');
const { response } = require('express');

//Encryptamiento de contraseñas
const bcrypt = require('bcryptjs');

/**  
 * @status_400  - Bad Request
 * 
 * @var { salt } - Data aleatoria
 */

const getUsers = async(req, res ) => {

  /**  
   * @var { status: 1} - Es el where, En esta peticion buscamos todos los usuarios con status 1
   * @var { name email role google } - Los campos que nos queremos traer con el get
   */

  const usuario = await UsuarioModel.find({ status: 1}, 'name email role google');

    res.json({
      ok:true,
      mg: 'Get Usuario',
      usuarios: [usuario]
    });
}

const createUser = async(req, res = response ) => {
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

const updateUser = async(req, res = response ) => { 

  const uid = req.params.id;

  try {

    const usuarioDB = await UsuarioModel.findById( uid );

    if( !usuarioDB ) { 
      return res.status(404).json({
        ok: false,
        msg: 'No Existe un usuario por ese id'
      });
    }

    /**  
     * @var { fields } - Contiene todos los campos del "request.body"
     * @var { password, google, email } - Extraemos los campos de la variable fields, fields no contendra los anteriores campos mencionados
     */

    // Actualizaciones
    const { password, google, email, ...fields } = req.body;

    if( usuarioDB.email != email ) {
      const existeEmail = await UsuarioModel.findOne({ email });
      if( existeEmail ) {
        return res.status(400).json({
          ok:false,
          msg: 'Ya existe un correo con ese email registrado'
        })
      }
    }

    // Recibe una id, y los campos a actualizar { new: true } - Nos manda el usuario actualizado el nuevo nombre
    const usuarioActualizado = await UsuarioModel.findByIdAndUpdate( uid, fields, { new: true });

    res.json({
      ok: true,
      usuario: usuarioActualizado
    })
    
  } catch (error) {
    console.log( error );
    res.status(500).json({
        ok:false,
        msg: 'Error Inesperado'
    })
    
  }
} 

const deleteUser =  async(req, res = response ) => {

  const uid = req.params.id;

  try {

    const usuarioDB = await UsuarioModel.findById( uid );

    // En este caso no eliminamos el usuario
    // await UsuarioModel.findByIdAndDelete(uid);
    if( !usuarioDB ) { 
      return res.status(404).json({
        ok: false,
        msg: 'No Existe un usuario por ese id'
      });
    }

    /**  
     * @var { status } - 0 = Eliminado, 1 Activo
     */

    // Actualizaciones
    req.body.status = 0

    // Recibe una id, y los campos a actualizar { new: true } - Nos manda el usuario actualizado el nuevo nombre
    // Requiere un Objeto para actualizar el modelo de la base de datos
    const usuarioActualizado = await UsuarioModel.findByIdAndUpdate( uid, req.body, { new: true });

    res.json({
      ok: true,
      usuario: usuarioActualizado
    })
    
  } catch (error) {
    console.log( error );
    res.status(500).json({
        ok:false,
        msg: 'Error Inesperado'
    })
    
  }

}


module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
}