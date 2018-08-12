const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.use(require('../Middleware/authenticated'));

router.get('/',(req, res) => {
    const FlagModel = mongoose.model('FlagModel');
    FlagModel.find({}, (err, flags) => {
        if(err || flags == null){
            res.json({message:'no flags'});
            return false;
        }
        else {
            res.json(flags);

        }
        
    });

});

router.post('/single',(req, res) => {
    const FlagModel = mongoose.model('FlagModel');
    let body = req.body;
    let _id = body._id;
    FlagModel.findOne({_id}, (err, flag) => {
        if(err || flag == null){
            res.json({message:'no flags'});
            return false;
        }
        else {
            res.json(flag);

        }
    });
});

module.exports = router;