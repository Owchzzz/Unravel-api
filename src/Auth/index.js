const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nanoid = require('nanoid');


router.post('/register', (req, res) => {
    const UserModel = mongoose.model('UserModel');
    // create the user
    let user = new UserModel();
    user.username = req.body.username;
    user.password = req.body.password;

    user.save((err, result) => {
        if (err)
            res.json(err);
        else
            res.json(result);
    });
});

router.post('/login', (req, res) => {
    console.log('Requesting login:', req.body.username,req.body.password);

    try {

        const UserModel = mongoose.model('UserModel');

        

            UserModel.findOneAndUpdate({
                username: req.body.username,
                password: req.body.password
            },{$set:{token:nanoid()}}, {new:true}, (err, result) => {
                if(err || result == null) {
                    res.json({message:'no user found'});
                    res.end();
                }
                else {
                    res.json({
                        token:result.token,
                        message: 'Success'
                    });
                    res.end();
                }
            });
        
    } catch(Error) {
        console.log('Error when loggin in user');
    }

});

router.post('/logout', (req, res) => {
    try {
        const UserModel = mongoose.model('UserModel');
        let params = {token: req.body.token};
        UserModel.findOneAndUpdate(params, {$set:{token:false}}, {new:true}, (err, result) => {
            if(err || result == null) {
                res.json(err || {message: 'User is not logged in'})
            }

            res.json({
                message: 'User has been logged out',
                user: result.username
            });
        })
    } catch(e) {
        console.log('Error when logging out user');
    }
    res.end();
});
module.exports = router;