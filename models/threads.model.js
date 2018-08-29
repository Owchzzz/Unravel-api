const mongoose = require('mongoose');
const Schema =mongoose.Schema;

let ThreadSchema = new Schema({
    user_id: String,
    name: String,
    description: String,
    longlat: String,
    comments: [{
        author_id: String,
        author: String,
        content: String,
        submissionDate: Date
    }]
});

module.exports = ThreadSchema;