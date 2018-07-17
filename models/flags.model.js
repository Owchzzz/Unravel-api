const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let FlagSchema = new Schema({
    user_id: String,
    name: String,
    description: String,
    long: String,
    lat: String 
});

module.exports = FlagSchema;