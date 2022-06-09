const { Router } = require('express');
const router = Router();
const usuarios = require('../models/users');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
let ObjectId = require('mongoose').Types.ObjectId;

router.post('/signup', async(req, res) => {

    const { email, password, type_user } = req.body;
    
    const newUser = new usuarios ({
    email,
    password: bcryptjs.hashSync(password, 10),
    type_user
    });

    await newUser.save(function(err) {
        if (err) {
          var error = 'Something bad happened, try again!';
          if(err.code === 11000) {
            error = 'That email is already taken, try another.';
          }
        }
        })
    const token = jwt.sign({_id: newUser._id}, 'secreto')
    res.status(200).json({token})
    });

router.post('/signin', async(req, res) => {
    const { email, password} = req.body;

    const user = await usuarios.findOne({email})
    if(!user) return res.status(401).send("El Email No Existe");
    
    const passCorrecto = await bcryptjs.compare(password, user.password);
   
    if(!passCorrecto) {
        return res.status(400).json({msg: 'Password Incorrecto' })
    }
    const token = jwt.sign({_id: user._id}, 'secreto');
    return res.status(200).json({token});
});



router.get('/profile',  (req,res) => {
    
    usuarios.find((err,doc) => {
        if(!err) {res.send(doc)}
        else {console.log('Error recibiendo recetas' + JSON.stringify(err, undefined, 2));}
    });
})

router.get('/profile/:email',  (req,res) => {

  usuarios.find({"email":req.params.email}, (err,doc) => {
      if(!err) {res.send(doc)}
      else {console.log('Error recibiendo recetas' + JSON.stringify(err, undefined, 2));}
  });
})

router.put('/profile/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    let User =  ({
        changes:req.body.changes,
        fecha:req.body.fecha,
        permisos:req.body.permisos,
        deletes:req.body.deletes
                })

    let ID = req.params.id;
    usuarios.findByIdAndUpdate(ID, {$set: User}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el inventario: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.put('/profile/userChanges/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    let User =  ({
        changes:req.body.changes,
        fecha:req.body.fecha,
                })

    let ID = req.params.id;
    usuarios.findByIdAndUpdate(ID, {$set: User}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el inventario: `+ JSON.stringify(err, undefined, 2));}

    })
})

router.put('/profile/delete/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No se encontro la id: ${req.params.id}`);

    let User =  ({
        deletes:req.body.deletes
                })

    let ID = req.params.id;
    usuarios.findByIdAndUpdate(ID, {$set: User}, {new:true},(err, doc) => {
        if(!err) {res.send(doc)}
          else { console.log(`Error en encontrar el inventario: `+ JSON.stringify(err, undefined, 2));}

    })
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).send('Anuthorize Request');
    }
    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null') {
        return res.status(401).send('Anauthorize Request');
    }
    const payload = jwt.verify(token, 'secreto');
    req.userId = payload._id;
    next();
}

module.exports = router;