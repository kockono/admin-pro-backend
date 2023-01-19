const { response } = require('express');

const HospitalModel = require('../models/hospital-model');

/** ----------------------------------- Controllers -----------------------------------
* @function {@link getHospitals()}   - Traer todos los usuarios 
* @function {@link createHospital()} - Crear un usuario
* @function {@link updateHospital()} - Actualizar un usuario
* @function {@link deleteHospital()} - Eliminar un usuario ( Cambia el status a 0 )
* 
*/

const getHospitals = async(req, res = response ) => {

    const hospitales = await HospitalModel.find() // populate nos trae la informacion del usuario por su Id
                                          .populate('usuario', 'name email');

  res.json( { msg: 'Todo bien', Hospitales: hospitales } );

}

const createHospital = async (req, res = response ) => {

    const uid = req.uid;

    const hospital = new HospitalModel({
    usuario:uid,
    ...req.body
  });


  try {

    const hospitalDB = await hospital.save();

    res.json({ 
        ok: true,
        hospital: hospitalDB,
        msg: 'Hospital creado con existo'
    })
    
  } catch (error) {
    res.status(500).json({
        ok:false,
        msg:'Habl con el administrador'
    })
  }

  res.json( { msg: 'Todo bien' } );

}

const updateHospital = async(req, res = response ) => {

    const hospitalId = req.params.id;
    const uid = req.params.uid;

    // Es bueno cuando se requiere manipular datos de la base de datos
    try {

        const hospital = await HospitalModel.findById( hospitalId );

        if( !hospital ) {
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado por id'
            })
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid // Así se quien fue la ultima persona que modifico el archivo
        }
    // hospitalId: la id del hospital, cambiosHospital: Los cambios realizados, { new:true }: Traeme los ultimos cambios
        const hospitalActualizado = await HospitalModel.findByIdAndUpdate(hospitalId, cambiosHospital, { new: true });

        res.json({ 
            ok:true,
            msg: 'Actualizado correctamente',
            hospital: hospitalActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}

const deleteHospital = async(req, res = response ) => {

    const hospitalId = req.params.id;

    // Es bueno cuando se requiere manipular datos de la base de datos
    try {

        const hospital = await HospitalModel.findById( hospitalId );

        if( !hospital ) {
            return res.status(404).json({
                ok:false,
                msg:'Hospital no encontrado por id'
            })
        }

        await HospitalModel.findByIdAndDelete( hospitalId);

        res.json({ 
            ok:true,
            msg: 'Eliminado correctamente',
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}



module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
}