const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    image:{
        type: String
    },
    question:{
        type: String
    },
    questionType:{
        type: String
    },
    region:{
        type: String
    },
    answer:{
        type: String
    }
});

module.exports = mongoose.model('Quizzes', QuizSchema);