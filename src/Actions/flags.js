const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const https = require('https');

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

    https.get('www.purgomalum.com/service/json?text='+fm.description, (resp) => {
        let respdata = '';

        resp.on('data', (chunk) => {
            respdata += chunk;
        });

        resp.on('end', () => {
            respdata = JSON.parse(respdata);
            if(respdata.result !== false) {
                fm.save((err, result) => {
                    if(err || result == null) {
                        res.json(err);
                    }
                    else {
                        res.json(result);
                    }
                        
                });
            } else {
                res.json({err: 'profanity', message: 'text contains profanity'});
            }
        });
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
    const UserModel = mongoose.model("UserModel");

    let body = req.body;
    let answer = body.answer;
    let flagid = body.flagid;

    let rand = Math.floor((Math.random() * 300) + 200);;

    FlagModel.findOne({_id:flagid},(err,doc) => {
        
        if(doc.answer.toLowerCase() == answer.toLowerCase()) {
            let users = doc.users;
            users.push(req.user._id);
            FlagModel.findOneAndUpdate({_id:doc._id},{$set:{users}});
            // First update owner
            UserModel.findOneAndUpdate({_id:req.user._id},{$inc:{score:rand}},{upsert:true},(err,doc)=>{});
            UserModel.findOneAndUpdate({_id:doc.user_id},{$inc:{score:rand}},{upsert:true},(err,doc)=>{});

            res.json({
                status:'correct'
            });


        } else {
            rand = rand * -1;
            UserModel.findOneAndUpdate({_id:req.user._id},{$inc:{score:rand}},{upsert:true},(err,doc)=>{});
            UserModel.findOneAndUpdate({_id:doc.user_id},{$inc:{score:rand}},{upsert:true},(err,doc)=>{});

            res.json({
                status:'wrong'
            });
        }
    });
});

module.exports = router;