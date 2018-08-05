const mongoose = require('mongoose');

module.exports = ((opts) => {

    return (req, res, next) => {
        console.log('Request came in for authentication');
        const UserModel=mongoose.model('UserModel');

        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];

            let user = UserModel.findOne({'token':token}, (err,result) => {
                console.log(err,result);
                if(err || result == null) {
                    
                    res.json({err:err});
                    res.end();
                    return false;
                }
                console.log('authentication Result:',result);
                req.user = result;
                next();
            });
            
        }
        else {
            res.json({'err': 'token not valid'});
            return false;
        }
    }
})();