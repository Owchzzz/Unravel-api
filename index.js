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
const UserData = require('./src/Data/user');
const UserActions = require('./src/Actions/user');

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


router.use('/auth',Auth);
router.use('/actions/flags',Flags);
router.use('/actions/user',UserActions);
router.use('/data/flags',DataFlags);
router.use('/data/user',UserData);

app.use('/api',router);
app.listen(port);
console.log('Listening on port:'+port);