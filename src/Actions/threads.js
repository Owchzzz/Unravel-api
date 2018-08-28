const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post("/",(req,res) => {

    const ThreadModel = mongoose.model("ThreadModel");
    
    ThreadModel.find({},(err, threads) => {
        res.json(threads);
    });
});

router.post("place", (req,res) => {
    const ThreadModel = mongoose.model("ThreadModel");
    console.log('Thread model: create request');
    let body = req.body;
    let fm = new ThreadModel();
    fm.name = body.name;
    fm.description = body.description;
    fm.longlat = body.longlat;
    fm.user_id = req.user._id;
    fm.title = body.title;


    fm.save((err, result) => {
        if(err || result == null) {
            res.json(err);
        }
        else {
            res.json(result);
        }
            
    });
});

module.exports = router;