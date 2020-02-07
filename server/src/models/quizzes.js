const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    question:{
        type: String,
        required: true

    },
    questionType:{
        type: String,
        required: true
    },
    region:{
        type: String,
        required: true
    },
    options:{
        type: Array,
        required: true
    },
    answer:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Quizzes', QuizSchema);