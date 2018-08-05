const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let FlagSchema = new Schema({
    user_id: String,
    name: String,
    description: String,
    answer: String,
    longlat: String
});

module.exports = FlagSchema;