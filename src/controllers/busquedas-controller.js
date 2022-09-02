const { response } = require('express');

/** ----------------------------------- Controllers -----------------------------------
* @function {@link getHospitals()}   - Traer todos los usuarios 
* @function {@link createHospital()} - Crear un usuario
* @function {@link updateHospital()} - Actualizar un usuario
* @function {@link deleteHospital()} - Eliminar un usuario ( Cambia el status a 0 )
* 
*/

// Todo: Video 130 Minuto 4:00, Continuar con el buscador
const getTodo = async (req, res = response ) => {
    
      const medico = await MedicoModel.find({ status: 1}, 'name email role google')
                                      .populate('hospital', 'name')
                                      .populate('usuario', 'name');
  
      res.json({
        ok:true,
        msg: 'Get medico',
        medicos: [medico]
      });
  
  
  }