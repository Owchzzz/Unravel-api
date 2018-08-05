const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post('/place',(req, res) => {
    const FlagModel = mongoose.model('FlagModel');
    console.log('Authenticated request came in:');
    console.log(req.user);
    let body = req.body;
    let fm = new FlagModel();
    fm.name = body.name;
    fm.description = body.description;
    fm.longlat = body.longlat;
    fm.user_id = req.user._id;

    fm.save((err, result) => {
        if(err)
            res.json(err);
        else {
            res.json(result);
        }
            
    });
});


module.exports = router;