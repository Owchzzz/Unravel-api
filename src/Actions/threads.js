const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
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

    ThreadModel.findOne({_id:body.id}, (err, thread) => {
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
    fm.author = req.user.username;
    fm.title = body.title;

    request('https://www.purgomalum.com/service/containsprofanity?text=' + fm.title +' '+ fm.description, (error, response, resp) => {
        if(!error && response.statusCode == 200) {
            respdata = JSON.parse(resp);
            console.log('Purgomalum response:',respdata);
            if(respdata == false) {

                fm.save((err, result) => {
                    if(err || result == null) {
                        res.json(err);
                    }
                    else {
                         setTimeout(()=>{
                             fm.remove();
                          },1000*60*60*18);
                         res.json(result);

                    }
                        
                });
            } else {
                res.json({err: 'profanity', message: 'text contains profanity'});
            }
        }
     });

    
});


router.post("/answer", (req,res) => {
    const ThreadModel = mongoose.model("ThreadModel");
    let body = req.body;

    let answer = {
        author_id: req.user._id,
        author: req.user.username,
        content: req.body.answer,
    };
    
    request('https://www.purgomalum.com/service/containsprofanity?text=' + answer.content, (error, response, resp) => {
               if(!error && response.statusCode == 200) {
                   respdata = JSON.parse(resp);
                    console.log('Purgomalum response:',respdata);
                   if(respdata == false) {

                    ThreadModel.update({_id:body._id}, {$push: {comments: answer}},(err, doc)=>{
                        res.json({msg: 'Successfully replied to thread'});
                    });
                   } else {
                       res.json({err: 'profanity', message: 'text contains profanity'});
                   }
               }
            });
   
});

module.exports = router;