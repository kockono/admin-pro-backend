const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

// Helpers
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;


    if( validarTipo(tipo) ) {
        return res.status(400).json({
            ok:false,
            msg: 'No es un médico, usuario u hospital'
        })
    }

    // Valida que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningún archivo'
        });
    }


    // Procesar la imagen...
    const file = req.files.img;

    const nombreCortado = file.name.split('.'); // ejemplo.1.2.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1]; // Ultima posición

    // Validar extension
    if( validarExtensionArchivo(extensionArchivo) ) {
        return res.status(400).json({
            ok:false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./src/uploads/${ tipo }/${ nombreArchivo }`;

    // Usar mv para mover la imagen donde quieras
    file.mv(path, (err) => {
        if (err){
            console.log( err )
            return res.status(500).json({
                msg: 'Error al mover la imagen'
            });
        }

    actualizarImagen(tipo, id, nombreArchivo);
        res.json({
            ok: true,
            nombreArchivo    
        })
    });

}

const  validarExtensionArchivo = ( extensionArchivo ) => {
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    return !extensionesValidas.includes(extensionArchivo);
}

const  validarTipo = (tipo) => { 
    const tipoValidos = ['hospitales', 'medicos', 'usuarios'];
    return !tipoValidos.includes(tipo)
}

const retornarImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto; 

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);

    // imagen por defecto
    if( fs.existsSync( pathImg) ) {
      res.sendFile( pathImg );
    } else {
        const pathImgNoFound = path.join(__dirname, `../uploads/no-img.jpg`)
        res.sendFile( pathImgNoFound )
    }


}


module.exports = {
    fileUpload,
    retornarImagen
}