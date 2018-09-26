const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let RewardsSchema = new Schema({
    user_id: String,
    type: String,
    description:String,
    points: Number,
    target: Stirng
});

module.exports = RewardsSchema;