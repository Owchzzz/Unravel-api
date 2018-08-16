const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.use(require('../Middleware/authenticated'));

router.get('/',(req, res) => {
    const FlagModel = mongoose.model('FlagModel');
    FlagModel.find({}, (err, flags) => {
        if(err || flags == null){
            res.json({message:'no flags'});
            return false;
        }
        else {
            res.json(flags);

        }
        
    });

});

router.post('/items',(req, res) => {
    const UserModel = mongoose.model('UserModel');
    let body = req.body;
    let user = req.user;

    console.log(user.items);
});


module.exports = router;