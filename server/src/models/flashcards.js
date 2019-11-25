const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
    region:{
        type: Array
    },
    system:{
        type: String
    },
    subRegion:{
        type: Array
    },
    questionId:{
        type: String
    }
});

module.exports = mongoose.model('FlashCards', FlashcardSchema);