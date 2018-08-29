const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post("/",(req,res) => {

    const ThreadModel = mongoose.model("ThreadModel");
    
    ThreadModel.find({},(err, threads) => {
        res.json({collection: threads});
    });
});

router.post("/single",(req,res) => {
    const ThreadModel = mongoose.model("ThreadModel");
    let body = req.body;

    ThreadModel.find({_id:body.id}, (err, thread) => {
        res.json(thread);
    });
});
router.post("/place", (req,res) => {
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
            setTimeout(() => {
                fm.remove(); 
            },1000*10)
            res.json(result);
        }
            
    });
});


router.post("/answer", (req,res) => {
    const ThreadModel = mongoose.model("ThreadModel");
    let body = req.body;

    let answer = {
        user: req.user._id,
        author: req.user.username,
        answer: body.answer
    };
    
    ThreadModel.update({id:body._id}, {$push: {answers: answer}},(err, doc)=>{
        res.json({msg: 'Successfully replied to thread'});
    });
});

module.exports = router;