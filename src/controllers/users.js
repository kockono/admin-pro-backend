// Modelos
const UsuarioModel = require('../models/users');

const getUsers = (req, res ) => {
    res.json({
      ok:true,
      mg: 'Get Usuario',
      usuarios: []
    });
}

const createUser = async(req, res ) => {
  const { email, password, name } = req.body;

  const usuario = new UsuarioModel( req.body ); // Creamos una instancea de nuestra clase con sus propiedades
  
  await usuario.save(); // Guardar Usuario

  res.json({ ok:true, usuario: usuario });
}


module.exports = {
  getUsers,
  createUser
}