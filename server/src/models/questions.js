const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    region:{
        type: Array
    },
    lecture:{
        type: String
    },
    system:{
        type: Array
    },
    image_id:{
        type: String
    },
    question_type:{
        type: String
    },
    options:{
        type: Array
    },
    correctAnswer:{
        type: String
    },
    subRegion:{
        type: String
    }
});

module.exports =  mongoose.model('Questions', QuestionSchema);