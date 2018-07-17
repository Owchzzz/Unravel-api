const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.get('/',(req, res) => {
    const FlagModel = mongoose.model('FlagModel');
    FlagModel.find({}, (err, flags) => {
        if(err)
            res.json(err);
        
        res.json(flags);
    });
});

module.exports = router;