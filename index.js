/**
 * Unravel Express API
 * 
 */

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const db ="mongodb+srv://richard:f7lYiiKrYefDLPQF@unravel-y68tv.mongodb.net/test";
const UserModel = require('./models/user.model');
const FlagModel = require('./models/flags.model');
// Classes
const Auth = require('./src/Auth');
const Flags = require('./src/Actions/flags');
const DataFlags = require('./src/Data/flags');


mongoose.connect(db);
mongoose.model('UserModel',UserModel);
mongoose.model('FlagModel',FlagModel);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();



router.get('/', (req,res) => {
    res.json({ message: 'Server Active'});
});

router.get('/users', (req,res) => {
    try {

        UserModel.find({}).exec( (err, users) => {
            if(err) {
                res.send('error has occured');
            }
            else {
                res.json(users);
            }
        });
    } catch(e) {
        console.log(e);
    }
});

router.use('/auth',Auth);
router.use('/actions/flags',Flags);
router.use('/data/flags',DataFlags);

app.use('/api',router);
app.listen(port);
console.log('Listening on port:'+port);