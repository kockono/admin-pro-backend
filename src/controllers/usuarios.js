
const getUsers = (req, res ) => {
    res.json({
      ok:true,
      mg: 'Get Usuario',
      usuarios: []
    });
}

const createUser = (req, res ) => {
  const { email, password, name } = req.body;
  
  res.json({
    ok:true,
    mg: 'Usuario creado',
  });
}


module.exports = {
  getUsers,
  createUser
}