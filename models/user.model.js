const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    type: String,
    status: String,
    title: String,
    description: String,
    trait: String,
    points: Number
});
let UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
    password: String,
    token: String,
    items: [{
        name: String,
        qty: Number
    }
    ],
    challenges:[
        {
            id: String,
            status: String,
        }
    ],
    score: Number,
    notifications:[NotificationSchema],
});


module.exports = UserSchema;