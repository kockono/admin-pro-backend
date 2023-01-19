const { response } = require('express');

// Modelos
const MedicoModel = require('../models/medicos-model');

/** ----------------------------------- Controllers -----------------------------------
* @function {@link getMedicos()}   - Traer todos los usuarios 
* @function {@link createMedico()} - Crear un usuario
* @function {@link updateMedico()} - Actualizar un usuario
* @function {@link deleteMedico()} - Eliminar un usuario ( Cambia el status a 0 )
*/

const getMedicos = async (req, res = response ) => {

  /**
   * @var {{status: 1}} - En esta peticion buscamos todos los usuarios con status 1 : WHERE status = 1;
   * @populate - Los campos de la base de datos que nos va a traer por medio de la id
   */
  
    const medico = await MedicoModel.find({ status: 1}, 'name email role google img')
                                    .populate('hospital', 'name')
                                    .populate('usuario', 'name');

    res.json({
      ok:true,
      msg: 'Get medico',
      medicos: medico
    });


}

const createMedico = async (req, res = response ) => {

    const uid = req.uid;
    const medico  = new MedicoModel( { 
        usuario: uid,
        ...req.body
    } ); 

  
    try {
  
      // Guarda el medico
      await medico.save(); 
  
      res.json({ok: true, medico})
  
    } catch (error) {
      console.log( error );
      res.status(500).json({ ok: false, msg: 'Error inesperado... ' });
  
    }
  
    res.json({ ok:true, medico: medico });

}

const updateMedico = async(req, res = response ) => {

    const medicoId = req.params.id;
    const uid = req.params.uid;

    // Es bueno cuando se requiere manipular datos de la base de datos
    try {

        const medico = await MedicoModel.findById( medicoId );

        if( !medico ) {
            return res.status(404).json({
                ok:false,
                msg:'Medico no encontrado'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid // Así se quien fue la ultima persona que modifico el archivo
        }
    // medicoId: la id del Medico, cambiosMedico: Los cambios realizados, { new:true }: Traeme los ultimos cambios
        const medicoActualizado = await MedicoModel.findByIdAndUpdate(medicoId, cambiosMedico, { new: true });

        res.json({ 
            ok:true,
            msg: 'Actualizado correctamente',
            medico: medicoActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

}

const deleteMedico = async(req, res = response ) => {

    const medicoId = req.params.id;

    // Es bueno cuando se requiere manipular datos de la base de datos
    try {

        const medico = await MedicoModel.findById( medicoId );

        if( !medico ) {
            return res.status(404).json({
                ok:false,
                msg:'Medico no encontrado'
            })
        }

        await MedicoModel.findByIdAndDelete( medicoId );

        res.json({ 
            ok: true,
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
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico
}