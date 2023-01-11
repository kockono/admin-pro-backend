const { response } = require('express');

const { v4: uuidv4 } = require('uuid');

const fileUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;


    if( validarTipo() ) {
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
    const file = req.files.imagen;

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
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

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
        res.json({
            ok: true,
            nombreArchivo    
        })
    });

}

function validarExtensionArchivo( extensionArchivo ) {
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    return !extensionesValidas.includes(extensionArchivo);
}

function validarTipo() {
    const tipoValidos = ['hospitales', 'medicos', 'usuarios'];
    return !tipoValidos.includes(tipo)
}




module.exports = {
    fileUpload
}