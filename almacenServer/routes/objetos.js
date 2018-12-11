const router = require('express').Router();
const Objetos = require('../models/Objetos');
const Bodegas = require('../models/Bodegas');

router.post('/new/:bodegaId', (req,res,next)=>{
    req.body.bodega = req.params.bodegaId
    Objetos.create(req.body)
    .then(objeto => {
        return Bodegas.findByIdAndUpdate(
            req.params.bodegaId,
            {$push:{objetos:objeto._id}}
        ).then(bodega => {
            return res.status(200).json(bodega)
        })
    })
    .catch(err => {
        res.status(500).json({message:'algo falló'})
        next(err)
    })
});

router.put('/:objetoId', (req,res,next)=>{
    Objetos.findByIdAndUpdate(req.params.objetoId, req.body, {new:true})
    .then(objeto => {
        return res.status(200).json(objeto);
    })
    .catch(err => {
        res.status(404).json({message:'no se encontró'})
        next(err);
    })
});

router.delete('/delete/:objetoId', (req,res,next)=>{
    Objetos.findByIdAndRemove(req.params.objetoId)
    .then(objeto=>{
        Bodegas.findByIdAndUpdate(
            objeto.bodega, 
            {$pull:{objetos:objeto._id}}
        ).then(bodega => {
            res.status(200).json(bodega)
        })
    })
    .catch(err => {
        res.status(500).json({message:'algo falló'})
        next(err)
    })
});

module.exports = router;