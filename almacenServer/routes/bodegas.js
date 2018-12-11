const router = require('express').Router();
const Bodegas = require('../models/Bodegas');
const User = require('../models/User');

router.get('/:userid', (req,res,next)=>{
    Bodegas.find({user:req.params.userid})
    .populate('objetos')
    .then(bodegas=>{
        return res.status(200).json(bodegas)
    })
    .catch(err => {
        res.status(404).json({message:'no encontrado'})
        next(err)
    })
});

router.post('/new', (req,res,next)=>{
    req.body.user = req.app.locals.user
    Bodegas.create(req.body)
    .then(bodega=>{
        return User.findByIdAndUpdate(
            req.app.locals.user.id, 
            {$push:{bodegas:bodega._id}}
        ).then(user=>{
            return res.status(200).json(user)
        })
    })
    .catch(err => {
        res.status(500).json({message:'algo falló'})
        next(err)
    })
});

router.put('/:id', (req,res,next)=>{
    Bodegas.findByIdAndUpdate(req.params.id, req.body, { new:true })
    .then(bodega => {
        return res.status(202).json(bodega);
    })
    .catch(err => {
        res.status(404).json({message:'no encontrado'})
        next(err)
    })
});

router.delete('/delete/:id', (req,res,next)=>{
    Bodegas.findByIdAndRemove(req.params.id)
    .then(bodega => {
        User.findByIdAndUpdate(
            req.app.locals.user.id,
            {$pull:{bodegas:bodega._id}}
        ).then(user => {
            return res.status(200).json(user)
        })
    })
    .catch(err => {
        res.status(500).json({message:'algo falló'})
        next(err)
    })
});

module.exports = router