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

router.post('/single',(req, res) => {
    const FlagModel = mongoose.model('FlagModel');
    let body = req.body;
    let _id = body.id;
    FlagModel.findOne({_id}, (err, flag) => {
        if(err || flag == null){
            res.json({message:'no flags'});
            return false;
        }
        else {
            if(flag.user_id == req.user._id) {
                flag.status = "owner";
                console.log(flag);
                res.json({
                    status: 'owner',
                    description: flag.description,
                    answer: flag.answer
                });
            } 
            else {
               
                let obj = {
                    description: flag.description,
                    status: 'unanswered',
                    _id: flag._id,
                    answer: flag.answer,
                }
                flag.users.forEach(user => {

                    if(user == req.user_id) {
                        obj.status = 'answered';
                    }
                });

                res.json(obj);
            }

        }
    });
});


module.exports = router;