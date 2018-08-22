const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post("/get/me",(req,res) => {
    res.json(req.user);
});

router.post('/get/items',(req, res) => {
    const UserModel = mongoose.model('UserModel');

    let items = [];
    if(req.user.items.length == 0 || ! req.user.items) {

    console.log("requested update to user items:",req.body);
        items = [
            {name: 'razor', qty: 0},
            {name: 'pen', qty: 3},
            {name: 'marker', qty: 0},
            {name: 'highlighter', qty: 0},
            {name: 'laptop', qty: 0},
            {name: 'cellphone', qty: 0},
            {name: 'powerbank', qty: 0},
            {name: 'folder', qty: 0},
            {name: 'organizer', qty: 0},
            {name: 'milk', qty: 0},
            {name: 'flashdrive', qty: 0},
            {name: 'jacket', qty: 0},
            {name: 'guitar', qty: 0},
            {name: 'handbook', qty: 0},
            {name: 'umbrella', qty: 0},
            {name: 'yearbook', qty: 0},
            {name: 'questionnaire', qty: 0},
            {name: 'hairwax', qty: 0},
            {name: 'textbook', qty: 0},
        ]
        UserModel.findOneAndUpdate({_id:req.user._id}, {$set:{items}},{new:true}, (err, doc) => {
            res.json(doc);
        });
    } 
    else {
        let data = {
            items: req.user.items
        }
        res.json(data);
    }
});

router.post("/get/single",(req,res) => {
    console.log('single user data request filed');
    const UserModel = mongoose.model('UserModel');
    let userId = req.body.userQuery;
    UserModel.findOne({_id:userId}, (err, character) => {

        if(err) {
            console.log(err);
            res.json(err);
        }
        else {

            console.log(character);
            res.json(character);
        }

    });
});

router.post("/update/score/add",(req,res) => {
    const UserModel = mongoose.model("UserModel");
    let supd = req.body.updateScore;


    UserModel.findOneAndUpdate({_id:req.user._id},{$inc:{
        score: supd
    }}, {upsert:true},(err,doc) => {
        console.log("upserted score");
        if(err) {
            res.json(err);
        } else {
            res.json(doc);
        }
    });
});

router.post('/update/items',(req, res) => {
    const UserModel = mongoose.model("UserModel");

    // Parse Items

    UserModel.findOneAndUpdate({_id:req.user._id}, {$set:{items: req.body.data}}, {new:true},(err,doc) => {
        res.json(doc);
    });
});

module.exports = router;