const { response } = require('express');

const fileUpload = ( req, res = response ) => {

const tipo = req.params.tipo;
const id   = req.params.id;

const tipoValidos = ['hospitales', 'medicos', 'usuarios'];

if( tipoValidos.includes(tipo)) {
    return res.status(400).json({
        ok:false,
        msg: 'No es un médico, usuario u hospital'
    })
}


    res.json({
        ok: true,
        msg: 'fileUploaded'
    })
}

module.exports = {
    fileUpload
}