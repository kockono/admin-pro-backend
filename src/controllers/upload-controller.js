const { response } = require('express');

const { v4: uuidv4 } = require('uuid');

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    const tipoValidos = ['hospitales', 'medicos', 'usuarios'];

    if( !tipoValidos.includes(tipo)) {
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
    const imagen = req.files.imagen;

    const nombreCortado = imagen.name.split('.'); // ejemplo.1.2.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1]; // Ultima posición

    // Validar extension
    if( validarExtension(extensionArchivo) ) {
        return res.status(400).json({
            ok:false,
            msg: 'No es una extensión permitida'
        });
    }
    console.log( extensionArchivo )
    // Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // Path para guardar la imagen
    const path = `./src/uploads/${ tipo }/${ nombreArchivo }`;
    // Usar mv para mover la imagen donde quieras
    imagen.mv(path, (err) => {
        if (err){
            console.log( err )
            return res.status(500).json({
                msg: 'Error al mover la imagen'
            });
        }
        res.json({
            ok: true,
            nombreArchivo    
        })
    });

}

function validarExtension( extensionArchivo ) {
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    return !extensionesValidas.includes(extensionArchivo);
}




module.exports = {
    fileUpload
}