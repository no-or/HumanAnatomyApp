const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    questionId:{
        type: String
    },
    system:{
        type: String
    },
    region:{
        type: String
    },
    subRegion:{
        type: Array
    }
});

module.exports = mongoose.model('Quizzes', QuizSchema);