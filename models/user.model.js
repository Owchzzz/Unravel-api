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
    token: String,
    items: [
        {id:0, quantity: Number},
        {id:1, quantity: Number},
        {id:2, quantity: Number},
        {id:3, quantity: Number},
        {id:4, quantity: Number},
        {id:5, quantity: Number},
        {id:6, quantity: Number},
        {id:7, quantity: Number},
        {id:8, quantity: Number},
        {id:9, quantity: Number},
        {id:10, quantity: Number},
        {id:11, quantity: Number},
        {id:12, quantity: Number},
        {id:13, quantity: Number},
        {id:14, quantity: Number},
        {id:15, quantity: Number},
        {id:16, quantity: Number},
        {id:17, quantity: Number},
        {id:18, quantity: Number},
        {id:19, quantity: Number},
        {id:20, quantity: Number},
        {id:21, quantity: Number},
        {id:22, quantity: Number},
        {id:23, quantity: Number},
        {id:24, quantity: Number},
        {id:25, quantity: Number},
        {id:26, quantity: Number},
        {id:27, quantity: Number},
        {id:28, quantity: Number},
        {id:29, quantity: Number},
        {id:30, quantity: Number},
    ]
});


module.exports = UserSchema;