const mongoose = require('mongoose');

module.exports = ((opts) => {

    return (req, res, next) => {
        const UserModel=mongoose.model('UserModel');
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
  
            let user = UserModel.findOne({'token':token}, (err,result) => {

                if(err || result == null) {
                    
                    res.json({message:'invalid token'});
                   
                    return false;
                }

                else { 
                    req.user = result;
                    next();
                }
            });
            
        }
        else {
            res.json({'err': 'token not valid'});
            return false;
        }
    }
})();