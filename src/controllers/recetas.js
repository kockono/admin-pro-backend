const { Router } = require('express');
const router = Router();
let ObjectId = require('mongoose').Types.ObjectId;
const recetas = require('../models/recetas');


router.post('/:_id', async (req, res) => {
    
    let Receton = new recetas (req.body);

    const clienteID = await cliente.findById(req.params); //* Buscamos al cliente al que se le va a agregar el inventario
    Receton.cliente = clienteID._id; 
    await Receton.save();
    clienteID.recetas.push(Receton._id); //* Aqui guardamos el id del inventario en el campo inventario de la colección del cliente que creó ese inventario
    await clienteID.save();
    res.send(Receton);
});

router.put('/:id', (req, res) => {
    
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

        let receton =  ({
            nombreReceta: req.body.nombreReceta,
            categoria: req.body.categoria,
            nombreArt: req.body.nombreArt,
            codigo: req.body.codigo,
            presentacion: req.body.presentacion,
            cantNecesaria:req.body.cantNecesaria,
            cantOz:req.body.cantOz,
            ingredientes:req.body.ingredientes, 
            nombreCli:req.body.nombreCli,
            codReceta:req.body.codReceta
        });
        
    let ID = req.params.id;
    recetas.findByIdAndUpdate(ID, {$set: receton}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el receta: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    recetas.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el receta: `+ JSON.stringify(err, undefined, 2));}
    });
});

router.get('/', (req,res) => {

    recetas.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo recetas' + JSON.stringify(err, undefined, 2));}
    });
});

module.exports = router;
