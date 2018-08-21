const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.use(require('../Middleware/authenticated'));

router.post('/single',(req, res) => {
    const UserModel = mongoose.model('UserModel');
    let userId = req.body.userQuery;
    UserModel.findOne({_id:userId}, (err, character) => {
        console.log(character);
        res.json(character);
    });

});

router.get('/items',(req, res) => {
    const UserModel = mongoose.model('UserModel');
    let body = req.body;
    let user = req.user;

    console.log(user.items);
    res.json(user.items);
});


module.exports = router;