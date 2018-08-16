const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post('/update/items',(req, res) => {
    const UserModel = mongoose.model('UserModel');
    console.log("requested update to user items:",req.body);

    let items = [];
    if(req.user.items.length == 0 || ! req.user.items) {
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
        items = req.user.items;
        res.json({message:'successfully queried json with obj',items});
    }
});


module.exports = router;