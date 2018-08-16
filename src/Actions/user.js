const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(require('../Middleware/authenticated'));

router.post('/update/items',(req, res) => {
    const UserModel = mongoose.model('UserModel');
    console.log("requested update to user items:",req.user.items);

    let items = [];
    if(req.user.items.length == 0 || ! req.user.items) {
        items = [
            {name: 'razor', qty: 0},
            {name: 'pen', qty: 3},
            {name: 'marker', qty: 0}
        ]
        
    } 
    else {
        items = req.user.items;
    }
    res.json({message:'successfully queried json with obj',items});
});


module.exports = router;