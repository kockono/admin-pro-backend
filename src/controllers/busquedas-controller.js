const { response } = require('express');

/** ----------------------------------- Controllers -----------------------------------
* @function {@link getTodo()}   - Traer todos los usuarios 
* 
*/

// Todo: Video 130 Minuto 4:00, Continuar con el buscador
const getTodo = async (req, res = response ) => {

    const objetoBuscado = req.body.busqueda;
    
    const medico = await MedicoModel.find({ status: 1}, 'name email role google')
                                      .populate('hospital', 'name')
                                      .populate('usuario', 'name');
  
      res.json({
        ok:true,
        msg: 'Get medico',
        medicos: [medico]
      });
  
  
  }

  module.exports = {
    getTodo
  }