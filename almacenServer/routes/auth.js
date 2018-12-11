const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');

router.post('/signup', (req,res,next)=>{
    User.register(req.body, req.body.password)
    .then(user=>{
        res.json(user);
    })
    .catch(e=>next(e));
});

router.post('/login', passport.authenticate('local'), (req,res,next)=>{
    req.app.locals.user = res.user
    res.json(req.user);
})

router.get('/logout', (req,res,next)=>{
    req.logout();
    res.send('cerrado')
});

module.exports = router;