const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    region:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('FlashCards', FlashcardSchema);