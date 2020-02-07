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
    answer:{
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Quizzes', QuizSchema);