const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    password: String,
    token: String
});


module.exports = UserSchema;