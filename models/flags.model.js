const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let FlagSchema = new Schema({
    user_id: String,
    name: String,
    title:String,
    description: String,
    answer: String,
    longlat: String,
    users: [String]
});

module.exports = FlagSchema;