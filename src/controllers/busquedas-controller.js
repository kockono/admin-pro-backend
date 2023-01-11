const { response } = require('express');

// Modelos
const Usuario = require('../models/user-model');
const Hospital = require('../models/hospital-model');
const Medico = require('../models/medicos-model');

/** ------------------------------------ Controllers --------------------------------------
* @function {@link getTodo()}       - Traer todos los Usuarios por coincidencia de busqueda
* @function {@link getDocumentosColeccion()}    - Traer todos los Medicos por coincidencia de busqueda
* 
*/

const getTodo = async (req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex    = new RegExp(busqueda, 'i'); // Like permite ser mas flexible en la busqueda

    // Este proceso toma 3 veces mas tiempo de lo normal
    // const usuarios   = await Usuario.find({ nombre: regex });
    // const medicos    = await Medico.find({ nombre: regex });
    // const hospitales = await Hospital.find({ nombre: regex });

    // Así lo hace todas al mismo tiempo, de manera simultanea
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);
  
    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
      });
  
}

const getDocumentosColeccion = async (req, res = response ) => {
    console.log( req.body )
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp(busqueda, 'i'); // Like permite ser mas flexible en la busqueda

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img')
                                                       .populate('hospital', 'nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
        break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;
        default:
            return  res.status(400).json({
                        ok: false,
                        msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                    });
    }

    res.json({
        ok:true,
        resultados: data
    })
}



module.exports = {
    getTodo,
    getDocumentosColeccion

}