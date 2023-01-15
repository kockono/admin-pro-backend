const UsuarioModel  = require('../models/user-model');
const MedicoModel   = require('../models/medicos-model');
const HospitalModel = require('../models/hospital-model');

const fs = require('fs'); // Está carpeta nos permite leer el filesystem, archivos, carpetas

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        console.log( "Entre" )
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async ( tipo, id, nombreArchivo) => {

        let pathViejo = '';

        switch ( tipo ) {
            case 'medicos':
                
                const medico = await MedicoModel.findById(id)

                if( !medico ) {
                    console.log( "No es un medico por id" )
                    return false;
                }

                pathViejo = `./src/uploads/medicos/${ medico.img }`;
                borrarImagen(pathViejo);

                medico.img = nombreArchivo;
                await medico.save();

                return true;
            break;
            case 'hospitales':
                const hospital = await HospitalModel.findById(id)

                if( !hospital ) {
                    console.log( "No es un hospital por id" )
                    return false;
                }

                pathViejo = `./src/uploads/hospitales/${ hospital.img }`;
                borrarImagen(pathViejo);

                hospital.img = nombreArchivo;
                await hospital.save();

                return true;
            break;
            case 'usuarios':
                const usuario = await UsuarioModel.findById(id)

                if( !usuario ) {
                    console.log( "No es un usuario por id" )
                    return false;
                }

                pathViejo = `./src/uploads/usuarios/${ usuario.img }`;
                borrarImagen(pathViejo);

                usuario.img = nombreArchivo;
                await usuario.save();

                return true;
            break;
        }
}

module.exports = {
    actualizarImagen
}