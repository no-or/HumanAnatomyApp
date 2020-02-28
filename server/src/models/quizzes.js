const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    imageUrl:{
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
        type: Array
    },
    correctAnswer:{
        type: String,
        required: true
    },
    explanation:{
        type: Array
    },
});

module.exports = mongoose.model('Quizzes', QuizSchema);