const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    region:{
        type: String
    },
    image:{
        type: String
    },
    question:{
        type: String
    },
    answer:{
        type: String
    }
});

module.exports = mongoose.model('FlashCards', FlashcardSchema);