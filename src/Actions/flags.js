const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post('/place',(req, res) => {
    const FlagModel = mongoose.model('FlagModel');
    let body = req.body;
    let fm = new FlagModel();
    fm.name = body.name;
    fm.description = body.description;
    fm.longlat = body.longlat;
    fm.user_id = req.user._id;
    fm.answer = body.answer;
    fm.save((err, result) => {
        if(err || result == null) {
            res.json(err);
        }
        else {
            res.json(result);
        }
            
    });
});

router.post('/get/answer',(req,res) => {
    const FlagModel = mongoose.model("FlagModel");
    let body = req.body;
    let answer = body.answer;
    let flagid = body.flagid;

    FlagModel.findOne({_id:flagid},(err,doc) => {
       res.json({answer: doc.answer});
    });
});
router.post('/answer',(req,res) => {
    const FlagModel = mongoose.model("FlagModel");
    let body = req.body;
    let answer = body.answer;
    let flagid = body.flagid;

    FlagModel.findOne({_id:flagid},(err,doc) => {
        if(doc.answer == answer) {
            res.json({
                status:'correct'
            });
        } else {
            res.json({
                status:'wrong'
            });
        }
    });
});

module.exports = router;