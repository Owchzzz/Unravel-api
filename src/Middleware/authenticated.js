const mongoose = require('mongoose');

module.exports = (opts) => {

    return (req, res, next) => {
        const UserModel=mongoose.model('UserModel');

        if(req.body.token) {
            let token = req.body.token;
            let user = UserModel.findOne({token}).then(result => {
                req.user = result;
                next();
            });
            
        }
        else {
            res.json({'err': 'token not valid'});
        }
    }
}