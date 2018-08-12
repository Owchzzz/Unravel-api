const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.use(require('../Middleware/authenticated'));

router.get('/',(req, res) => {
    const FlagModel = mongoose.model('FlagModel');
    FlagModel.find({}, (err, flags) => {
        if(err || !flags.length){
            res.json({message:'no flags'});
            return false;
        }
        else {
            res.json(flags);

        }
        
    });

});

module.exports = router;