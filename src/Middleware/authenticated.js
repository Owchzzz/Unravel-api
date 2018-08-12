const mongoose = require('mongoose');

module.exports = ((opts) => {

    return (req, res, next) => {
        console.log('Request came in for authentication');
        const UserModel=mongoose.model('UserModel');
        console.log(req.headers);
        if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            console.log("Token Request:",token);
            let user = UserModel.findOne({'token':token}, (err,result) => {
                console.log(err,result);
                if(err || !result.length) {
                    
                    res.json({message:'invalid token'});
                    res.end();
                    return false;
                }

                else {
                    console.log('authentication Result:',result);
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